import { emptyCidade } from "../paginas/Cidade/CidadeForm";

const emptyBairro = {
    id: '',
    nome: '',
}

const emptyLogradouro = {
    id: '',
    nome: '',
}

const emptyEndereco = {
    cidade: emptyCidade,
    bairro: emptyBairro,
    logradouro: emptyLogradouro,
    logradouroNome: '',
    bairroNome: '',
    cidadeNome: '',
    ufSigla: '',
    numero: '',
    complemento: '',
    referencia: '',
}

const emptyCep = {
    logradouro: emptyLogradouro,
    bairro: emptyBairro,
    cidade: emptyCidade,
}

function convertToEnderecoObject(data) {
    emptyEndereco.logradouroNome = data.logradouroNome;
    emptyEndereco.bairroNome = data.bairroNome;
    emptyEndereco.cidadeNome = data.cidadeNome;
    emptyEndereco.ufSigla = data.ufSigla;
    emptyEndereco.numero = data.numero;
    emptyEndereco.complemento = data.complemento;
    emptyEndereco.referencia = data.referencia;
}

function enderecoToString(data) {
    if (data == null || data === emptyEndereco) {
        return '';
    }
    let text = data.logradouroNome !== '' ? data.logradouroNome : '';
    text += data.bairroNome !== '' ? ", " + data.bairroNome : '';
    text += data.cidadeNome !== '' ? ", " + data.cidadeNome : '';
    text += data.ufSigla !== '' ? "-" + data.ufSigla : '';
    return text;
}

function stringToEndereco(endereco, data) {
    return {
        ...endereco,
        cidade: {
            id: data.cidadeId,
            nome: data.cidadeNome,
            uf: {
                id: 12,
                nome: '',
                pais: {
                    id: '',
                    nome: ''
                }
            }
        },
        bairro: {
            id: data.bairroId, 
            nome: data.bairroNome,
        },
        logradouro: {
            id: data.id,
            nome: data.nome,
        },
        logradouroNome: data.nome,
        bairroNome: data.bairroNome,
        cidadeNome: data.cidadeNome,
        ufSigla: data.sigla,
    };
}

export { emptyEndereco, emptyCep, emptyLogradouro, emptyBairro,
    enderecoToString, stringToEndereco, convertToEnderecoObject };