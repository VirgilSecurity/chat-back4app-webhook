# Back4App + Virgil Security Demo Chat 

A module used to generate [beforeSave Trigger](http://docs.parseplatform.org/cloudcode/guide/#beforesave-triggers)
for Back4App-powered Chat demo application. The purpose of this trigger is to publish Virgil Cards of the
app users on Virgil Cards Service.

## Get started

### Prerequisites

To use this project you will need:

* An account at [Virgil Dashboard](https://developer.virgilsecurity.com/account/dashboard/).
* An _app_ in your Virgil Dashboard account. Make sure you have the _private key_ of this app.
* An account at [Back4App Dashboard](https://dashboard.back4app.com/).
* An app in your Back4App Dashboard account.
* Although not required, you may want to install the [Back4App CLI](https://docs.back4app.com/docs/integrations/command-line-interface/setting-up-cloud-code/) 
to facilitate Cloud Code deploy

### Configure

Clone this repository

```bash
git clone https://github.com/VirgilSecurity/chat-back4app-webhook.git
```

Go to the project folder

```bash
cd chat-back4app-webhook
```

This project reads configuration parameters (such as app's private key) from `config.json` file in a root folder.
The following parameters are required for the trigger to work:

| Variable name | Description |
| --- | --- |
| VIRGIL_APP_ID | Id of your app from [Virgil Dashboard](https://developer.virgilsecurity.com/account/dashboard/) |
| VIRGIL_APP_PRIVATE_KEY | Your app's private key as base64-encoded string |
| VRIGIL_APP_PRIVATE_KEY_PASSWORD | Password used to protect the app's private key |
| VIRGIL_APP_ACCESS_TOKEN | Your app's access token for Virgil Services |

To setup locally, copy the `config.example.json` file in the root project folder, save it under name `config.json`
and fill it in with your app's specific values. Please note, the `config.json` file is included in `.gitignore`
because it contains sensitive information and must not be committed into the repo.

```bash
cp config.example.json config.json
```

> Hint. You can get your Virgil App's private key from a file into base64-encoded string by performing the following command in the terminal (Unix): 
```bash
cat ~/Downloads/<your_app_name>.virgilkey | base64
```
> Or on Windows:
```bash
certutil -encode <your_app_name>.virgilkey tmp.b64 && findstr /v /c:- tmp.b64 > app_private_key.txt
# copy the contents of app_private_key.txt manually
```

### Generate the Cloud Code Trigger

```bash
npm run generate
```

## Deploy

If you have [Back4App CLI](https://docs.back4app.com/docs/integrations/command-line-interface/) installed on your 
system, follow the instructions on how to [set up Cloud Code](https://docs.back4app.com/docs/integrations/command-line-interface/setting-up-cloud-code-2/) 
for you app. Then run:

```bash
b4a deploy
```

That's it! Now you can create Virgil Cards for your users.