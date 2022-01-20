# Functions
### Env
```js
FIREBASE_TEST_PROJECT_ID // your test project id
SPOTIFY_TEST_CLIENT_ID // your spotify test project client id
SPOTIFY_TEST_SECRET // your spotify test project secret key
SPOTIFY_TEST_ACCOUNT_ID // your spotify test account id, must be email
SPOTIFY_TEST_ACCOUNT_PASSWORD // your spotify test account password
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
### Secret file
```
./testServiceAccountKey.json # your test firebase project's service account key, used when "npm run test"
```