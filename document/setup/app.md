# Setup app
## Change following codes
#### `app/src/constants/values.ts`
```ts
// line 12
export const SPOTIFY_CLIENT_ID = 'babda1a147134d70b64cb301089cfeaa';
// to 
export const SPOTIFY_CLIENT_ID = 'your client id';

// line 18
return 'https://us-central1-music-shorts.cloudfunctions.net/api';
// to
return 'your server url';
```
- [client id reference](./spotify-developer.md#copy-client-id--secret-key)
- [server url reference](./functions.md#get-server-url)

--- 

## Run Android
```bash
# terminal location is ./app
yarn
yarn android
```

--- 

## Run Ios
```bash
# terminal location is ./app
yarn
yarn pod
yarn ios # or yarn ios
```

## Run test code
```bash
# terminal location is ./app
yarn test
```
