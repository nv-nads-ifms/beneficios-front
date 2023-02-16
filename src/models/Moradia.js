import { emptyEndereco } from "./Endereco";

const emptyMoradia = {
    id: '',
    dataOcupacao: '',
    dataSaida: null,
    valor: '',
    condicaoMoradiaDto: null,
    tipoMoradiaDto: null,
    enderecoDto: emptyEndereco,
};

function validarMoradia(moradia) {
    let campos = [];
    if (moradia.dataOcupacao == null || moradia.dataOcupacao === '') {
        campos.push({ campo: "dataOcupacao", erro: "A DATA DE OCUPAÇÃO não foi informada." });
    }
    if (moradia.condicaoMoradiaDto == null) {
        campos.push({ campo: "condicaoMoradiaDto", erro: "A CONDIÇÃO DE MORADIA não foi informada." });
    }
    if (moradia.tipoMoradiaDto == null) {
        campos.push({ campo: "tipoMoradiaDto", erro: "A TIPO DE MORADIA não foi informada." });
    }
    const nullFields = ["complemento", "referencia"];
    for (var [key, value] of Object.entries(moradia.enderecoDto)) {
        if (value === '' && !nullFields.includes(key)) {
            campos.push({ campo: "enderecoDto", erro: "O ENDEREÇO não foi informado." });
            campos.push({ campo: key, erro: "Este campo deve ser informado." });
            
            break;
        }
    }
    if (moradia.valor === '') {
        campos.push({ campo: "valor", erro: "O VALOR relativo à moradia não foi informado." });
    } 
    return campos;
}

export { emptyMoradia, validarMoradia };