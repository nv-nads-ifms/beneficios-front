import { deleteData, getData, postData, putData } from "../api/api";

const CONDICAO_DE_MORADIA_API_BASE_URL = "/condicoes-de-moradia";

class CondicaoDeMoradiaService {
    
    getCondicoesDeMoradia(params) {
        return getData(CONDICAO_DE_MORADIA_API_BASE_URL, params);
    }

    getListaCondicoesDeMoradia() {
        return getData(CONDICAO_DE_MORADIA_API_BASE_URL+'/list');
    }
    
    getCondicaoDeMoradiaById(id) {
        return getData(CONDICAO_DE_MORADIA_API_BASE_URL+"/"+id);
    }
    
    saveCondicaoDeMoradia(id, value) {
        const params = {"nome": value}
        if (id > 0) {
            return putData(CONDICAO_DE_MORADIA_API_BASE_URL, id, params);
        }
        return postData(CONDICAO_DE_MORADIA_API_BASE_URL, params);
    }
    
    deleteCondicaoDeMoradia(id) {
        return deleteData(CONDICAO_DE_MORADIA_API_BASE_URL+"/"+id);
    }
    
}

export default new CondicaoDeMoradiaService();