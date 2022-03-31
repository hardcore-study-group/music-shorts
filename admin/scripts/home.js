// initialize api keys
const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

let adminPasswordInput = document.getElementById('admin-password');

// get tracks
let musicList = document.getElementById('music-list');

fetch(baseUrl + '/tracks' + '/?offset=0&limit=50', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminPasswordInput.value,
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

// pop-up modal
let popupButton = document.getElementById('popup-button');
let modal = document.getElementById('modal');
popupButton.addEventListener('click', e => {
    modal.style.display = 'flex';
});

// pop-down modal
let modalOverlay = document.getElementById('modal-overlay');
modalOverlay.addEventListener('click', e => {
    modal.style.display = 'none';
});

// search tracks
let search = document.getElementById('search');
let spotifySearchBox = document.getElementById('spotify-search-box');

search.addEventListener('input', e => {
    if (e.target.value != '') {
        // spotify search
        fetch(baseUrl + '/search/spotify' + '/?q=' + e.target.value, {
            headers: {
                'Content-Type': 'application/json',
                'type': 'admin',
                'Authorization': 'Bearer ' + adminPasswordInput.value
            }
        }).then(res => res.json())
            .then(data => {
                spotifySearchBox.innerHTML = '';
                let searchItem = null;
                data.tracks.items.forEach(track => {
                    searchItem = document.createElement('search-item');
                    searchItem.setAttribute('track-id', track.id);
                    searchItem.setAttribute('src', track.album.images[2].url);
                    searchItem.setAttribute('title', track.name);
                    searchItem.setAttribute('artist', track.artists[0].name);
                    spotifySearchBox.appendChild(searchItem);
                });
            })
            .then(_ => {
                let searchItems = spotifySearchBox.childNodes;
                searchItems.forEach(searchItem => {
                    searchItem.addEventListener('click', event => addTrack(event, searchItem.getAttribute('track-id'),));
                });
            })
            .catch(error => {
                console.log('error: ' + error)
            });
    }
    else {
        spotifySearchBox.innerHTML = ''
    }
});


// add track
let curSelected = null;
function addTrack(event, trackId) {
    document.addForm.spotifyId.value = trackId;
    if (curSelected != null) {
        curSelected.classList.remove('selected');
    }
    curSelected = event.target.closest('.search-item-container');
    curSelected.classList.add('selected');
}

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', e => {
    addButton.disabled = true;
    document.getElementById('warning-sign').style.display = 'none';
    addButton.innerHTML = 'Uploading...';
    try {
        fetch(baseUrl + '/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + adminPasswordInput.value,
            },
            body: JSON.stringify({
                "spotify_id" : document.addForm.spotifyId.value,
                "youtube_id" : document.addForm.youtubeUrl.value.split('v=')[1].split('&')[0],
                "start_time" : document.addForm.youtubeStartTime.value,
                "end_time" : document.addForm.youtubeEndTime.value,
            })
        })
        .catch(error => console.log('post error:' + error))
        .then(res => {
            if (res.ok) {
                if (curSelected != null) {
                    curSelected.classList.remove('selected');
                }
                document.addForm.spotifyId.value = '';
                document.addForm.youtubeUrl.value = '';
                document.addForm.youtubeStartTime.value = '';
                document.addForm.youtubeEndTime.value = '';
            }
            else {
                document.getElementById('warning-sign').style.display = 'inline';
            }
        })
        .then(res => {
            addButton.disabled = false;
            addButton.innerHTML = 'Add music';
        });
    } catch(error) {
        console.log(error);
    }
})

// delete track
function deleteTrack(event, musicItem) {
    fetch(baseUrl + '/tracks/' + musicItem.getAttribute('track-id'), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminPasswordInput.value,
        }
    })
        .then(res => {
            musicItem.remove();
        });
}