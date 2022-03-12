const oauthUrl = 'https://us-central1-music-shorts.cloudfunctions.net/api/auth/oauthurl/spotify';

let button = document.getElementById('sign-in');
button.addEventListener('click', function() {
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
                    await this.auth.signInWithCustomToken(event.data);
                    this.router.navigate(['/']);
                    clearInterval(interval);
                },
                false,
            );
        });
});
