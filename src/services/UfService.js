import { getData, postData, putData } from "../api/api";

const UF_API_BASE_URL = "/ufs";

class UfService {
    
    getUfs(paisId) {
        const params = {
            paisId: paisId === "" ? 0 : paisId,
        };
        return getData(UF_API_BASE_URL, params);
    }

    getListaUfs() {
        return getData(UF_API_BASE_URL+'/list');
    }
    
    getUfById(id) {
        return getData(UF_API_BASE_URL+"/"+id);
    }
    
    saveUf(id, params) {
        if (id > 0) {
            return putData(UF_API_BASE_URL, id, params);
        }
        return postData(UF_API_BASE_URL, params);
    }
    
}

export default new UfService();