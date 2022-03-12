# Setup Functions
### Firebase Config ([Reference](https://firebase.google.com/docs/functions/config-env?hl=ko#set_environment_configuration_for_your_project))
In this project use `firebase config` instaed of `.env` file.
#### Script
```bash
# Init firebase config with follow script
firebase functions:config:set spotify.client_id="..." spotify.client_secret="..." spotify.redirect_uri="..." spotify.admin_redirect_uri="..."
```
- client_id : [get from spotify dashboard](./spotify-developer.md#copy-clientid--secretkey)
- client_secret : [get from spotify dashboard](./spotify-developer.md#copy-clientid--secretkey)
- redirect_uri : musicshorts://spotify-login-callback
- admin_redirect_uri : https://[(auth-domain)]()/spotify/callback

#### Get your auth domain
<img width="1518" alt="image" src="https://user-images.githubusercontent.com/48207131/158009610-58b2b685-d710-4530-b123-0a6eed8b07fe.png">

#### Result example
<img width="528" alt="image" src="https://user-images.githubusercontent.com/48207131/158009928-4c80b60e-cf85-4142-910a-a4ca952c4405.png">

---

## Serve script
```bash
# terminal location is ./functions
# install packages
yarn
# migrate to firebase config only call config changed
yarn firebase:config
# serve
yarn dev
```

---

## Test script
```bash
# terminal location is ./functions
yarn test
```
---

## Menual deploy script
```bash
# terminal location is ./functions
yarn deploy
```

## Get server url
<img width="1671" alt="image" src="https://user-images.githubusercontent.com/48207131/158010911-5f64865e-9923-4677-bbf6-3a190fe31133.png">
