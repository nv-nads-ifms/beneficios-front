import { deleteData, getData, postData, putData } from "../api/api";

const ORGAO_EXPEDIDOR_API_BASE_URL = "/orgaos-expedidores";

class OrgaoExpedidorService {
    
    getOrgaosExpedidores(params) {
        return getData(ORGAO_EXPEDIDOR_API_BASE_URL, params);
    }

    getListaOrgaosExpedidores() {
        return getData(ORGAO_EXPEDIDOR_API_BASE_URL+'/list');
    }
    
    getOrgaoExpedidorById(id) {
        return getData(ORGAO_EXPEDIDOR_API_BASE_URL+"/"+id);
    }
    
    saveOrgaoExpedidor(id, value) {
        const params = {"descricao": value}
        if (id > 0) {
            return putData(ORGAO_EXPEDIDOR_API_BASE_URL, id, params);
        }
        return postData(ORGAO_EXPEDIDOR_API_BASE_URL, params);
    }
    
    deleteOrgaoExpedidor(id) {
        return deleteData(ORGAO_EXPEDIDOR_API_BASE_URL+"/"+id);
    }
    
}

export default new OrgaoExpedidorService();