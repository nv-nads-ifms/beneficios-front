
import { deleteData, getData, postData, putData } from "../api/api";

const DOCUMENTO_ENTRADA_API_BASE_URL = "/documento-entrada";

class DocumentoEntradaService {

    getDocumentoEntrada(params) {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL, params);
    }

    getDocumentoEntradaListarContagem() {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL+'/contagem');
    }

    getListaDocumentoEntradaes() {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL + '/list');
    }

    getDocumentoEntradaById(id) {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL + "/" + id);
    }

    saveDocumentoEntrada(params, id) {
        if (id > 0) {
            return putData(DOCUMENTO_ENTRADA_API_BASE_URL, id, params);
        }
        return postData(DOCUMENTO_ENTRADA_API_BASE_URL, params);
    }

    deleteDocumentoEntrada(id) {
        return deleteData(DOCUMENTO_ENTRADA_API_BASE_URL + "/" + id);
    }

    getListaDocumentoEntradaItens(params) {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL + '/itens', params);
    }

    getItemEntradaById(documentoEntradaId, numero) {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL + "/item/" + documentoEntradaId + "/" + numero);
    }

    getListaMovimentosDeEntrada(documentoEntradaId, numero) {
        return getData(DOCUMENTO_ENTRADA_API_BASE_URL + "/movimentos-de-entrada/" + numero + "/" + documentoEntradaId);
    }

    saveMovimentoItemEntrada(params) {
        return postData(DOCUMENTO_ENTRADA_API_BASE_URL + "/movimento", params);
    }

}

export default new DocumentoEntradaService();