import { deleteData, getData, postData, putData } from "../api/api";

const PRONTUARIO_API_BASE_URL = "/prontuarios";

class ProntuarioService {
    
    getProntuarios(params) {
        return getData(PRONTUARIO_API_BASE_URL, params);
    }

    getProntuarioListarContagem(unidadeAtendimentoId) {
        const value = (!!unidadeAtendimentoId ? unidadeAtendimentoId : 0);
        return getData(PRONTUARIO_API_BASE_URL+'/contagem/'+value);
    }

    getListaProntuarios() {
        return getData(PRONTUARIO_API_BASE_URL+"/list");
    }
    
    getProntuarioById(id) {
        return getData(PRONTUARIO_API_BASE_URL+"/"+id);
    }
    
    saveProntuario(id, prontuario) {
        if (id > 0) {
            return putData(PRONTUARIO_API_BASE_URL, id, prontuario);
        }
        return postData(PRONTUARIO_API_BASE_URL, prontuario);
    }
    
    deleteProntuario(id) {
        return deleteData(PRONTUARIO_API_BASE_URL+"/"+id);
    }

    ativarProntuario(id, observacao, status) {
        const params = {
            prontuarioId: id,
            observacao: observacao
        }
        return putData(PRONTUARIO_API_BASE_URL+"/"+status, id, params);
    }
    
}

export default new ProntuarioService();