import { deleteData, getData, postData, putData } from "../api/api";

const CIDADE_API_BASE_URL = "/cidades";

class CidadeService {
    
    getCidades(params) {
        return getData(CIDADE_API_BASE_URL, params);
    }

    getListaCidades() {
        return getData(CIDADE_API_BASE_URL+'/list');
    }
    
    getCidadeById(id) {
        return getData(CIDADE_API_BASE_URL+"/"+id);
    }
    
    saveCidade(params, id) {
        if (id > 0) {
            return putData(CIDADE_API_BASE_URL, id, params);
        }
        return postData(CIDADE_API_BASE_URL, params);
    }
    
    deleteCidade(id) {
        return deleteData(CIDADE_API_BASE_URL+"/"+id);
    }
    
}

export default new CidadeService();