import { deleteData, getData, postData, putData } from "../api/api";

const PERFIL_API_BASE_URL = "/perfis";

class PerfilService {
    
    getPerfis(params) {
        return getData(PERFIL_API_BASE_URL, params);
    }

    getListaPerfis() {
        return getData(PERFIL_API_BASE_URL+"/list");
    }
    
    getPerfilById(id) {
        return getData(PERFIL_API_BASE_URL+"/"+id);
    }
    
    savePerfil(id, perfil) {
        const params = {
            "nome": perfil.nome,
            "status": perfil.status,
            "menus": perfil.menus
        }
        if (id > 0) {
            return putData(PERFIL_API_BASE_URL, id, params);
        }
        return postData(PERFIL_API_BASE_URL, params);
    }
    
    deletePerfil(id) {
        return deleteData(PERFIL_API_BASE_URL+"/"+id);
    }
    
}

export default new PerfilService();