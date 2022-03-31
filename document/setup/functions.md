# Setup Functions

## Firebase Config ([Reference](https://firebase.google.com/docs/functions/config-env?hl=ko#set_environment_configuration_for_your_project))
In this project use `firebase config` instaed of `.env` file.
#### Script
```bash
# Init firebase config with follow script
firebase functions:config:set spotify.client_id="..." spotify.client_secret="..." spotify.app_redirect_uri="..." spotify.admin_redirect_uri="..."
```
- spotify.client_id : [get from spotify dashboard](./spotify-developer.md#copy-clientid--secretkey)
- spotify.client_secret : [get from spotify dashboard](./spotify-developer.md#copy-clientid--secretkey)
- spotify.app_redirect_uri : musicshorts:/oauth
- spotify.admin_redirect_uri : https://[(auth-domain)](./firebase.md#get-your-auth-domain)/spotify/callback
- admin.password : Anything you want!

#### Result example
```bash
$ firebase functions:config:get
```
<img width="528" alt="image" src="https://user-images.githubusercontent.com/
48207131/158009928-4c80b60e-cf85-4142-910a-a4ca952c4405.png">

---

## Service account key
Download the service account key from the Firebase and save it to `functions/serviceAccountKey.json`
<img width="1544" alt="image" src="https://user-images.githubusercontent.com/48207131/159457979-d656f095-d7c0-4b12-a1f6-297705a58cc3.png">


---

## Replace storage bucket url

```ts
// functions/config/firebase.ts
// Line 15 not 8 !!
  storageBucket: 'music-shorts.appspot.com',
// ->
  storageBucket: 'your bucket',
```
<img width="1669" alt="image" src="https://user-images.githubusercontent.com/48207131/159458704-7ba63c60-8a5f-46c5-b5a7-83b20d548bf0.png">

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

## Menual deploy script
```bash
# terminal location is ./functions
yarn deploy
```

## Get server url
<img width="1671" alt="image" src="https://user-images.githubusercontent.com/48207131/158010911-5f64865e-9923-4677-bbf6-3a190fe31133.png">

---

## Test (Optional)
1. Create another firebase project like `music-shorts-test`
2. Acitve `Firestore Database` & `Storage` [refrence](./firebase.md#active-firestore-database--stroage)
3. Download `serviceAccountKey.json`
<img width="1537" alt="image" src="https://user-images.githubusercontent.com/48207131/158325361-5cb2dc80-3ac9-4b82-91fe-1689f0f8737f.png">
 
4. copy to `functions/testServiceAccountKey.json` (this key use in [here](../../functions/src/config/firebase.ts))
5. replace `functions/config/firebase.ts line 8` [refrence](#replace-storage-bucket-url)
6. run script
```bash
# terminal location is ./functions
yarn test
```

#### Test `(POST) /track`
[Download ffmpeg](https://www.ffmpeg.org/download.html) and remove the annotation `functions/src/routes/__tests__/tracks.test.ts line 39 ~ 55`
