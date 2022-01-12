# music-shorts
Open source project about app "music shorts"

# firebase config
```
spotify.client_id
spotify.client_secret
```

# Use Spotify Sign In with Firebase

This sample shows how to authenticate using Spotify Sign-In on Firebase. In this sample we use OAuth 2.0 based authentication to get Spotify user information then create a Firebase Custom Token (using the Spotify user ID).


## Setup the sample

Create and setup the Firebase project:
 1. Create a Firebase project using the [Firebase Developer Console](https://console.firebase.google.com).
 1. Enable Billing on your Firebase project by switching to the **Blaze** plan, this is currently needed to be able to perform HTTP requests to external services from a Cloud Function. See the [pricing](https://firebase.google.com/pricing/) page for more details.

Create and provide a Service Account's credentials:
 1. Create a Service Accounts file as described in the [Server SDK setup instructions](https://firebase.google.com/docs/server/setup#add_firebase_to_your_app).
 1. Save the Service Account credential file as `./functions/service-account.json`

Create and setup your Spotify app:
 1. Create a Spotify app in the [Spotify Developers website](https://developer.spotify.com/my-applications/).
 1. Add the URL `https://<application-id>.firebaseapp.com/spotify/popup.html` to the
    **Redirect URIs** of your Spotify app.
 1. Copy the **Client ID** and **Client Secret** of your Spotify app and use them to set the `spotify.client_id` and `spotify.client_secret` Google Cloud environment variables. For this use:

    ```bash
    firebase functions:config:set spotify.client_id="yourClientID" spotify.client_secret="yourClientSecret"
    ```

 > Make sure the Spotify Client Secret is always kept secret. For instance do not save this in your version control system.

Deploy your project:
 1. Run `firebase use --add` and choose your Firebase project. This will configure the Firebase CLI to use the correct project locally.
 1. Run `firebase deploy` to effectively deploy the sample. The first time the Functions are deployed the process can take several minutes.