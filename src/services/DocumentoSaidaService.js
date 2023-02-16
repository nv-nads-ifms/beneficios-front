
import { deleteData, getData, postData, putData } from "../api/api";

const DOCUMENTO_SAIDA_API_BASE_URL = "/documento-saida";

class DocumentoSaidaService {

    getDocumentoSaida(params) {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL, params);
    }

    getListaDocumentoSaidaes() {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL + '/list');
    }

    getDocumentoSaidaListarContagem() {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL+'/contagem');
    }

    getDocumentoSaidaById(id) {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL + "/" + id);
    }

    saveDocumentoSaida(params, id) {
        if (id > 0) {
            return putData(DOCUMENTO_SAIDA_API_BASE_URL, id, params);
        }
        return postData(DOCUMENTO_SAIDA_API_BASE_URL, params);
    }

    deleteDocumentoSaida(id) {
        return deleteData(DOCUMENTO_SAIDA_API_BASE_URL + "/" + id);
    }

    getListaDocumentoSaidaItens(params) {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL + '/itens', params);
    }

    getItemSaidaById(documentoSaidaId, numero) {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL + "/item/" + documentoSaidaId + "/" + numero);
    }

    getListaMovimentosDeSaida(documentoSaidaId, numero) {
        return getData(DOCUMENTO_SAIDA_API_BASE_URL + "/movimentos-de-saida/" + numero + "/" + documentoSaidaId);
    }

    saveMovimentoItemSaida(params) {
        return postData(DOCUMENTO_SAIDA_API_BASE_URL + "/movimento", params);
    }

}

export default new DocumentoSaidaService();