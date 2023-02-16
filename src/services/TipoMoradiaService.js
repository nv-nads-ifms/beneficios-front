import { deleteData, getData, postData, putData } from "../api/api";

const TIPO_MORADIA_API_BASE_URL = "/tipos-de-moradia";

class TipoMoradiaService {
    
    getTipoMoradias(params) {
        return getData(TIPO_MORADIA_API_BASE_URL, params);
    }

    getListaTipoMoradias() {
        return getData(TIPO_MORADIA_API_BASE_URL+'/list');
    }
    
    getTipoMoradiaById(id) {
        return getData(TIPO_MORADIA_API_BASE_URL+"/"+id);
    }
    
    saveTipoMoradia(id, value) {
        if (id > 0) {
            return putData(TIPO_MORADIA_API_BASE_URL, id, value);
        }
        return postData(TIPO_MORADIA_API_BASE_URL, value);
    }
    
    deleteTipoMoradia(id) {
        return deleteData(TIPO_MORADIA_API_BASE_URL+"/"+id);
    }
    
}

export default new TipoMoradiaService();