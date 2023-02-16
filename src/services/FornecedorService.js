
import { deleteData, getData, postData, putData } from "../api/api";

const FORNECEDOR_API_BASE_URL = "/fornecedores";

class FornecedorService {
    
    getFornecedor(params) {
        return getData(FORNECEDOR_API_BASE_URL, params);
    }

    getListaFornecedores() {
        return getData(FORNECEDOR_API_BASE_URL+'/list');
    }
    
    getFornecedorById(id) {
        return getData(FORNECEDOR_API_BASE_URL+"/"+id);
    }
    
    saveFornecedor(params, id) {
        if (id > 0) {
            return putData(FORNECEDOR_API_BASE_URL, id, params);
        }
        return postData(FORNECEDOR_API_BASE_URL, params);
    }
    
    deleteFornecedor(id) {
        return deleteData(FORNECEDOR_API_BASE_URL+"/"+id);
    }
    
}

export default new FornecedorService();