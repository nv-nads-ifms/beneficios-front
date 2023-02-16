import { Status } from "../api/utils/constants";

const emptyAuxilio = {
    id: '',
    programaGoverno: null,
    dataRegistro: '',
    dataFim: '',
    valor: '',
    status: Status.ATIVO,
};

function validarAuxilio(auxilio) {
    let campos = [];
    if (auxilio.programaGoverno == null) {
        campos.push({ campo: "programaGoverno", erro: "O Benefício/Programa de Governo não foi informado." });
    }
    if (auxilio.dataRegistro === '') {
        campos.push({ campo: "dataRegistro", erro: "A DATA DE REGISTRO não foi informada." });
    }
    if (auxilio.valor === '') {
        campos.push({ campo: "valor", erro: "O VALOR do auxílio não foi informado." });
    } 
    return campos;
}

export { emptyAuxilio, validarAuxilio };