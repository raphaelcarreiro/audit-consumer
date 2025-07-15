import { START_RESUME_TOPICS_KEY } from '@core/infra/shared/kafka/constants';
import { KafkaOptions, ServerKafka } from '@nestjs/microservices';
import {
  Consumer,
  EachMessagePayload,
  ConsumerStartBatchProcessEvent,
  Admin,
} from '@nestjs/microservices/external/kafka.interface';
import { Subject } from 'rxjs';

const subject = new Subject();

export class KafkaTransportStrategy extends ServerKafka {
  private topics = new Set<string>();
  private offsetsToPause = new Map<string, string>();
  private admin: Admin;

  constructor(options: Required<KafkaOptions>['options']) {
    super(options);
  }

  public static resume() {
    subject.next(true);
  }

  public async bindEvents(consumer: Consumer) {
    const registeredPatterns = [...this.messageHandlers.keys()];
    const consumerSubscribeOptions = this.options?.subscribe || {};

    if (registeredPatterns.length > 0) {
      await this.consumer?.subscribe({
        ...consumerSubscribeOptions,
        topics: registeredPatterns,
      });
    }

    const consumerRunOptions = Object.assign(this.options?.run || {}, {
      eachMessage: this.getMessageHandler(),
    });

    this.setPauseResumeTopics();
    this.registerConsumerEvents();
    this.subscribeToResume();

    await consumer.run(consumerRunOptions);
  }

  public getMessageHandler() {
    return async (payload: EachMessagePayload) => {
      const key = `${payload.topic}-${payload.partition}`;

      if (this.shouldSkipRetry(payload)) {
        this.seekAndPause(payload);
        return;
      }

      if (this.offsetsToPause.get(key) === payload.message.offset) {
        payload.pause();
      }

      return this.handleMessage(payload);
    };
  }

  private seekAndPause(payload: EachMessagePayload) {
    this.consumer?.seek({
      topic: payload.topic,
      partition: payload.partition,
      offset: payload.message.offset,
    });

    this.logger.log(`skipping message on topic ${payload.topic}[${payload.partition}], retry time not reached`);

    payload.pause();
  }

  private subscribeToResume() {
    subject.subscribe({
      next: this.resume.bind(this),
    });
  }

  private resume() {
    this.consumer?.resume([...this.topics].map(topic => ({ topic })));
  }

  private setPauseResumeTopics() {
    Array.from(this.messageHandlers.entries())
      .filter(([, handler]) => (handler.extras ? handler.extras[START_RESUME_TOPICS_KEY] : false))
      .forEach(([topic]) => this.topics.add(topic));
  }

  private registerConsumerEvents() {
    this.consumer?.on('consumer.start_batch_process', this.onStartBatchProcess.bind(this));
    this.consumer?.on('consumer.group_join', this.pause.bind(this));
  }

  private pause() {
    this.consumer?.pause([...this.topics].map(topic => ({ topic })));
  }

  private async onStartBatchProcess(event: ConsumerStartBatchProcessEvent) {
    this.logger.log(`${event.payload.topic}[${event.payload.partition}] - batch size ${event.payload.batchSize}`);

    if (!this.isPauseResumeTopic(event.payload.topic)) {
      return;
    }

    const key = `${event.payload.topic}-${event.payload.partition}`;

    const latestOffset = await this.getLatestOffset(event.payload.topic, event.payload.partition);

    this.offsetsToPause.set(key, latestOffset ?? event.payload.lastOffset);
  }

  private async getLatestOffset(topic: string, partition: number): Promise<string | null> {
    if (!this.admin) {
      await this.initializeAdmin();
    }

    if (!this.admin) {
      return null;
    }

    const offsets = await this.admin.fetchTopicOffsets(topic);

    const offset = offsets?.find(offset => offset.partition === partition)?.high;

    if (!offset) {
      return null;
    }

    if (offset === '-1') {
      return null;
    }

    return offset;
  }

  private shouldSkipRetry(payload: EachMessagePayload): boolean {
    const headers = payload?.message?.headers;

    if (!headers) {
      return false;
    }

    const retryAtRaw = headers['x-retry-at'];

    if (!retryAtRaw) {
      return false;
    }

    const retryAt = new Date(retryAtRaw.toString());

    if (isNaN(retryAt.getTime())) {
      return false;
    }

    return new Date() < retryAt;
  }

  private async initializeAdmin() {
    this.admin = this.client!.admin();
    await this.admin.connect();
  }

  private isPauseResumeTopic(topic: string) {
    return this.topics.has(topic);
  }
}
