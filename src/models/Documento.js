import { TipoDocumento } from "../api/utils/constants";

const emptyDocumento = {
    numero: '',
    documentoDto: null,
    orgaoExpedidorDto: null,
    emissao: new Date(),
};
const invalidCPF = ["00000000000", "11111111111", "22222222222",
    "33333333333", "44444444444", "55555555555",
    "66666666666", "77777777777", "88888888888",
    "99999999999"
];
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length !== 11 || invalidCPF.indexOf(cpf) !== -1)
        return false;
    // Valida 1o digito	
    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i), 10) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9), 10))
        return false;
    // Valida 2o digito	
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i), 10) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10), 10))
        return false;
    return true;
}

const invalidCNPJ = ["00000000000000", "11111111111111", "22222222222222",
    "33333333333333", "44444444444444", "55555555555555",
    "66666666666666", "77777777777777", "88888888888888",
    "99999999999999"
];
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (invalidCNPJ.indexOf(cnpj) !== -1)
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(1))
        return false;

    return true;
}

function validarDocumento(documento) {
    let campos = [];
    if (documento.documentoDto == null) {
        campos.push({ campo: "documentoDto", erro: "O Documento não foi informado." });
    }
    if (documento.numero === '') {
        campos.push({ campo: "numero", erro: "O NÚMERO do documento não foi informado." });
    } else if (documento.documentoDto != null) {
        if (documento.documentoDto.id === TipoDocumento.CPF.id &&
            (documento.numero.length !== TipoDocumento.CPF.size || !validarCPF(documento.numero))) {
            campos.push({
                campo: "numero", erro: "O NÚMERO do documento informado é inválido para " +
                    documento.documentoDto.descricao + "."
            });
        } else if (documento.documentoDto.id === TipoDocumento.CNPJ.id &&
            (documento.numero.length !== TipoDocumento.CNPJ.size || !validarCNPJ(documento.numero))) {
            campos.push({
                campo: "numero", erro: "O NÚMERO do documento informado é inválido para " +
                    documento.documentoDto.descricao + "."
            });
        }
    }


    if (documento.documentoDto != null &&
        documento.documentoDto.exigeOrgaoExpedidor === true &&
        documento.orgaoExpedidorDto == null) {
        campos.push({ campo: "orgaoExpedidorDto", erro: "O campo ÓRGÃO EXPEDIDOR é exigido pelo tipo de documento informado." });
    }

    return campos;
}

export { emptyDocumento, validarDocumento };