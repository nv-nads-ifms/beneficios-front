
import { deleteData, getData, postData, putData } from "../api/api";

const UNIDADE_ATENDIMENTO_API_BASE_URL = "/unidades-de-atendimento";

class UnidadeAtendimentoService {
    
    getUnidadeAtendimento(params) {
        return getData(UNIDADE_ATENDIMENTO_API_BASE_URL, params);
    }

    getListaUnidadeAtendimentos() {
        return getData(UNIDADE_ATENDIMENTO_API_BASE_URL+'/list');
    }
    
    getUnidadeAtendimentoById(id) {
        return getData(UNIDADE_ATENDIMENTO_API_BASE_URL+"/"+id);
    }
    
    saveUnidadeAtendimento(params, id) {
        if (id > 0) {
            return putData(UNIDADE_ATENDIMENTO_API_BASE_URL, id, params);
        }
        return postData(UNIDADE_ATENDIMENTO_API_BASE_URL, params);
    }
    
    deleteUnidadeAtendimento(id) {
        return deleteData(UNIDADE_ATENDIMENTO_API_BASE_URL+"/"+id);
    }
    
}

export default new UnidadeAtendimentoService();