# Virgil Demo Chat Back4App

Express app used as a [beforeSave Webhook](http://docs.parseplatform.org/cloudcode/guide/#beforesave-webhooks)
for Back4App-powered Chat demo application. The purpose of this webhook is to publish Virgil Cards of the
app users on Virgil Cards Service.

## Get started

### Prerequisites

To use this project you will need:

* An account at [Virgil Dashboard](https://developer.virgilsecurity.com/account/dashboard/).
* An _app_ in your Virgil Dashboard account. Make sure you have the _private key_ of this app.
* An account at [Back4App Dashboard](https://dashboard.back4app.com/).
* An app in your Back4App Dashboard account.

### Configure

This project reads configuration parameters (such as app's private key) from environment at runtime.
The following environment variables are required for this project to work:

| Variable name | Description |
| --- | --- |
| APP_ID | Id of your app from [Virgil Dashboard](https://developer.virgilsecurity.com/account/dashboard/) |
| APP_KEY | Your app's private key as base64-encoded string |
| APP_KEY_PASSWORD | Password used to protect the app's private key |
| VIRGIL_ACCESS_TOKEN | Your app's access token for Virgil Services |
| WEBHOOK_KEY | The Webhook Key from your app's settings on [Back4App Dashboard](https://dashboard.back4app.com/) |

This project uses [dotenv](https://github.com/motdotla/dotenv) module to load variables from `.env` file into
`process.env`. To setup locally, copy the `.env.example` file in the root project folder, save it under name `.env`
and fill it in with your app's specific values. Please note, the `.env` file is included in `.gitignore`
because it contains sensitive information and must not be committed into the repo.

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

## Deploy

This Webhook must be hosted in its own environment, separate from the Back4App server.
Following is an example of how to deploy this app at [Heroku](https://www.heroku.com/) using
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

Cloud Code Webhooks requires an HTTPS connection, and so a valid SSL certificate is required. Heroku will handle this for you.

Log into Heroku:
```bash
heroku login
```

Create a new app:
```bash
heroku create
```

Add your config to the Heroku app:
```bash
heroku config:set APP_ID=your_app_id APP_KEY=your_app_key APP_KEY_PASSWORD=your_app_key_password VIRGIL_ACCESS_TOKEN=your_access_token WEBHOOK_KEY=your_webhook_key
```

Deploy to Heroku:
```bash
// This is pushing the local master branch to the remote master branch
git push heroku master
```

Now, use the URL of your Heroku app to set up your Webhooks in the Back4App app dashboard.
