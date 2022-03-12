# Setup app
## Change following codes
#### `app/src/constants/values.ts`
```ts
// line 12
export const SPOTIFY_CLIENT_ID = 'babda1a147134d70b64cb301089cfeaa';
// to 
export const SPOTIFY_CLIENT_ID = 'your client id';

// line 19
return 'https://us-central1-music-shorts.cloudfunctions.net/api';
// to
return 'your server url';
```
- [client id reference](./spotify-developer.md#copy-client-id--secret-key)
- [server url reference](./functions.md#get-server-url)

--- 

## Run Android
```bash
# The Spotify app can only be downloaded on a real device, so we recommend running it on a real device.
# terminal location is ./app
yarn
yarn android
```

--- 

## Run Ios ([Reference](https://stackoverflow.com/questions/38495793/run-react-native-application-on-ios-device-directly-from-command-line))
```bash
# The Spotify app can only be downloaded on a real device, so we recommend running it on a real device.
# terminal location is ./app
yarn
yarn pod
yarn ios:device # or yarn ios
```

## Run test code
```bash
# terminal location is ./app
yarn test
```
