import { deleteData, getData, postData, putData } from "../api/api";

const ATENDIMENTO_API_BASE_URL = "/atendimentos";

class AtendimentoService {
        
    getAtendimentos(params) {
        return getData(ATENDIMENTO_API_BASE_URL, params);
    }

    getAtendimentoListarContagem(unidadeAtendimentoId) {
        return getData(ATENDIMENTO_API_BASE_URL+'/contagem/'+unidadeAtendimentoId);
    }
        
    getHistoricoAtendimentos(params) {
        return getData(ATENDIMENTO_API_BASE_URL+'/historico', params);
    }

    getListaAtendimentos() {
        return getData(ATENDIMENTO_API_BASE_URL+'/list');
    }
    
    getAtendimentoById(id) {
        return getData(ATENDIMENTO_API_BASE_URL+"/"+id);
    }
    
    getAtendimentoByAnaliseId(id) {
        return getData(ATENDIMENTO_API_BASE_URL+"/analise/"+id);
    }
    
    saveAtendimento(id, atendimento) {
        if (id > 0) {
            return putData(ATENDIMENTO_API_BASE_URL, id, atendimento);
        }
        return postData(ATENDIMENTO_API_BASE_URL, atendimento);
    }
    
    deleteAtendimento(id) {
        return deleteData(ATENDIMENTO_API_BASE_URL+"/"+id);
    }

    iniciarAtendimento(id) {
        return putData(ATENDIMENTO_API_BASE_URL+"/iniciar", id, null);
    }

    importarAtendimento(id) {
        return putData(ATENDIMENTO_API_BASE_URL+"/importar", id, null);
    }

    analisarAtendimento(id) {
        return putData(ATENDIMENTO_API_BASE_URL+"/analisar", id, null);
    }
}

export default new AtendimentoService();