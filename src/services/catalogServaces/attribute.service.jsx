import {axiosService} from "../axios.service.jsx";
import {urls} from "../../constants/index.js";

const attributeService = {
    getAllAttributes: () => axiosService.get(urls.attributes.attribute)
        .then(value => value.data),

    createAttribute: (data) => axiosService.post(urls.attributes.attribute, data)
        .then(value => value.data),

    deleteAttribute: (id) => axiosService.delete(`${urls.attributes.attribute}/${id}`)

};

export {
    attributeService,
}