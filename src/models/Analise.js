import { Status } from "../api/utils/constants";
import AnaliseService from "../services/AnaliseService";
import { emptyArquivo } from "./Arquivo";
import { emptyPessoa } from "./Pessoa";

const emptyAnalise = {
    id: '',
    atendimentoId: '',
    tecnico: null,
    arquivo: emptyArquivo,
    emissao: new Date(),
    parecer: '',
    autorizacao: Status.NEGADO,
    encaminhamento: false,
    itens: [],
}

const emptyItemAnalise = {
    id: '',
    analiseId: '',
    pessoa: emptyPessoa,
    status: Status.PENDENTE,
    beneficioEventual: null,
    quantidade: '',
}

function validarItemAnalise(item, itens, unidadeAtendimento) {
    let campos = [];
    if (item.beneficioEventual == null) {
        campos.push({ campo: "beneficioEventual", erro: "O BENEFICIO EVENTUAL não foi selecionado." });
    }
    if (item.quantidade === '') {
        campos.push({ campo: "quantidade", erro: "A QUANTIDADE não foi informada." });
    } else if (item.quantidade <= 0) {
        campos.push({ campo: "quantidade", erro: "A QUANTIDADE deve possuir um valor inteiro positivo maior que ZERO." });
    } else if (item.beneficioEventual.estoque.length > 0 &&
        item.beneficioEventual.estoque[0].quantidade < item.quantidade) {
        campos.push({ campo: "quantidade", erro: "A QUANTIDADE informada está indisponível." });
    } else if (itens.length > 0) {
        let sumItens = itens.map(obj => {
            if (obj.beneficioEventual.id === item.beneficioEventual.id &&
                !obj.deleted) {
                return obj.quantidade;
            }
            return 0;
        }).reduce((ac, cv) => {
            return ac + cv.quantidade;
        });
        sumItens = parseFloat(sumItens) + parseFloat(item.quantidade);
        
        const estoque = item.beneficioEventual.estoque.find(obj => obj.unidadeAtendimento.id === unidadeAtendimento.id);
        if (estoque.quantidade < sumItens) {
            campos.push({
                campo: "quantidade", erro: "A QUANTIDADE informada para este item ultrapassa o saldo do benefício eventual " +
                    item.beneficioEventual.descricao + " em " + (sumItens - estoque.quantidade) + " unidades."
            });
        }
    }

    return campos;
}

function loadAnaliseData(id, callback) {
    if (id > 0) {
        AnaliseService.getAnaliseById(id)
            .then(r => r.json())
            .then(data => {
                callback(data);
            })
            .catch((e) => {
                console.log(e);
            });
    } else {
        callback(emptyAnalise);
    }
}

function initAnalise(id, callback, history) {
    if (id > 0) {
        AnaliseService.getAnaliseById(id)
            .then(r => r.json())
            .then(data => {
                callback(data);
            })
            .catch(() => {
                history.push('/404');
            });
    } else {
        callback(emptyAnalise);
    }
}

export { emptyAnalise, emptyItemAnalise, 
    loadAnaliseData, validarItemAnalise, initAnalise };