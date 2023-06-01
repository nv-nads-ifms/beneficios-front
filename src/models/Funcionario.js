import { Sexo } from "../api/utils/constants";

const emptyFuncionario = {
    id: '',
    nome: '',
    email: '',
    nascimento: '',
    sexo: Sexo.FEMININO,
    funcao: null,
    unidadeAtendimento: null,
    perfil: null
};

export { emptyFuncionario };