# Basic setup
## Firebase login
firebase login with following scripts
```bash
npm install -g firebase-tools
firebase login
```
![화면 기록 2022-03-12 오후 4 36 03](https://user-images.githubusercontent.com/48207131/158008829-c8e3d43b-8ba0-4747-96fb-3bd04dda3d26.gif)

## Update `.firebaserc`
Access the [firebase console](./firebase.md#create-firebase-project) and get your `project id`
<img width="1118" alt="image" src="https://user-images.githubusercontent.com/48207131/158008369-45bb6192-4794-49ad-94f0-1a3cf56fda9d.png">
Access the [firebase hosting](./firebase.md#regist-admin--auth-domain-in-firebase-hosting) and get your domains
```json
{
  "projects": {
    "default": "music-shorts-b2894" <- fill your project id
  },
  "targets": {
    "music-shorts": {
      "hosting": {
        "auth": [
          "music-shorts-auth-test" <- update here
        ],
        "admin": [
          "music-shorts-admin-test" <- update here
        ],
        "homepage": [
          "music-shorts"
        ]
      }
    }
  }
}
```