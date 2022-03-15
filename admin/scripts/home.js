// initialize api keys
const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

// const access_token = sessionStorage.getItem('at');
// console.log(access_token);
access_token = 'BQD-2tWwlhAtxgIumDcLr-90SiDucHZigKy5jTrE2onDc7_AtJqUx0-WNIpd8Zuw0imTROCSxItIpBdznpne0_wspKPnOelHSoZ9db3RKF94YNBX1BtPySKFQ_kzSl5bhaSFmyVLl-cJkIlar-Tn_cgS9SsBJCIjKI6DPNbf8Zc';


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
        musicList.innerHTML = '';
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
    if (search.value != '') {
        searchBox.style.display = 'block';
    }
});

search.addEventListener('blur', e => {
    searchBox.style.display = 'none';
});

search.addEventListener('input', e => {
    if (e.target.value != '') {
        searchBox.style.display = 'block';
        fetch(baseUrl + '/search' + '/?q=' + e.target.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(res => res.json())
        .then(data => {
            searchBox.innerHTML = '';
            data.tracks.items.forEach(track => {
                searchItem = document.createElement('search-item');
                searchItem.setAttribute('item-id', track.id);
                searchItem.setAttribute('src', track.album.images[2].url);
                searchItem.setAttribute('title', track.name);
                searchItem.setAttribute('artist', track.artists[0].name);
                searchBox.appendChild(searchItem);
            });
        })
        .catch(error => {
            console.log('error: ' + error)
            searchBox.style.display = 'none';
        });
    }
    else {
        searchBox.style.display = 'none';
    }
});