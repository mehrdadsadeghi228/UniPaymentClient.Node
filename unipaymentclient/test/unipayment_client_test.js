'use strict';
const UniPaymentClient = require('../src/unipayment_client').uni_payment_client;

const assert = require('assert');
const mocha = require('mocha');
const it = mocha.it;
const uuid = require('uuid');
const configuration = require('./configuration.json');
const uniPaymentClient = new UniPaymentClient(configuration);

it('Create Invoice', (done) => {
    const parameters = {
        "app_id": "da124807-b619-4a49-a5c5-5a2aa59d3f0f",
        "title": "Test Invoice",
        "description": "Test Desc",
        "lang": "en-US",
        "price_amount": 100.0,
        "price_currency": "USD",
        "pay_currency": "USDT",
        "notify_url": "https://google.com",
        "redirect_url": "https://google.com",
        "order_id": uuid.v4(),
        "confirm_speed": "low"
    }
    uniPaymentClient.createInvoice(parameters).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Get Invoices', (done) => {
    const parameters = {};

    uniPaymentClient.getInvoices(parameters).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Query Invoice By Invoice Id Test', (done) => {
    uniPaymentClient.queryInvoiceById('3TRVatALvQvXxMBtznSNCz').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
    })
});

it('Query IPs Test', (done) => {
    uniPaymentClient.queryIps().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Currencies Test', (done) => {
    uniPaymentClient.getCurrencies().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Exchange Rates By Fiat Currency Test', (done) => {
    uniPaymentClient.getExchangeRatesByFiatCurrency('USD').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Exchange Rate By Currency Pair', (done) => {
    uniPaymentClient.getExchangeRateByCurrencyPair('USD', 'BTC').then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Check IPN', (done) => {
    var notify = '{"ipn_type":"invoice","event":"invoice_created","app_id":"cee1b9e2-d90c-4b63-9824-d621edb38012","invoice_id":"12wQquUmeCPUx3qmp3aHnd","order_id":"ORDER_123456","price_amount":2.0,"price_currency":"USD","network":null,"address":null,"pay_currency":null,"pay_amount":0.0,"exchange_rate":0.0,"paid_amount":0.0,"confirmed_amount":0.0,"refunded_price_amount":0.0,"create_time":"2022-09-14T04:57:54.5599307Z","expiration_time":"2022-09-14T05:02:54.559933Z","status":"New","error_status":"None","ext_args":"Merchant Pass Through Data","transactions":null,"notify_id":"fd58cedd-67c6-4053-ae65-2f6fb09a7d2c","notify_time":"0001-01-01T00:00:00"}';
    uniPaymentClient.checkIpn(notify).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Payouts', (done) => {
    uniPaymentClient.getPayouts().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Withdrawals', (done) => {
    uniPaymentClient.getWithdrawals().then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Create Withdrawal', (done) => {
    var createWithdrawalRequest = "{\"network\":\"NETWORK_BSC\",\"asset_type\":\"USDT\",\"amount\":1.01,\"auto_confirm\":false,\"include_fee\":true}";
    uniPaymentClient.createWithdrawal(createWithdrawalRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Get Withdrawal By ID', (done) => {
    var withdrawalId = "b0adfd72-ded2-4ad1-ae53-3c0713cd7009";
    uniPaymentClient.getWithdrawalById(withdrawalId).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

it('Cancel Withdrawal', (done) => {
    var cancelWithdrawalRequest = "{\"id\":\"b0adfd72-ded2-4ad1-ae53-3c0713cd7009\"}";
    uniPaymentClient.cancelWithdrawal(cancelWithdrawalRequest).then(response => {
        printResponse(response);
        assert.equal(response.data.code === 'OK', true);
        done();
    }).catch(error => {
        console.log(error);
        done();
    })
});

function printResponse(response) {
    console.log('Response: ' + JSON.stringify(response.data));
    console.log('Response Status: ' + response.data.code);
    console.log('\n\n');
}