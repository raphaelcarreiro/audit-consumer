import { config } from 'dotenv';

config();

export const START_RESUME_TOPICS_KEY = 'start_resume';

export const KAFKA_TOPICS = {
  audit_retry: process.env.AUDIT_KAFKA_RETRY_TOPIC,
  audit: process.env.AUDIT_KAFKA_TOPIC,
};
