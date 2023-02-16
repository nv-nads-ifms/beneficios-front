import { deleteData, getData, postImage, putImage } from "../api/api";
import { dataURLtoFile } from "../api/format";

const PESSOA_API_BASE_URL = "/pessoas";

class PessoaService {
        
    getPessoas(params) {
        return getData(PESSOA_API_BASE_URL, params);
    }

    getListaPessoas() {
        return getData(PESSOA_API_BASE_URL+'/list');
    }
    
    getPessoaById(id) {
        return getData(PESSOA_API_BASE_URL+"/"+id);
    }

    savePessoa(id, pessoa) {
        let foto = null;
        if (pessoa.foto instanceof File) {
            foto = URL.createObjectURL(pessoa.foto);
        } else {
            foto = dataURLtoFile(pessoa.foto, 'foto_pessoa.png');
        }
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", foto);
        formData.append('form', new Blob([JSON.stringify(pessoa)], {
            type: "application/json"
        }));
        
        if (id > 0) {
            return putImage(PESSOA_API_BASE_URL, formData);
            // return putData(PESSOA_API_BASE_URL, formData);
        }
        return postImage(PESSOA_API_BASE_URL, formData);
        // return postData(PESSOA_API_BASE_URL, pessoa);
    }
    
    deletePessoa(id) {
        return deleteData(PESSOA_API_BASE_URL+"/"+id);
    }
}

export default new PessoaService();