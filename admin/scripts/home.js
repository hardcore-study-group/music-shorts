let access_token = sessionStorage.getItem('at');
console.log(access_token);

let musicList = document.getElementById('music-list');

let musicItem = null;

for (let i = 0; i < 20; i++) {
    musicItem = document.createElement('music-item');
    musicItem.setAttribute('src', 'sources/test.jpg');
    musicItem.setAttribute('title', `${i}. Peaches`);
    musicItem.setAttribute('artist', 'bieber');
    musicList.appendChild(musicItem)
}

