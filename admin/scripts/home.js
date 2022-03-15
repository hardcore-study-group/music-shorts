// initialize api keys
const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

// const access_token = sessionStorage.getItem('at');
// console.log(access_token);
access_token = 'BQAESVryFOb2nids7Oq83zT3AdhP1Wlc4CtI9DqCgxZnQcXSXaZ7nHGMQQilJi6C1droR-aJ2Kyutx1LJQV2lQe7mbB4DhPjcRmS78SBElDPtD4bPYVrniSpSGo06Z6szH-L08YKpt4ViJYCUbf2Mr1jvGKfAA9vdnsGVHVrnrg';


// get tracks
let musicList = document.getElementById('music-list');

fetch(baseUrl + '/tracks' + '/?offset=0&limit=10', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
    }
})
    .then(res => res.json())
    .then(data => {
        let musicItem = null;

        data.forEach(track => {
            musicItem = document.createElement('music-item');
            musicItem.setAttribute('src', track.image);
            musicItem.setAttribute('title', track.name);
            musicItem.setAttribute('artist', track.artist_names);
            musicList.appendChild(musicItem);
        });
    });


// search tracks
let search = document.getElementById('search');
let searchBox = document.getElementById('search-box');

search.addEventListener('focus', e => {
    searchBox.style.display = 'block';
});

search.addEventListener('blur', e => {
    searchBox.style.display = 'none';
});

search.addEventListener('input', e => {
    fetch(baseUrl + '/search' + '/?q=' + e.target.value, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    }).then(res => res.json())
    .then(data => {
        data.tracks.items.forEach(track => {
            console.log('id: ' + track.id);
            console.log('name: ' + track.name);
            console.log('artist: ' + track.artists[0].name)
            console.log('image: ' + track.album.images[2].url);
        });
    })
    .catch(error => console.log('error: ' + error));
});