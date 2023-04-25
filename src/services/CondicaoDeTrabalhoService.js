import { deleteData, getData, postData, putData } from "../api/api";

const CONDICAO_DE_TRABALHO_API_BASE_URL = "/condicoes-de-trabalho";

class CondicaoDeTrabalhoService {
    
    getCondicoesDeTrabalho(params) {
        return getData(CONDICAO_DE_TRABALHO_API_BASE_URL, params);
    }

    getListaCondicoesDeTrabalho() {
        return getData(CONDICAO_DE_TRABALHO_API_BASE_URL+'/list');
    }
    
    getCondicaoDeTrabalhoById(id) {
        return getData(CONDICAO_DE_TRABALHO_API_BASE_URL+"/"+id);
    }
    
    saveCondicaoDeTrabalho(id, value) {
        const params = {"nome": value}
        if (id > 0) {
            return putData(CONDICAO_DE_TRABALHO_API_BASE_URL, id, params);
        }
        return postData(CONDICAO_DE_TRABALHO_API_BASE_URL, params);
    }
    
    deleteCondicaoDeTrabalho(id) {
        return deleteData(CONDICAO_DE_TRABALHO_API_BASE_URL+"/"+id);
    }
    
}

export default new CondicaoDeTrabalhoService();