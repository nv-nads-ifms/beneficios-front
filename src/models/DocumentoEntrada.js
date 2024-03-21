import { Status } from "../api/utils/constants";

const emptyDocumentoEntrada = {
    id: '',
    unidadeAtendimento: null,
    status: '',
    observacao: '',
    fornecedor: null,
    processo: '',
    ata: '',
    pregao: '',
    empenhoContabil: '',
    contrato: '',
    numeroNotaFiscal: '',
    doacao: false,
    itens: [],
};

const emptyItemDocumentoEntrada = {
    documentoEntradaId: '',
    numero: '',
    quantidade: '',
    quantidadeConferida: '',
    quantidadePendente: '',
    beneficioEventual: null,
    status: Status.PENDENTE,
    deleted: false,
    movimentos: [],
}

function validarItemDocumentoEntrada(item) {
    let campos = [];
    if (item.beneficioEventual == null) {
        campos.push({ campo: "beneficioEventual", erro: "O BENEFICIO EVENTUAL não foi selecionado." });
    }
    if (item.quantidade === '') {
        campos.push({ campo: "quantidade", erro: "A QUANTIDADE não foi informada." });
    } else if (item.quantidade <= 0) {
        campos.push({ campo: "quantidade", erro: "A QUANTIDADE deve possuir um valor inteiro positivo maior que ZERO." });
    }

    return campos;
}

export { emptyDocumentoEntrada, emptyItemDocumentoEntrada, validarItemDocumentoEntrada };