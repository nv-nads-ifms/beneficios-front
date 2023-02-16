import { deleteData, getData, postData, putData } from "../api/api";

const CEP_API_BASE_URL = "/ceps";

class CepService {
    
    getCeps(params) {
        return getData(CEP_API_BASE_URL, params);
    }

    getListaCeps() {
        return getData(CEP_API_BASE_URL+'/list');
    }
    
    getCepById(id) {
        return getData(CEP_API_BASE_URL+"/"+id);
    }
    
    saveCep(params, id) {
        if (id > 0) {
            return putData(CEP_API_BASE_URL, id, params);
        }
        return postData(CEP_API_BASE_URL, params);
    }
    
    deleteCep(id) {
        return deleteData(CEP_API_BASE_URL+"/"+id);
    }
    
}

export default new CepService();