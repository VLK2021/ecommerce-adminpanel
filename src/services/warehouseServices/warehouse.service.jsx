import {axiosService} from '../axios.service.jsx';
import {urls} from '../../constants/index.js';


const warehouseService = {
    getAllWarehouses: (params = {}) => {
        const queryParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        );

        return axiosService
            .get(urls.warehouse, {params: queryParams})
            .then((res) => res.data);
    },

    getWarehouseById: (id) =>
        axiosService.get(`${urls.warehouse}/${id}`)
            .then((res) => res.data),

    createWarehouse: (data) =>
        axiosService.post(urls.warehouse, data)
            .then((res) => res.data),

    updateWarehouse: (id, data) =>
        axiosService.patch(`${urls.warehouse}/${id}`, data)
            .then((res) => res.data),

    deleteWarehouse: (id) =>
        axiosService.delete(`${urls.warehouse}/${id}`)
            .then((res) => res.data),
};

export {warehouseService};
