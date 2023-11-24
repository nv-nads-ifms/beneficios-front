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
    switch (tipo) {
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
    switch (id) {
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

export {
    Status, TipoContato, getTipoContatoFormat, TipoDocumento, getDocumentFormat,
    ChipColor, Message, Sexo, DEFAULT_IMAGE_URL, emptyData
};

const emptyBaseObject = {
    id: '',
    nome: '',
}

const DNATipoDocumento = {
    CPF: 'CPF',
    CNPJ: 'CNPJ',
    OAB: 'OAB',
    OUTROS: 'OUTRO',
}
const DNATipoContato = {
    EMAIL: 'EMAIL',
    TELEFONE: 'TELEFONE',
    CELULAR: 'CELULAR',
}

const DNAStatus = {
    VIEW: 'view',
    EDIT: 'edit',
    NONE: ''
}

const DNASexo = {
    MASCULINO: 'MASCULINO',
    FEMININO: 'FEMININO',
    OUTRO: 'OUTRO'
}

const TipoNotificacao = {
    EMAIL: 'EMAIL',
    SMS: 'SMS',
}

const TipoAvaliacao = {
    INTERNA: "INTERNA",
    EXTERNA: "EXTERNA",
}

const StatusType = {
    ATIVO: 'ATIVO',
    INATIVO: 'INATIVO',
    PENDENTE: 'PENDENTE',
    RETIRADO: 'RETIRADO',
    CANCELADO: 'CANCELADO',
    RECEBIDO: 'RECEBIDO',
    FINALIZADO: 'FINALIZADO',
    PARCIAL: 'PARCIAL',
    ENVIADO: 'ENVIADO',
    BLOQUEADO: 'BLOQUEADO'
}

const StatusEvento = {
    ABERTO: 'ABERTO',
    INICIADO: 'INICIADO',
    ENCERRADO: 'ENCERRADO'
}

const StatusConvite = {
    ACEITO: 'ACEITO',
    NEGADO: 'NEGADO',
    PENDENTE: 'PENDENTE',
    ENVIADO: 'ENVIADO',
    NAO_ENVIADO: 'NAO_ENVIADO',
}

const StatusProjeto = {
    ABERTO: 'ABERTO',
    ENVIADO: 'ENVIADO',
    EM_AVALIACAO: 'EM_AVALIACAO',
    APROVADO: 'APROVADO',
    RESSALVA: 'RESSALVA',
    NAO_APROVADO: 'NAO_APROVADO'
}

const TipoMembro = {
    ESTUDANTE: 'ESTUDANTE',
    ORIENTADOR: 'ORIENTADOR',
    COORIENTADOR: 'COORIENTADOR'
}

const TipoEscalaAvaliacao = {
    NOMINAL: 'NOMINAL',
    ORDINAL: 'ORDINAL',
    BINARIA: 'BINARIA',
}

const Eixo = {
    CIENTIFICO: 'CIENTIFICO',
    TECNOLOGICO: 'TECNOLOGICO',
    AMBOS: 'AMBOS',
}

const StatusAvaliacao = {
    EM_AVALIACAO: 'EM_AVALIACAO',
    NAO_AVALIADO: 'NAO_AVALIADO',
    AVALIADO: 'AVALIADO'
}

const emptyArquivo = {
    ...emptyBaseObject,
    tipo: '',
    data: '',
}

const emptyUf = {
    ...emptyBaseObject,
    sigla: '',
    pais: emptyBaseObject,
};

const emptyCidade = {
    ...emptyBaseObject,
    uf: emptyUf,
};

const emptyLogradouro = {
    ...emptyBaseObject,
    tipoLogradouro: emptyBaseObject,
}

const emptyCep = {
    codigoPostal: '',
    unico: false,
    cidade: emptyCidade,
    bairro: emptyBaseObject,
    logradouro: emptyLogradouro,
};

const emptyEndereco = {
    referencia: "",
    complemento: "",
    numero: "",
    cep: emptyCep,
};

const emptyAdvogado = {
    ...emptyBaseObject,
    nomeSocial: '',
    sexo: DNASexo.MASCULINO,
    cargo: emptyBaseObject,
    foto: emptyArquivo,
    endereco: emptyEndereco,

    contatos: [],
    documentos: [],
    redesSociais: [],
    areasAtuacao: [],
    premiacoes: [],
};

const emptyUsuario = {
    ...emptyBaseObject,
    email: '',
    status: StatusType.BLOQUEADO,
    foto: emptyArquivo,
    instituicao: emptyBaseObject,
    sedes: [],
}

const emptyTipoCapacitacao = {
    ...emptyBaseObject,
    cargaHoraria: "",
};

const emptyTipoDocumento = {
    ...emptyBaseObject,
    imagem: emptyArquivo,
    tipo: '',
    mascara: '',
};

const emptyTipoRedeSocial = {
    ...emptyBaseObject,
    logo: emptyArquivo,
};

const emptyTipoContato = {
    ...emptyBaseObject,
    tipo: DNATipoContato.TELEFONE,
    mascara: '',
};

const emptyContato = {
    descricao: '',
    tipoContato: emptyTipoContato,
    deleted: false,
};

const emptyRedeSocial = {
    endereco: '',
    tipoRedeSocial: emptyTipoRedeSocial,
    deleted: false,
};

const emptyDocumento = {
    numero: '',
    tipoDocumento: emptyTipoDocumento,
    deleted: false,
}

const Perfil = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_GERENTE: 'ROLE_GERENTE',
    ROLE_COORDENADOR: 'ROLE_COORDENADOR',
    ROLE_USUARIO: 'ROLE_USUARIO',
    ROLE_AVALIADOR: 'ROLE_AVALIADOR',
    ROLE_ORIENTADOR: 'ROLE_ORIENTADOR'
}

export {
    DNAStatus, DNASexo, DNATipoDocumento, DNATipoContato, StatusType, StatusEvento, Perfil,
    TipoMembro, StatusProjeto, TipoNotificacao, TipoAvaliacao, StatusConvite, TipoEscalaAvaliacao,
    Eixo, StatusAvaliacao,
    emptyBaseObject, emptyArquivo,
    emptyUf, emptyCidade, emptyCep, emptyEndereco,
    emptyAdvogado, emptyLogradouro, emptyTipoCapacitacao, emptyTipoDocumento, emptyTipoRedeSocial,
    emptyTipoContato, emptyContato, emptyDocumento, emptyRedeSocial, emptyUsuario
};
