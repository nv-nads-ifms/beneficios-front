import { deleteData, getData, postData, putData } from "../api/api";

const FUNCIONARIO_API_BASE_URL = "/funcionarios";

class FuncionarioService {
    
    getFuncionarios(params) {
        return getData(FUNCIONARIO_API_BASE_URL, params);
    }

    getListaFuncionarios() {
        return getData(FUNCIONARIO_API_BASE_URL+'/list');
    }
    
    getFuncionarioById(id) {
        return getData(FUNCIONARIO_API_BASE_URL+"/"+id);
    }
    
    saveFuncionario(id, funcionario) {
        if (id > 0) {
            return this.updateFuncionario(funcionario, id);
        }
        return this.createFuncionario(funcionario);
    }
    
    createFuncionario(params) {
        return postData(FUNCIONARIO_API_BASE_URL, params);
    }
    
    updateFuncionario(params, id) {
        return putData(FUNCIONARIO_API_BASE_URL, id, params);
    }
    
    deleteFuncionario(id) {
        return deleteData(FUNCIONARIO_API_BASE_URL+"/"+id);
    }
    
}

export default new FuncionarioService();