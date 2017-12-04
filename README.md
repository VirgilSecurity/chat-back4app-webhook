# Virgil Demo Chat Back4App

Express app used as a [beforeSave Webhook](http://docs.parseplatform.org/cloudcode/guide/#beforesave-webhooks)
for Back4App-powered Chat demo application. The purpose of this webhook is to publish Virgil Cards of the
app users on Virgil Cards Service.

## Get started

### Configure
The following environment variables must be set:

| Variable name | Description |
| --- | --- |
| APP_ID | Id of your app from [Virgil Dashboard](https://developer.virgilsecurity.com/account/dashboard/) |
| APP_KEY | Your app's private key as base64-encoded string |
| APP_KEY_PASSWORD | Password used to protect the app's private key |
| VIRGIL_ACCESS_TOKEN | Your app's access token for Virgil Services |
| WEBHOOK_KEY | The Webhook Key from your app's settings on [Back4App Dashboard](https://dashboard.back4app.com/) |

This project uses [dotenv](https://github.com/motdotla/dotenv) module to load variables from `.env` file into
`process.env`. To setup locally, copy the `.env.example` file in the root project folder, save it under name `.env`
and fill it in with your app's specific values.

```bash
cp .env.example .env
```

### Install dependencies

```bash
npm install
```

### Run

```bash
npm start
```
