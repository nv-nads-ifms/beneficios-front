import { deleteData, getData, postData, putData } from "../api/api";

const BAIRRO_API_BASE_URL = "/bairros";

class BairroService {
    
    getBairros(params) {
        return getData(BAIRRO_API_BASE_URL, params);
    }

    getListaBairros() {
        return getData(BAIRRO_API_BASE_URL+'/list');
    }
    
    getBairroById(id) {
        return getData(BAIRRO_API_BASE_URL+"/"+id);
    }
    
    saveBairro(id, params) {
        if (id > 0) {
            return putData(BAIRRO_API_BASE_URL, id, params);
        }
        return postData(BAIRRO_API_BASE_URL, params);
    }
    
    deleteBairro(id) {
        return deleteData(BAIRRO_API_BASE_URL+"/"+id);
    }
    
}

export default new BairroService();