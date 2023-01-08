const {generateWallet, Currency, storeTransaction, getDepositAddressesForAccount } = require("@tatumio/tatum");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

function createWallet() {
    const wallet = generateWallet(Currency.ETH, true);
    return wallet;
}

async function signUp(xpub, uuid) {
    const resp = await fetch(
        `https://api.tatum.io/v3/ledger/account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.TATUM_API_KEY
          },
          body: JSON.stringify({
            currency: 'ETH',
            xpub: xpub,
            customer: {
                accountingCurrency: 'USD',
                customerCountry: 'US',
                externalId: uuid,
                providerCountry: 'US'
            }
          })
        }
      );
      
      const data = await resp.json();
      return data;
}

async function allAccounts() {
    const resp = await fetch(
        `https://api.tatum.io/v3/ledger/account`,
        {
          method: 'GET',
          headers: {
            'x-api-key': process.env.TATUM_API_KEY
          }
        }
      );
      
      const data = await resp.json();
      console.log('Total number of accounts: ', data.length);
      console.log(data);
}

async function accountTransactions(accountId) {
    const query = new URLSearchParams({pageSize: '10', count: false}).toString();
    const resp = await fetch(
        `https://api.tatum.io/v3/ledger/transaction/account?${query}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.TATUM_API_KEY
          },
          body: JSON.stringify({
            id: accountId
          })
        }
      );
      
    const data = await resp.json();
    console.log(data);
}

async function customerAccounts(customerId) {
    const query = new URLSearchParams({pageSize: '10'}).toString();

    const resp = await fetch(
    `https://api.tatum.io/v3/ledger/account/customer/${customerId}?${query}`,
    {
        method: 'GET',
        headers: {
            'x-api-key': process.env.TATUM_API_KEY
        }
    }
    );

    const data = await resp.json();
    return data;
}

async function createDepositAddress(accountId) {
    
    const resp = await fetch(
    `https://api.tatum.io/v3/offchain/account/${accountId}/address`,
    {
        method: 'POST',
        headers: {
            'x-api-key': process.env.TATUM_API_KEY
        }
    }
    );

    const data = await resp.json();
    console.log(data);
}

async function allDepositAddresses(accountId) {
  const resp = await fetch(
  `https://api.tatum.io/v3/offchain/account/${accountId}/address`,
  {
      method: 'GET',
      headers: {
      'x-api-key': process.env.TATUM_API_KEY
      }
  }
  );

  const data = await resp.json();
  return data;
}

async function blockCurrencyInAccount(accountId, amount) {
    const resp = await fetch(
    `https://api.tatum.io/v3/ledger/account/block/${accountId}`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TATUM_API_KEY
        },
        body: JSON.stringify({
        amount: amount,
        type: 'DEBIT_CARD_OP'
        })
    }
    );

    const data = await resp.json();
    console.log(data);
}

async function unblockById(blockageId) {
  const id = blockageId;
  const resp = await fetch(
    `https://api.tatum.io/v3/ledger/account/block/${id}`,
    {
      method: 'DELETE',
      headers: {
        'x-api-key': process.env.TATUM_API_KEY
      }
    }
  );

  if (resp.status === 204) {
    console.log('success');
  } else {
    const data = await resp.text();
    console.log(data);
  }
}

async function getBlockAmount(accountId) {
  const query = new URLSearchParams({pageSize: '10'}).toString();

  const id = accountId
  const resp = await fetch(
    `https://api.tatum.io/v3/ledger/account/block/${id}?${query}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': process.env.TATUM_API_KEY
      }
    }
  );

  const data = await resp.text();
  console.log(data);
}

async function allDeposits() {
    const resp = await fetch(
        `https://api.tatum.io/v3/ledger/deposits`,
        {
          method: 'GET',
          headers: {
            'x-api-key': process.env.TATUM_API_KEY
          }
        }
      );
      
      const data = await resp.json();
      console.log(data);
}

async function getBalance(address) {
    const resp = await fetch(
    `https://api.tatum.io/v3/ethereum/account/balance/${address}`,
    {
        method: 'GET',
        headers: {
        'x-api-key': process.env.TATUM_API_KEY
        }
    }
    );

    const data = await resp.json();
    console.log(data);
}

async function sendVirtual(from, to, amount) {
  const body = {
    senderAccountId: from,
    recipientAccountId: to,
    amount: amount,
    baseRate: 1
  }

  await storeTransaction(body);
}


const main = async () => {
  // const wallet = {
    //     xpub: 'xpub6FJALE5fcurJSALE5ke2cQNKghXdXWbQ2WHGDjT7UsZ2hKFZYLLAWR4UsJN8kxSUPpvUKAtUp3UpVbKagu6A1SeMvH1fZWcehdBc4rbkNw9',
    //     mnemonic: 'bus drift come athlete issue decorate invite timber execute guilt season shadow foam original ritual outside busy angle comfort portion action flag robot invite'
    // };
  const uuid = '23af24d5-8a55-4fac-97de-60f1080d84df';
  const customerId = '63b474ed30f4d56085179c44';
  const accountId = '63b474ed30f4d56085179c43';

  const [sender, recipient] = await customerAccounts(customerId);
  console.log(sender, recipient);
  console.log(await getDepositAddressesForAccount(sender.id));
  // await sendVirtual(sender.id, recipient.id, '0.000000001');
  // console.log(sender, recipient);
}

module.exports = { createWallet, signUp }