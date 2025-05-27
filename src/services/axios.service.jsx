import axios from 'axios';

import { baseURL } from '../constants/index.js';

const axiosService = axios.create({
    baseURL,
    withCredentials: false,
});

export { axiosService };
