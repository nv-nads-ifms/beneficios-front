import { deleteData, getData, postData, putData } from "../api/api";

const TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL = "/tipos-de-unidades-atendimento";

class TipoUnidadeDeAtendimentoService {
    
    getTiposUnidadesDeAtendimento(params) {
        return getData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL, params);
    }

    getListaTiposUnidadesDeAtendimento() {
        return getData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL+'/list');
    }
    
    getTipoUnidadeDeAtendimentoById(id) {
        return getData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL+"/"+id);
    }
    
    saveTipoUnidadeDeAtendimento(id, value) {
        const params = {"nome": value}
        if (id > 0) {
            return putData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL, id, params);
        }
        return postData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL, params);
    }
    
    createTipoUnidadeDeAtendimento(params) {
        
    }
    
    updateTipoUnidadeDeAtendimento(params, id) {
        
    }
    
    deleteTipoUnidadeDeAtendimento(id) {
        return deleteData(TIPO_UNIDADE_DE_ATENDIMENTO_API_BASE_URL+"/"+id);
    }
    
}

export default new TipoUnidadeDeAtendimentoService();