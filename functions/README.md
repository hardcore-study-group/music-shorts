# Functions
### Env (only need for testing)
```js
FIREBASE_TEST_PROJECT_ID // your test project id
```
### Firebase Config ([Reference](https://firebase.google.com/docs/functions/config-env?hl=ko#set_environment_configuration_for_your_project))
```json
{
  "spotify": {
    "client_id": "...",
    "client_secret": "...",
    "redirect_uri": "..."
  }
}
```

> firebase functions:config:set spotify.client_id="..." spotify.client_secret="..." spotify.redirect_uri="..."
### Secret file
```
./testServiceAccountKey.json # your test firebase project's service account key, used when "npm run test"
```