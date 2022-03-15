# Setup Admin
- Auth page is used when sign in at the admin page.
## Change following codes
#### `auth/spotify/callback.html`
```ts
// line 20
fetch('https://us-central1-music-shorts.cloudfunctions.net/api/auth/token/swap', 
// to 
fetch('[your server url]/auth/token/swap', 
```
- [server url reference](./functions.md#get-server-url)

#### `admin/scripts/home.js` & `admin/scripts/sign-in.js`
```ts
// line 1
const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';
// to 
const baseUrl = '[your server url]';
```
- [server url reference](./functions.md#get-server-url)

--- 

## Regist spotify callback url
Add new spotify callback url `[your-auth-domain]/spotify/callback`.
#### Spotify dashboard result
<img width="583" alt="image" src="https://user-images.githubusercontent.com/48207131/158011739-70ee86fe-f944-46c1-b905-c25edf15c7bb.png">

- [regist callback url reference](./spotify-developer.md#insert-these-three-infos)
- [auth domain reference](./functions.md#get-your-auth-domain)

---

## Deploy
#### Auth
```bash
firebase deploy --only hosting:auth
```
#### Admin
```bash
firebase deploy --only hosting:admin
```
---

## Upgrade user to admin
Change current user's data like that
<img width="1652" alt="image" src="https://user-images.githubusercontent.com/48207131/158011518-8f235116-2be4-43df-98ee-59b8412a11b9.png">