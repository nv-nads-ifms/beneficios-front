import { deleteData, getData, postData, putData } from "../api/api";

const FUNCAO_API_BASE_URL = "/funcoes";

class FuncaoService {
    
    getFuncoes(params) {
        return getData(FUNCAO_API_BASE_URL, params);
    }

    getListaFuncoes() {
        return getData(FUNCAO_API_BASE_URL+'/list');
    }
    
    getFuncaoById(id) {
        return getData(FUNCAO_API_BASE_URL+"/"+id);
    }
    
    saveFuncao(id, value) {
        const params = {"nome": value}
        if (id > 0) {
            return putData(FUNCAO_API_BASE_URL, id, params);
        }
        return postData(FUNCAO_API_BASE_URL, params);
    }
    
    deleteFuncao(id) {
        return deleteData(FUNCAO_API_BASE_URL+"/"+id);
    }
    
}

export default new FuncaoService();