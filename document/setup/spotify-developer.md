# Spotify developer
`Music shorts` use spotify to streaming & search tracks. So we need regist our project to `spotify developer`

## Create spotify project
1. [Spotify Developer](https://developer.spotify.com/dashboard/applications) and sign in. 
2. Create a project as follows.

![Create spotify project](https://user-images.githubusercontent.com/48207131/158005960-b0ec1533-bc80-4b16-a618-529efc5aee30.gif)

---

## Fill the service information
Open the `Edit settings` modal
<img width="1775" alt="image" src="https://user-images.githubusercontent.com/48207131/158006040-e1f0970a-f1ec-4371-b361-96aa3cb7aa3d.png">

### Insert these three infos
**Redirect URIs**
- musicshorts://spotify-login-callback
- https://auth.music-shorts.com/spotify/callback

**Bundle IDs**
- com.hardcorestudygroup.musicshort

**Android Packages**
- com.hardcorestudygroup.musicshorts (Added 's' is different from bundle id)
- 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25

---

## Regist account
This spotify project is testing mode. The testing mode is only provide allowed user. So you regist user to allow. When you release app upgrade to product mode by `contect to spotify team`
<img width="1672" alt="image" src="https://user-images.githubusercontent.com/48207131/158006361-c8d2bf24-d31f-49ee-a343-9df6a7a6f781.png">

---

## Copy client id & secret key
`Client id` is using `app` & `admin` & `server`. `Secret key` is using `server`.
<img width="549" alt="image" src="https://user-images.githubusercontent.com/48207131/158006552-07f58554-a6a3-4632-aad1-f83be52dbfd3.png">
