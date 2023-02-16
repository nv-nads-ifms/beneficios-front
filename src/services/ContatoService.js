import { deleteData, getData, postData, putData } from "../api/api";

const TIPO_DE_CONTATO_API_BASE_URL = "/contatos";

class ContatoService {
    
    getContato(params) {
        return getData(TIPO_DE_CONTATO_API_BASE_URL, params);
    }

    getListaContatos() {
        return getData(TIPO_DE_CONTATO_API_BASE_URL+'/list');
    }
    
    getContatoById(id) {
        return getData(TIPO_DE_CONTATO_API_BASE_URL+"/"+id);
    }
    
    saveContato(id, params) {
        if (id > 0) {
            return putData(TIPO_DE_CONTATO_API_BASE_URL, id, params);
        }
        return postData(TIPO_DE_CONTATO_API_BASE_URL, params);
    }
    
    deleteContato(id) {
        return deleteData(TIPO_DE_CONTATO_API_BASE_URL+"/"+id);
    }
    
}

export default new ContatoService();