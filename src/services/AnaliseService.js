import { deleteData, getData, postImage } from "../api/api";

const ANALISE_API_BASE_URL = "/analises";

class AnaliseService {

    getAnalises(params) {
        return getData(ANALISE_API_BASE_URL, params);
    }

    getListaAnalises() {
        return getData(ANALISE_API_BASE_URL + '/list');
    }

    getAnaliseById(id) {
        return getData(ANALISE_API_BASE_URL + "/" + id);
    }

    saveAnalise(analise, atendimento) {
        const params = {
            ...analise,
            atendimento: atendimento,
        }

        const formData = new FormData();
        if (analise.arquivo !== undefined && analise.arquivo.file != null) {
            const arquivo = URL.createObjectURL(analise.arquivo.file);
            formData.append("file", arquivo);
        }
        formData.append('form', new Blob([JSON.stringify(params)], {
            type: "application/json"
        }));
        return postImage(ANALISE_API_BASE_URL, formData);
    }

    deleteAnalise(id) {
        return deleteData(ANALISE_API_BASE_URL + "/" + id);
    }
}

export default new AnaliseService();