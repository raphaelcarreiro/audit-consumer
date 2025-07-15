import { Audit } from '@core/domain/audit/audit.entity';

type ConstructorProps = {
  audit: Audit;
  sellerId: string;
};

export class Session {
  audit: Audit;
  sellerId: string;
  route: string;

  constructor(props: ConstructorProps) {
    this.audit = props.audit;
    this.sellerId = props.sellerId;
  }
}
