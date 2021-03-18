import { ConnectionStatus } from '../constants';

export interface ConnectionInterface {
  to: string;
  from: string;
  status: ConnectionStatus;
  key: string;
}
