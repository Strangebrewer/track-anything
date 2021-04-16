import axios from "axios";

export default class InCommApiClient {
  private clientId: string;
  private clientSecret: string;
  private authToken: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.authToken = null;
  }

  private async authorize(): Promise<void> {
    this.authToken = "fake-auth-token";
  }

  private async cancel(transactionId: string): Promise<string> {
    return transactionId;
  }

  public async getStatus(code: string): Promise<string> {
    return code;
  }

  public async redeem(code: string): Promise<string> {
    if (this.authToken) {
      this.authorize();
    }

    const transactionId = "123456789";

    try {
      const redeemResponse = await axios.post(`${process.env}/rtg-tv/v2/redeem`, {
        headers: {
          Authentication: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
        },
        data: {
          RetailTransactionTVRequest: {
            dateTime: new Date().toISOString(),
            product: {
              partnerName: "ifit",
              productCat: "PIN",
              inventoryId: code,
            },
            source: "Web",
            transactionId,
          },
        },
      });

      const responseCode = redeemResponse.data?.RetailTransactionTVResponse?.responseCode;

      if (responseCode && responseCode !== 0 && responseCode !== 136) {
        const responseText = redeemResponse.data?.RetailTransactionTVResponse?.responseText;
        throw Error(responseText);
      }

      // leaving this return value until we have more info on what should be returned and can build an accurate interface
      return code;
    } catch (err) {
      // timeout and cancel logic will be added in another PR
      throw Error(err.message);
    }
  }
}
