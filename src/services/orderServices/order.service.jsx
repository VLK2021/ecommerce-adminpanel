import {axiosService} from "../axios.service.jsx";
import {urls} from "../../constants/index.js";


const orderService = {
    createOrder: (data) => axiosService.post(urls.orders, data)
        .then(res => res.data),

    getAllOrders: (params = {}) => {
        const queryParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        );

        return axiosService.get(urls.orders, {
            params: queryParams
        }).then(res => res.data);
    },

    getOrderById: (id) => axiosService.get(`${urls.orders}/${id}`)
        .then(res => res.data),

    updateOrderById: (id, data) => axiosService.patch(`${urls.orders}/${id}`, data)
        .then(res => res.data),

    updateStatusOrder: (id, status) => axiosService.patch(`${urls.orders}/${id}/status`, {status})
        .then(res => res.data),
};

export {
    orderService
}