import { deleteData, getData, postData, putData, 
    putImage, getImage } from "../api/api";

const USUARIO_API_BASE_URL = "/usuarios";

class UsuarioService {
        
    getUsuarios(params) {
        return getData(USUARIO_API_BASE_URL, params);
    }

    getListaUsuarios() {
        return getData(USUARIO_API_BASE_URL+'/list');
    }

    getUsuarioByEmail(email) {
        return getData(USUARIO_API_BASE_URL+'/email/'+email);
    }
    
    getUsuarioById(id) {
        return getData(USUARIO_API_BASE_URL+"/"+id);
    }
    
    saveUsuario(id, usuario) {
        const params = {
            nome: usuario.nome,
            email: usuario.email,
            status: usuario.status,
            enabled: usuario.enabled,
            perfis: usuario.perfis,
            funcionario: usuario.funcionario,
        }
        
        if (id > 0) {
            return putData(USUARIO_API_BASE_URL, id, params);
        }
        return postData(USUARIO_API_BASE_URL, params);
    }
    
    deleteUsuario(id) {
        return deleteData(USUARIO_API_BASE_URL+"/"+id);
    }

    resetPassword(email, senhas) {
        const params = {
            token: email,
            password: senhas.senha,
            passwordConfirm: senhas.confirmaSenha,
        }
        return postData(USUARIO_API_BASE_URL+"/reset-password", params);
    }

    uploadFoto(file, id) {
        const imageData = new FormData();
        imageData.append('file', file);
        imageData.append('userId', id);
        return putImage(USUARIO_API_BASE_URL+"/upload-foto", imageData);
    }

    downloadFoto(id) {
        return getImage(USUARIO_API_BASE_URL+"/load-photo/"+id);
    }
}

export default new UsuarioService();