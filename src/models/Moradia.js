import { emptyEndereco } from "./Endereco";

const emptyMoradia = {
    id: '',
    dataOcupacao: '',
    dataSaida: null,
    valor: '',
    condicaoMoradia: null,
    tipoMoradia: null,
    endereco: emptyEndereco,
};

function validarMoradia(moradia) {
    let campos = [];
    if (moradia.dataOcupacao == null || moradia.dataOcupacao === '') {
        campos.push({ campo: "dataOcupacao", erro: "A DATA DE OCUPAÇÃO não foi informada." });
    }
    if (moradia.condicaoMoradia == null) {
        campos.push({ campo: "condicaoMoradiaDto", erro: "A CONDIÇÃO DE MORADIA não foi informada." });
    }
    if (moradia.tipoMoradia == null) {
        campos.push({ campo: "tipoMoradiaDto", erro: "A TIPO DE MORADIA não foi informada." });
    }
    const nullFields = ["complemento", "referencia"];
    for (var [key, value] of Object.entries(moradia.endereco)) {
        if (value === '' && !nullFields.includes(key)) {
            campos.push({ campo: "endereco", erro: "O ENDEREÇO não foi informado." });
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