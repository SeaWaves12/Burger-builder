import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-builder-f61ec-default-rtdb.firebaseio.com/'
});

export default instance;
