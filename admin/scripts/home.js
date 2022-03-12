const baseURl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

const access_token = sessionStorage.getItem('at');
console.log(access_token);

let musicList = document.getElementById('music-list');

let musicItem = null;
fetch(baseUrl + '/tracks' + '/?offset=0&limit=10', {
    headers: {
        'authorization': 'Bearer ' + access_token,
    }
}).then(response => console.log(response));

for (let i = 0; i < 20; i++) {
    musicItem = document.createElement('music-item');
    musicItem.setAttribute('src', 'sources/test.jpg');
    musicItem.setAttribute('title', `${i}. Peaches`);
    musicItem.setAttribute('artist', 'bieber');
    musicList.appendChild(musicItem)
}