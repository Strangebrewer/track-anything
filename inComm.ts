import axios from "axios";

export default class InCommApiClient {
  private authToken: string;

  constructor(authToken: string = null) {
    this.authToken = authToken;
  }

  private async authorize(): Promise<string> {
    return "auth-token";
  }

  private async cancel(transactionId: string): Promise<string> {
    if (!this.authToken) {
      this.authorize();
    }
    return transactionId;
  }

  public async getStatus(pin: string): Promise<string> {
    if (!this.authToken) {
      this.authorize();
    }
    const getStatusResponse = await axios.post(`${process.env}/rtg-tv/v2/api/getStatus`, {
      headers: {
        Authentication: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      },
      data: {
        client_id: process.env.INCOMM_CLIENT_ID,
        RetailTransactionTVRequest: {
          dateTime: new Date().toISOString(),
          product: {
            partnerName: "ifit",
            productCat: "PIN",
            inventoryID: pin,
          },
          source: "Web?",
          transactionID: "?",
        },
      },
    });

    const responseText = getStatusResponse.data?.RetailTransactionTVResponse?.responseText;

    if (!responseText) {
      throw Error("Bad pin");
    }

    return responseText;
  }

  public async redeem(code: string): Promise<string> {
    return code;
  }
}
