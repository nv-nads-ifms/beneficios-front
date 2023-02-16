const Status = {
    ATIVO: "ATIVO",
    INATIVO: "INATIVO",
    PENDENTE: "PENDENTE",
    TODOS: "TODOS",
    ABERTO: "ABERTO",
    INICIADO: "INICIADO",
    EM_ANALISE: "EM_ANALISE",
    AUTORIZADO: "AUTORIZADO",
    NEGADO: "NEGADO",
    RETIRADO: "RETIRADO",
    CANCELADO: "CANCELADO",
    FINALIZADO: "FINALIZADO",
    PARCIAL: "PARCIAL",
    RECEBIDO: "RECEBIDO",
    ENVIADO: "ENVIADO",
};

const TipoContato = {
    PHONE: "PHONE",
    MAIL: "MAIL",
    TWITTER: "TWITTER", 
    FACEBOOK: "FACEBOOK", 
    CELLPHONE: "CELLPHONE", 
    WHATSAPP: "WHATSAPP",
};

const getTipoContatoFormat = (tipo) => {
    switch(tipo) {
        case TipoContato.PHONE: return "(99) 9999-9999";
        case TipoContato.CELLPHONE: return "(99) 9 9999-9999";
        default: return "*".repeat(255);
    }
}

const TipoDocumento = {
    CPF: {
        id: 2,
        size: 14,
        format: "999.999.999-99"
    },
    CNPJ: {
        id: 4,
        size: 18,
        format: "99.999.999/9999-99"
    }
}

const getDocumentFormat = (id) => {
    switch(id) {
        case TipoDocumento.CPF.id: return TipoDocumento.CPF.format;
        case TipoDocumento.CNPJ.id: return TipoDocumento.CNPJ.format;
        default: return "*".repeat(255);
    }
}

const Sexo = {
    FEMININO: "FEMININO",
    MASCULINO: "MASCULINO",
}

const ChipColor = {
    GREEN: "GREEN",
    YELLOW: "YELLOW",
    RED: "RED",
    ORANGE: "ORANGE",
};

const Message = {
    WARNING: "warning",
    ERROR: "error",
    SUCCESS: "success",
    INFORMATION: "information",
    QUESTION: "question",
    INPUT: "input",
}

const DEFAULT_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg";

const emptyData = {
    content: [],
    pageable: {
        pageSize: 5,
    },
    totalElements: 0,
    number: 0,
}

export { Status, TipoContato, getTipoContatoFormat, TipoDocumento, getDocumentFormat,
    ChipColor, Message, Sexo, DEFAULT_IMAGE_URL, emptyData };