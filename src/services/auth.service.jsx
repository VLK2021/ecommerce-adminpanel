import { axiosService } from './axios.service.jsx';
import { urls } from '../constants/index.js';

const authService = {
    register: (data) => axiosService.post(urls.auth.register, data),

    login: (data) => axiosService.post(urls.auth.login, data),

    refresh: () =>
        axiosService.post(urls.auth.refresh, null, {
            withCredentials: true,
        }),

    logout: () =>
        axiosService.post(urls.auth.logout, null, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }),

    getMe: () =>
        axiosService.get(urls.auth.getMe, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }),
};

export { authService };
