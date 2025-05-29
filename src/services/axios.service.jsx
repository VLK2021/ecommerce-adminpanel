import axios from 'axios';

import { baseURL } from '../constants/index.js';

const axiosService = axios.create({
    baseURL,
    withCredentials: true, // головне: відправляє httpOnly cookie
});

axiosService.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (
            err.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login')
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(`${baseURL}/auth/refresh`, null, {
                    withCredentials: true,
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                axiosService.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosService(originalRequest);
            } catch (refreshErr) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export { axiosService };
