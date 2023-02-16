import { deleteData, getData, postData, putData } from "../api/api";

const ESCOLARIDADE_API_BASE_URL = "/escolaridades";

class EscolaridadeService {
    
    getEscolaridades(params) {
        return getData(ESCOLARIDADE_API_BASE_URL, params);
    }

    getListaEscolaridades() {
        return getData(ESCOLARIDADE_API_BASE_URL+'/list');
    }
    
    getEscolaridadeById(id) {
        return getData(ESCOLARIDADE_API_BASE_URL+"/"+id);
    }
    
    saveEscolaridade(id, value) {
        const params = {"descricao": value}
        if (id > 0) {
            return putData(ESCOLARIDADE_API_BASE_URL, id, params);
        }
        return postData(ESCOLARIDADE_API_BASE_URL, params);
    }
    
    deleteEscolaridade(id) {
        return deleteData(ESCOLARIDADE_API_BASE_URL+"/"+id);
    }
    
}

export default new EscolaridadeService();