import { deleteData, getData, postData, putData } from "../api/api";

const PROGRAMA_DE_GOVERNO_API_BASE_URL = "/programas-de-governo";

class ProgramaDeGovernoService {
    
    getProgramasDeGoverno(params) {
        return getData(PROGRAMA_DE_GOVERNO_API_BASE_URL, params);
    }

    getListaProgramasDeGoverno() {
        return getData(PROGRAMA_DE_GOVERNO_API_BASE_URL+"/list");
    }
    
    getProgramaDeGovernoById(id) {
        return getData(PROGRAMA_DE_GOVERNO_API_BASE_URL+"/"+id);
    }
    
    saveProgramaDeGoverno(id, value) {
        const params = {"descricao": value}
        if (id > 0) {
            return putData(PROGRAMA_DE_GOVERNO_API_BASE_URL, id, params)
        }
        return postData(PROGRAMA_DE_GOVERNO_API_BASE_URL, params);
    }
    
    deleteProgramaDeGoverno(id) {
        return deleteData(PROGRAMA_DE_GOVERNO_API_BASE_URL+"/"+id);
    }
    
}

export default new ProgramaDeGovernoService();