require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const virgil = require('virgil-sdk');

const webhookKey = process.env.WEBHOOK_KEY;

function validateWebhookRequest(req, res, next) {
  console.log(`REQUEST HEADERS: ${JSON.stringify(req.headers)}`);
  // if (req.get('X-Parse-Webhook-Key') !== webhookKey) {
  //   return errorResponse(res, 'Unauthorized Request.');
  // }

  next();
}

function validateTrigger(triggerName, className) {
  return function (req, res, next) {
    if (triggerName !== req.body.triggerName
      || className !== req.body.object.className) {
      return errorResponse(res, 'Unknown trigger.');
    }

    next();
  }
}

function successResponse(res, data) {
  data = data || true;
  res.status(200).send({ 'success' : data });
}

function errorResponse(res, message) {
  message = message || true;
  res.status(200).send({ 'error' : message });
}

const app = express();

app.use(validateWebhookRequest);
app.use(bodyParser.json());
app.use(logger('dev'));

app.post('/users', validateTrigger('beforeSave', '_User'), function(req, res) {
  try {
    const applicationKey = virgil.crypto.importPrivateKey(
      process.env.APP_KEY,
      process.env.APP_KEY_PASSWORD
    );

    const user = req.body.object;
    const cardRequest = virgil.publishCardRequest.import(user.csr);
    const signer = virgil.requestSigner(virgil.crypto);
    signer.authoritySign(process.env.APP_ID, applicationKey);

    const client = virgil.client(
      process.env.VIRGIL_ACCESS_TOKEN,
      {
        cardsBaseUrl: process.env.VIRGIL_CARDS_URL
      }
    );

    client.publishCard(cardRequest)
      .then(card => {
        user.virgilCardId = card.id;
        delete user.csr;

        successResponse(res, user);
      })
      .catch(e => {
        console.error('Failed to publish Virgil Card', e);
        errorResponse(res, 'Could not create Virgil Card');
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.end('{ "error": "Request Failed."}');
});

const port = process.env.PORT || 443;
app.listen(port, function() {
  console.log('Webhooks server listening on port ' + port);
});
