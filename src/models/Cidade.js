import CidadeService from "../services/CidadeService";
import { emptyUf } from "./Uf";

const emptyCidade = {
    id: '',
    nome: '',
    uf: emptyUf,
}

function cidadeToText(value) {
    return value.nome + "-" + value.uf.sigla + " ("+value.uf.pais.nome+")";
}

function validarCidade(item) {
    let campos = [];
    if (item.nome == null || item.nome === '') {
        campos.push({ campo: "nome", erro: "O NOME não foi selecionado." });
    }
    if (item.uf == null) {
        campos.push({ campo: "uf", erro: "A U.F. não foi informada." });
    }

    return campos;
}

function loadCidadeData(id, callback) {
    if (id > 0) {
        CidadeService.getCidadeById(id)
            .then(r => r.json())
            .then(data => {
                callback(data);
            })
            .catch((e) => {
                console.log(e);
            });
    } else {
        callback(emptyCidade);
    }
}

export { emptyCidade, cidadeToText, loadCidadeData, validarCidade };