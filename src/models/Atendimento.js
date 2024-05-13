import { Status } from "../api/utils/constants";
import { emptyPessoa } from "./Pessoa";
import { emptyProntuario } from "./Prontuario";

const emptyAtendimento = {
    id: '',
    atendente: null,
    prontuario: emptyProntuario,
    pessoa: emptyPessoa,
    emissao: new Date(),
    descricao: '',
    status: Status.ABERTO,
}

export { emptyAtendimento };