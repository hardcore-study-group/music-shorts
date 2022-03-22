const baseUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api';

const oauthUrl = `${baseUrl}/auth/oauthurl/spotify?state=admin`;

let button = document.getElementById('sign-in');
button.addEventListener('click', function () {
    fetch(oauthUrl)
        .then(response => response.text())
        .then(url => {
            const popup = window.open(url, '_blank', 'width=500,height=600');
            const interval = setInterval(() => {
                popup.postMessage('callback', 'https://auth.music-shorts.com')
            }, 1000);
            window.addEventListener(
                'message',
                async event => {
                    if (event.origin !== 'https://auth.music-shorts.com') return;
                    popup?.close();
                    const data = JSON.parse(event.data);
                    if (data) {
                        clearInterval(interval);
                        sessionStorage.setItem('at', data.access_token);
                        location.href = 'home.html';
                    }
                    else {
                        document.getElementById('fail').style = 'color:red;';
                    }
                },
                false,
            );
        });
});
