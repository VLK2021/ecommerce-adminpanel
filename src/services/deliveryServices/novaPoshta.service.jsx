import axios from 'axios';


const NOVA_POSHTA_API = import.meta.env.VITE_NOVA_POSHTA_API;
const API_KEY = import.meta.env.VITE_API_KEY;


const novaPoshtaService = {
    getCities: (search = '') =>
        axios.post(NOVA_POSHTA_API, {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
                FindByString: search,
                Limit: 1000
            }
        }).then(res => res.data.data),

    getWarehouses: (cityRef) =>
        axios.post(NOVA_POSHTA_API, {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
                CityRef: cityRef,
                Limit: 1000
            }
        }).then(res => res.data.data),
};

export { novaPoshtaService };
