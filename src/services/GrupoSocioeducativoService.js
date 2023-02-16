import { deleteData, getData, postData, putData } from "../api/api";

const GRUPO_SOCIOEDUCATIVO_API_BASE_URL = "/grupo-socioeducativo";

class GrupoSocioeducativoService {
    
    getGruposSocioeducativos(params) {
        return getData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL, params);
    }

    getListaGruposSocioeducativos() {
        return getData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL+'/list');
    }
    
    getGrupoSocioeducativoById(id) {
        return getData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL+"/"+id);
    }
    
    saveGrupoSocioeducativo(id, value) {
        const params = {"nome": value}
        if (id > 0) {
            return putData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL, id, params);
        }
        return postData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL, params);
    }
    
    deleteGrupoSocioeducativo(id) {
        return deleteData(GRUPO_SOCIOEDUCATIVO_API_BASE_URL+"/"+id);
    }
    
}

export default new GrupoSocioeducativoService();