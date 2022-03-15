import SpotifyWebApi from 'spotify-web-api-node';

class SpotifyTestApi extends SpotifyWebApi {
  constructor() {
    super();
  }
  searchTracks(): any {
    return require('./searchTracks_mock.json');
  }

  refreshAccessToken(): any {
    return require('./refreshAccessToken_mock.json');
  }
  getTrack(): any {
    return require('./getTrack_mock.json');
  }
  createAuthorizeURL(): any {
    return 'https://accounts.spotify.com/authorize';
  }
  authorizationCodeGrant(): any {
    return require('./authorizationCodeGrant_mock.json');
  }
  getMe(): any {
    return require('./getMe_mock.json');
  }
  getPlaylist(): any {
    return require('./getPlaylist_mock.json');
  }
  createPlaylist(): any {
    return require('./createPlaylist_mock.json');
  }
  uploadCustomPlaylistCoverImage(): any {
    return require('./uploadCustomPlaylistCoverImage_mock.json');
  }
}

export default SpotifyTestApi;

// require('fs').writeFileSync(
//   'src/service/SpotifyTestApi/mock.json',
//   JSON.stringify(result),
// );
