import { postData, uploadImage } from "../api/api";

const ARQUIVO_API_BASE_URL = "/arquivos";

class ArquivoService {

    uploadFile(param) {
        return uploadImage(ARQUIVO_API_BASE_URL+"/upload-file", param);
    }

    downloadFile(param) {
        return postData(ARQUIVO_API_BASE_URL+"/download-file", param);
    }
    
}

export default new ArquivoService();