
export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

const clientId = "80435fc805bb4d84b33703517dce6074";

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
];

export const getTokenFromUrl = () =>{
    return window.location.hash 
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
   // #accessToken=mysupersecretkey&name=sonny&abc
        let parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    
    }, {});
 
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
