import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp',
});

instance.defaults.headers.common['Authorization'] = YOUR_AUTH_TOKEN;

export default instance;
