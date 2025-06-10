import {axiosService} from "./axios.service.jsx";
import {urls} from "../constants/index.js";


const productService = {
    getAllProducts: () => axiosService.get(urls.product)
        .then(value => value.data),

    createProduct: (data) => axiosService.post(urls.product, data)
        .then(value => value.data),

    updateProduct: (id, data) => axiosService.put(`${urls.product}/${id}`, data)
        .then(value => value.data),

    deleteProduct: (id) => axiosService.delete(`${urls.product}/${id}`),

    getProductById: (id) => axiosService.get(`${urls.product}/${id}`)
        .then(value => value.data),
};

export {
    productService
}