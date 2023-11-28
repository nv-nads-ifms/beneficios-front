import { validateEmail } from "../api/format";

const emptyContato = {
    id: '',
    descricao: '',
    status: 'ATIVO',
    activated: new Date(),
    deactivated: '',
    tipoContato: null,
};

function isEmail(tipoContato) {
    return tipoContato.nome.toLowerCase().indexOf("mail") !== -1;
}

function validarContato(contato) {
    let campos = [];
    if (contato.tipoContato == null) {
        campos.push({ campo: "tipoContato", erro: "O CONTATO não foi informado." });
    }
    if (contato.descricao === '') {
        campos.push({ campo: "descricao", erro: "A DESCRIÇÃO não foi informada." });
    } else if (contato.tipoContato != null && 
        isEmail(contato.tipoContato) &&
        !validateEmail(contato.descricao)) {
        campos.push({ campo: "descricao", erro: "O E-MAIL informado não é válido." });
    }
    return campos;
}

export { emptyContato, validarContato };