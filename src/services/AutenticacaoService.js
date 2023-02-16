import {API_BASE_URL} from "../api/api";

const AUTENTICACAO_API_BASE_URL = API_BASE_URL + "/auth";

class AutenticacaoService {

    requestToken(params) {
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        myHeader.append('Accept', 'application/json');
        myHeader.append('Accept-Language', 'pt-BR');

        return fetch(AUTENTICACAO_API_BASE_URL, {
            headers: myHeader,
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    resetPassword(token, senhas) {
        const params = {
            token: token,
            password: senhas.senha,
            passwordConfirm: senhas.confirmaSenha,
        }
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        myHeader.append('Accept', 'application/json');
        myHeader.append('Accept-Language', 'pt-BR');

        return fetch(AUTENTICACAO_API_BASE_URL+"/reset-password", {
            headers: myHeader,
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    forgotPassword(email) {
        const params = {
            email: email,
        }
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        myHeader.append('Accept', 'application/json');
        myHeader.append('Accept-Language', 'pt-BR');

        return fetch(AUTENTICACAO_API_BASE_URL+"/forgot-password", {
            headers: myHeader,
            method: 'POST',
            body: JSON.stringify(params)
        });
    }
    
}

export default new AutenticacaoService();