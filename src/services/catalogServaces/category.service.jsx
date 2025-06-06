import {axiosService} from "../axios.service.jsx";
import {urls} from "../../constants/index.js";


const categoryService = {
    getAllCategory: () => axiosService.get(urls.category)
        .then(value => value.data),

    getCategoryById: (id) => axiosService.get(`${urls.category}/${id}`)
        .then(value => value.data),

    createCategory: (data) => axiosService.post(urls.category, data)
        .then(value => value.data),

    updateCategory: (id, data) => axiosService.patch(`${urls.category}/${id}`, data)
        .then(value => value.data),

    deleteCategory: (id) => axiosService.delete(`${urls.category}/${id}`)
};

export {categoryService};