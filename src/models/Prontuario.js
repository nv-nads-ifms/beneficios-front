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

function createRendimentoObject(nome, parentesco, rendimento) {
    return {
        parentesco: parentesco,
        nome: nome,
        condicaoTrabalho: rendimento.condicaoTrabalhoDto.descricao,
        status: (rendimento.demissao == null || rendimento.demissao === '') ? Status.ATIVO : Status.INATIVO,
        valor: rendimento.valor,
    };
}

function createListaRendimentos(prontuario) {
    let lista = prontuario.titular.rendimentos.map(obj => {
        return createRendimentoObject(prontuario.titular.nome, "Titular", obj);
    });
    prontuario.dependentes.map((dependente) => {
        dependente.pessoa.rendimentos.map(obj => {
            lista.push(createRendimentoObject(
                dependente.pessoa.nome,
                dependente.parentesco.descricao, obj
            ));
            return obj;
        });
        return dependente;
    });
    return lista.filter((obj) => obj.status === Status.ATIVO);
}

function createAuxilioObject(nome, parentesco, auxilio) {
    return {
        parentesco: parentesco,
        nome: nome,
        programaGoverno: auxilio.programaGoverno.descricao,
        status: auxilio.status,
        valor: auxilio.valor,
    };
}

function createListaAuxilios(prontuario) {
    let lista = prontuario.titular.auxilios.map(obj => {
        return createAuxilioObject(prontuario.titular.nome, "Titular", obj);
    });

    prontuario.dependentes.map((dependente) => {
        dependente.pessoa.auxilios.map(obj => {
            lista.push(createAuxilioObject(
                dependente.pessoa.nome,
                dependente.parentesco.descricao, obj
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