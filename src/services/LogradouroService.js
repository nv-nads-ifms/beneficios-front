import { getData, postData, putData } from "../api/api";

const LOGRADOURO_API_BASE_URL = "/logradouros";

class LogradouroService {
    
    getLogradouros(params) {
        return getData(LOGRADOURO_API_BASE_URL, params);
    }

    getListaLogradouros() {
        return getData(LOGRADOURO_API_BASE_URL+'/list');
    }
    
    getLogradouroById(id) {
        return getData(LOGRADOURO_API_BASE_URL+"/"+id);
    }
    
    saveLogradouro(id, params) {
        if (id > 0) {
            return putData(LOGRADOURO_API_BASE_URL, id, params);
        }
        return postData(LOGRADOURO_API_BASE_URL, params);
    }
    
}

export default new LogradouroService();