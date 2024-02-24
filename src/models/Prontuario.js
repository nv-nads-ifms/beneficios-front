import { Status } from "../api/utils/constants";
import ProntuarioService from "../services/ProntuarioService";
import { emptyPessoa } from "./Pessoa";
import { emptyUnidadeAtendimento } from "./UnidadeAtendimento";

const emptyProntuario = {
    id: '',
    descricaoSaude: '',
    acompanhamento: false,
    emissao: new Date(),
    status: Status.PENDENTE,
    unidadeAtendimento: emptyUnidadeAtendimento,
    grupoSocioeducativo: null,
    titular: emptyPessoa,
    dependentes: [],
    auxilios: [],
    historicos: [],
};

function createRendimentoObject(id, nome, parentesco, rendimento) {
    return {
        id: id,
        parentesco: parentesco,
        nome: nome,
        condicaoTrabalho: rendimento.condicaoTrabalho.nome,
        status: (rendimento.demissao == null || rendimento.demissao === '') ? Status.ATIVO : Status.INATIVO,
        valor: rendimento.valor,
    };
}

function createListaRendimentos(prontuario) {
    let lista = prontuario.titular.rendimentos.map(obj => {
        const rowId = `${prontuario.titular.id}-${obj.sequencia}`;
        return createRendimentoObject(rowId, prontuario.titular.nome, "Titular", obj);
    });

    prontuario.dependentes.map((dependente) => {
        dependente.pessoa.rendimentos.map(obj => {
            const rowId = `${dependente.pessoa.id}-${obj.sequencia}`;

            lista.push(createRendimentoObject(
                rowId,
                dependente.pessoa.nome,
                dependente.parentesco.nome, obj
            ));
            return obj;
        });
        return dependente;
    });
    return lista.filter((obj) => obj.status === Status.ATIVO);
}

function createAuxilioObject(id, nome, parentesco, auxilio) {
    return {
        id: id,
        parentesco: parentesco,
        nome: nome,
        programaGoverno: auxilio.programaGoverno.nome,
        status: auxilio.status,
        valor: auxilio.valor,
    };
}

function createListaAuxilios(prontuario) {
    let lista = prontuario.titular.auxilios.map(obj => {
        const rowId = `${prontuario.titular.id}-${obj.id}`;
        return createAuxilioObject(rowId, prontuario.titular.nome, "Titular", obj);
    });

    prontuario.dependentes.map((dependente) => {
        dependente.pessoa.auxilios.map(obj => {
            const rowId = `${dependente.pessoa.id}-${obj.id}`;
            lista.push(createAuxilioObject(
                rowId,
                dependente.pessoa.nome,
                dependente.parentesco.nome, obj
            ));
            return obj;
        });
        return dependente;
    });
    return lista.filter((obj) => obj.status === Status.ATIVO);
}

function initProntuario(id, usuario, callback, history) {
    if (id > 0) {
        ProntuarioService.getProntuarioById(id)
            .then(r => {
                callback(r.data);
            })
            .catch(() => {
                history.push('/404');
            });
    } else {
        callback({
            ...emptyProntuario,
            id: id,
            unidadeAtendimento: usuario.funcionario.unidadeAtendimento,
        })
    }
}

export { emptyProntuario, initProntuario, createListaRendimentos, createListaAuxilios };