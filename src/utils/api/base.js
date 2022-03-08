import axios from 'axios'

let token = 'df14424adf4d216b0a08b5fa153703e6aeea162ba96cce71973fc731a72e536530dcb83b2c34a6a18c9e37b201c43e9265043f3b88b12de5907fb499ee0d10f70604a394d60f3d79e7f0cc8aea3ef6bd32715746e581b3470a4ff01329d4e12d05af9ca6bd8bf33f08ec347cac73bbdb5447ff22f207978cb9a60460dee2ae74'
const base = axios.create({
    baseURL: 'https://navapi.mercutio.club/api/',
    // timeout: 1000,
    headers: {
        'Authorization': 'Bearer ' + token
    }
});
export default base