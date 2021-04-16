const axios = require('axios');

class Derp {
  constructor() {
    this.count = 0;
    this.redeemed = false;
    this.timeout = 1;
  }

  incrementCount() {
    this.count++;
    if (this.count === 4) {
      this.redeemed = true;
      this.count = 0;
    }
  }

  cancel() {
    this.incrementCount();
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('resolving cancellation...');
        resolve();
      }, 1000);
    })
  }

  async rederp() {
    try {
      // simulate redemption:
      if (this.redeemed) return console.log('Redeemed at last!');
      const response = await axios.post('http://localhost:8089/wait/what', { narf: 'feck' }, { timeout: this.timeout });
    } catch (err) {
      // if axios times out, the error code will be 'ECONNABORTED'
      if (err.code === 'ECONNABORTED') {
        await this.cancel();
        this.rederp();
      }
    }
  }
}

const derp = new Derp();

derp.rederp();

const inCommRequestObjects = {
  redeem: {
    "RetailTransactionTVRequest": {
      "dateTime": "2019-06-11T14:37:38.295Z", // required
      "product": { // required
        "partnerName": "AT&T Mobility", // required
        "acctNum": "", // optional
        "metafield": [], // optional
        "inventoryID": "9003131429", // required
        "productCat": "PIN" // required
      },
      "source": "Web", // required
      "transactionID": "2a8d9187-ede6-4be0-96c4-2dde8f0b7d52" // required
    }
  },
  getStatus: {
    "RetailTransactionTVRequest": {
      "dateTime": "2019-06-11T14:37:38.295Z", // required
      "product": { // required
        "partnerName": "AT&T Mobility", // required
        "acctNum": "", // optional
        "metafield": [], // optional
        "inventoryID": "9003131429", // required
        "productCat": "PIN" // required
      },
      "source": "Web", // required
      "transactionID": "2a8d9187-ede6-4be0-96c4-2dde8f0b7d52" // required
    }
  },
  cancel: {
    "RetailTransactionTVRequest": {
      "dateTime": "2019-06-11T14:37:38.295Z", // required
      "product": { // required
        "partnerName": "AT&T Mobility", // required
        "acctNum": "", // optional
        "metafield": [], // optional
        "inventoryID": "9003131429", // optional
        "productCat": "PIN" // optional
      },
      "source": "Web", // required
      "transactionID": "2a8d9187-ede6-4be0-96c4-2dde8f0b7d52" // required
    }
  },
  undoRedeem: {
    "RetailTransactionTVRequest": {
      "dateTime": "2019-06-11T14:37:38.295Z", // required
      "product": { // required
        "partnerName": "AT&T Mobility", // required
        "acctNum": "", // optional
        "metafield": [], // optional
        "inventoryID": "9003131429", // required
        "productCat": "PIN" // required
      },
      "source": "Web", // required
      "transactionID": "2a8d9187-ede6-4be0-96c4-2dde8f0b7d52" // required
    }
  }
}