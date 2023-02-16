import { deleteData, getData, postData, putData } from "../api/api";

const PARENTESCO_API_BASE_URL = "/parentescos";

class ParentescoService {
    
    getParentescos(params) {
        return getData(PARENTESCO_API_BASE_URL, params);
    }

    getListaParentescos() {
        return getData(PARENTESCO_API_BASE_URL+'/list');
    }
    
    getParentescoById(id) {
        return getData(PARENTESCO_API_BASE_URL+"/"+id);
    }
    
    saveParentesco(id, value) {
        const params = {"descricao": value}
        if (id > 0) {
            return putData(PARENTESCO_API_BASE_URL, id, params);
        }
        return postData(PARENTESCO_API_BASE_URL, params);
    }
    
    deleteParentesco(id) {
        return deleteData(PARENTESCO_API_BASE_URL+"/"+id);
    }
    
}

export default new ParentescoService();