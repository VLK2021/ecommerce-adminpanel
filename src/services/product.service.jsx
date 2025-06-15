import { axiosService } from "./axios.service";
import { urls } from "../constants";


const productService = {
    getAllProducts: (params = {}) => {
        const queryParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        );

        return axiosService.get(urls.product, {
            params: queryParams
        }).then(res => res.data);
    },

    createProduct: (data) =>
        axiosService.post(urls.product, data).then(res => res.data),

    updateProduct: (id, data) =>
        axiosService.patch(`${urls.product}/${id}`, data).then(res => res.data),

    deleteProduct: (id) =>
        axiosService.delete(`${urls.product}/${id}`),

    getProductById: (id) =>
        axiosService.get(`${urls.product}/${id}`).then(res => res.data),
};

export { productService };
