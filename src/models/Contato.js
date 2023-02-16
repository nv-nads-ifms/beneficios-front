import { validateEmail } from "../api/format";

const emptyContato = {
    id: '',
    descricao: '',
    status: 'ATIVO',
    activated: new Date(),
    deactivated: '',
    tipoContatoDto: null,
};

function isEmail(tipoContatoDto) {
    return tipoContatoDto.descricao.toLowerCase().indexOf("mail") !== -1;
}

function validarContato(contato) {
    let campos = [];
    if (contato.tipoContatoDto == null) {
        campos.push({ campo: "tipoContatoDto", erro: "O CONTATO não foi informado." });
    }
    if (contato.descricao === '') {
        campos.push({ campo: "descricao", erro: "A DESCRIÇÃO não foi informada." });
    } else if (contato.tipoContatoDto != null && 
        isEmail(contato.tipoContatoDto) &&
        !validateEmail(contato.descricao)) {
        campos.push({ campo: "descricao", erro: "O E-MAIL informado não é válido." });
    }
    return campos;
}

export { emptyContato, validarContato };