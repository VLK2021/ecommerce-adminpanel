import {axiosService} from "./axios.service.jsx";
import {urls} from "../constants/index.js";


const authService = {
    register: (data) => axiosService.post(urls.auth.register, data),
    login: (data) => axiosService.post(urls.auth.login, data),
    refresh: (refreshToken) => axiosService.post(urls.auth.refresh, null, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    }),
    logout: () => axiosService.post(urls.auth.logout),
    getMe: () => axiosService.get(urls.auth.getMe)
}

export {
    authService
}