import { getData, postData, putData } from "../api/api";

const PAIS_API_BASE_URL = "/pais";

class PaisService {
    
    getPaises(params) {
        return getData(PAIS_API_BASE_URL, params);
    }

    getListaPaises() {
        return getData(PAIS_API_BASE_URL+'/list');
    }
    
    getPaisById(id) {
        return getData(PAIS_API_BASE_URL+"/"+id);
    }
    
    savePais(id, params) {
        if (id > 0) {
            return putData(PAIS_API_BASE_URL, id, params);
        }
        return postData(PAIS_API_BASE_URL, params);
    }
    
}

export default new PaisService();