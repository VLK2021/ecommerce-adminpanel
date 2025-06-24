import {axiosService} from "../axios.service.jsx";
import {urls} from "../../constants/index.js";


const inventoryService = {
    create: (data) => axiosService.post(urls.inventory, data)
        .then(value => value.data),

    getAllProductsOnWarehouseById: (id) => axiosService.get(`${urls.inventory}/warehouse/${id}`)
        .then(value => value.data),
};

export {
    inventoryService
}