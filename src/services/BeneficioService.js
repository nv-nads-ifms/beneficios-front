import { deleteData, getData, postData, putData } from "../api/api";

const BENEFICIO_API_BASE_URL = "/beneficios-eventuais";

class BeneficioService {
    
    getBeneficios(params) {
        return getData(BENEFICIO_API_BASE_URL, params);
    }
    
    getBeneficiosById(id) {
        return getData(BENEFICIO_API_BASE_URL+"/"+id);
    }

    getListaBeneficios() {
        return getData(BENEFICIO_API_BASE_URL+'/list');
    }
    
    saveBeneficio(id, value) {
        if (id > 0) {
            return putData(BENEFICIO_API_BASE_URL, id, value);
        }
        return postData(BENEFICIO_API_BASE_URL, value);
    }
    
    deleteBeneficio(id) {
        return deleteData(BENEFICIO_API_BASE_URL+"/"+id);
    }
    
}

export default new BeneficioService();