// initialize api keys
const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

const access_token = sessionStorage.getItem('at');
console.log(access_token);

// get tracks
let musicList = document.getElementById('music-list');

fetch(baseUrl + '/tracks' + '/?offset=0&limit=50', {
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
            musicItem.setAttribute('track-id', track.id);
            musicItem.setAttribute('src', track.image);
            musicItem.setAttribute('title', track.name);
            musicItem.setAttribute('artist', track.artist_names);
            musicList.appendChild(musicItem);
        });
    })
    .then(_ => {
        let musicItems = musicList.childNodes;
        musicItems.forEach(musicItem => {
            let deleteButton = musicItem.getElementsByTagName('button')[0];
            deleteButton.addEventListener('click', event => deleteTrack(event, musicItem));
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
    // searchBox.style.display = 'none';
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
            let searchItem = null;
            data.tracks.items.forEach(track => {
                searchItem = document.createElement('search-item');
                searchItem.setAttribute('track-id', track.id);
                searchItem.setAttribute('src', track.album.images[2].url);
                if (!track.preview_url) {
                    searchItem.setAttribute('src', 'sources/test.jpeg');
                }
                searchItem.setAttribute('title', track.name);
                searchItem.setAttribute('artist', track.artists[0].name);
                searchBox.appendChild(searchItem);
            });
        })
        .then(_ => {
            let searchItems = searchBox.childNodes;
            searchItems.forEach(searchItem => {
                searchItem.addEventListener('click', event => addTrack(event, {
                    'trackId': searchItem.getAttribute('track-id'),
                    'src': searchItem.getAttribute('src'),
                    'title': searchItem.getAttribute('title'),
                    'artist': searchItem.getAttribute('artist'),
                }));
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


// add track
function addTrack(event, searchItem) {
    fetch(baseUrl + '/tracks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            'spotifyTrackId': searchItem.trackId
        }),
    })
    .then(res => {
        musicItem = document.createElement('music-item');
        musicItem.setAttribute('track-id', searchItem.trackId);
        musicItem.setAttribute('src', searchItem.src);
        musicItem.setAttribute('title', searchItem.title);
        musicItem.setAttribute('artist', searchItem.artist);
        musicList.prepend(musicItem)
    });
}

// delete track
function deleteTrack(event, musicItem) {
    console.log(musicItem.getAttribute('track-id'));
    fetch(baseUrl + '/tracks/' + musicItem.getAttribute('track-id'), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => {
        musicItem.remove();
    });
}