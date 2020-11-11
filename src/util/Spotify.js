const clientId = '5b411b4a43a14a0cbccc27bfced413bd';
const redirectUri = "http://localhost:3000/";
let accessToken;
const Spotify = { 
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        //CHECK FOR ACCESS TOKEN MATCH
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); 
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //this clear the parameters, allowing us  to grab  a new access  token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        } 
    }

};
export default Spotify;