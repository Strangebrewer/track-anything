import axios from 'axios';

export default class InCommApiClient {
  private clientId: string;
  private clientSecret: string;
  private cancelTimeout: number;
  private maxCancelTimeout: number;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.cancelTimeout = 1;
    this.maxCancelTimeout = 10;
  }

  private async authorize(): Promise<string> {
    return "auth-token";
  }

  private async cancel(transactionId: string): Promise<string> {
    try {
      const response = await axios.post('http://localhost:8803/wait/what', {
        narf: 'feck',
        feck: 'derp',
        derp: 'narf'
      }, { timeout: this.cancelTimeout });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        this.cancelTimeout += 1;
        if (this.cancelTimeout > this.maxCancelTimeout) {
          throw Error(err);
        }
        await this.cancel(transactionId);
      }
    }
    return transactionId;
  }

  public async getStatus(code: string): Promise<string> {
    return code;
  }

  public async redeem(code: string): Promise<string> {
    return code;
  }
}
