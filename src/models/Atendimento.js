import { Status } from "../api/utils/constants";
import AtendimentoService from "../services/AtendimentoService";
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

function initAtendimento(id, callback, error) {
    if (id > 0) {
        AtendimentoService.getAtendimentoById(id)
            .then(r => {
                callback(r.data);
            })
            .catch((e) => {
                error(e);
            });
    } else {
        callback(emptyAtendimento);
    }
}

export { emptyAtendimento, initAtendimento };