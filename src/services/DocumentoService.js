import { deleteData, getData, postData, putData } from "../api/api";

const DOCUMENTO_API_BASE_URL = "/documentos";

class DocumentoService {
    
    getDocumentos(params) {
        return getData(DOCUMENTO_API_BASE_URL, params);
    }

    getListaDocumentos() {
        return getData(DOCUMENTO_API_BASE_URL+'/list');
    }
    
    getDocumentoById(id) {
        return getData(DOCUMENTO_API_BASE_URL+"/"+id);
    }
    
    saveDocumento(id, value) {
        if (id > 0) {
            return putData(DOCUMENTO_API_BASE_URL, id, value);
        }
        return postData(DOCUMENTO_API_BASE_URL, value);
    }
    
    deleteDocumento(id) {
        return deleteData(DOCUMENTO_API_BASE_URL+"/"+id);
    }
    
}

export default new DocumentoService();