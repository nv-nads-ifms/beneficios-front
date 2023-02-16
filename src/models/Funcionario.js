import { Sexo } from "../api/utils/constants";

const emptyFuncionario = {
    id: '',
    nome: '',
    nascimento: '',
    sexo: Sexo.FEMININO,
    funcao: null,
    unidadeAtendimento: null,
};

export { emptyFuncionario };