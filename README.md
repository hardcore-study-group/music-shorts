[![CI App](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-app.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-app.yml)
[![CI Admin](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-admin.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-admin.yml)
[![CI Functions](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-functions.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/ci-functions.yml)
[![CD Admin](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-admin.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-admin.yml)
[![CD Functions](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-functions.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-functions.yml)
[![CD Auth](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-auth.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-auth.yml)
[![CD Homepage](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-homepage.yml/badge.svg)](https://github.com/hardcore-study-group/music-shorts/actions/workflows/cd-homepage.yml)
[![codecov](https://codecov.io/gh/hardcore-study-group/music-shorts/branch/main/graph/badge.svg)](https://codecov.io/gh/hardcore-study-group/music-shorts)
[![License GPL3.0](https://img.shields.io/github/license/hardcore-study-group/music-shorts?style=plat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
![Stars](https://img.shields.io/github/stars/hardcore-study-group/music-shorts?style=social)

<img src="https://img.shields.io/badge/ReactNative-222222?style=for-the-badge&logo=React&logoColor=#61DAFB"> <img src="https://img.shields.io/badge/Typescript-222222?style=for-the-badge&logo=Typescript&logoColor=#3178C6"> <img src="https://img.shields.io/badge/Jest-222222?style=for-the-badge&logo=Jest&logoColor=#C21325"> <img src="https://img.shields.io/badge/firebase-222222?style=for-the-badge&logo=Firebase&logoColor=#C21325"> <img src="https://img.shields.io/badge/spotify-222222?style=for-the-badge&logo=spotify&logoColor=#C21325">

<img width="300" src="https://user-images.githubusercontent.com/48207131/157844702-356aeccc-0b79-4f5b-bd9d-14abef3bddf0.gif">

### Introduction

`Music Shorts` is short music streaming service using `spotify api & sdk`

### Product
- App

  <a href="https://apps.apple.com/app/id1614247798"><img src="https://user-images.githubusercontent.com/27461460/77502559-8c8a8d80-6e9e-11ea-9f8e-0f58c704eed6.png" width="200"/></a> <a href="https://play.google.com/store/apps/details?id=com.hardcorestudygroup.musicshorts"><img src="https://user-images.githubusercontent.com/27461460/77502571-90b6ab00-6e9e-11ea-9e93-235a319ebb41.png" width="200"/></a>

- Admin

  [https://admin.music-shorts.com](https://admin.music-shorts.com)

- Server (firebase functions)

  [swagger](https://us-central1-music-shorts.cloudfunctions.net/api/docs)

- UI/UX

  [figma](https://www.figma.com/file/aFiVrI4vWb7B02eWnKT4db/Music-shorts?node-id=0%3A1)
---
### Setup
##### Third party setup
1. [Fork this repository](./document/setup/fork.md) (optional)
2. [Regist spotify developer](./document/setup/spotify-developer.md)
3. [Create firebase project](./document/setup/firebase.md)
##### Project setup
4. [Setup basic](./document/setup/basic.md)
5. [Setup functions](./document/setup/functions.md)
6. [Setup app](./document/setup/app.md)
7. [Setup admin](./document/setup/admin.md)
---
### Specification
#### App
| language | framework | third party | state management | networking | testing |
|-|-|-|-|-|-|
| typescript | react-native@0.67 | [react-native-spotify-remote](https://github.com/cjam/react-native-spotify-remote) | react-context-api | react-query, axios | jest |

#### Server
| language | framework | third party | documentation | testing |
|-|-|-|-|-|
| typescript | express, firebase-functions | [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) | [swagger](https://us-central1-music-shorts.cloudfunctions.net/api/docs) | jest |

#### Admin
| language | hosting |
|-|-|
| javascript@es6, html, css | firebase-hosting |
