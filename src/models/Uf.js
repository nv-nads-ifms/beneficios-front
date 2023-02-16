
import UfService from "../services/UfService";

const emptyPais = {
    id: '',
    nome: '',
}


const emptyUf = {
    id: '',
    nome: '',
    pais: emptyPais,
}

function validarUf(item) {
    let campos = [];
    if (item.nome == null || item.nome === '') {
        campos.push({ campo: "nome", erro: "O NOME não foi selecionado." });
    }
    if (item.pais == null) {
        campos.push({ campo: "pais", erro: "O PAÍS não foi informado." });
    }

    return campos;
}

function loadUfData(id, callback) {
    if (id > 0) {
        UfService.getUfById(id)
            .then(r => r.json())
            .then(data => {
                callback(data);
            })
            .catch((e) => {
                console.log(e);
            });
    } else {
        callback(emptyUf);
    }
}

export { emptyUf, emptyPais, loadUfData, validarUf };