import { Status } from "../api/utils/constants";

const emptyDocumentoSaida = {
    id: '',
    unidadeAtendimento: null,
    emissao: new Date(),
    status: '',
    observacao: '',
    itens: [],
};

const emptyItemDocumentoSaida = {
    documentoSaidaId: '',
    numero: 0,
    quantidade: '',
    quantidadeConferida: '',
    quantidadePendente: '',
    beneficioEventual: null,
    unidadeAtendimento: null,
    status: Status.PENDENTE,
    deleted: false,
    movimentos: [],
}

function validarItemDocumentoSaida(item, itens, documentoSaida) {
    let campos = [];

    if (documentoSaida.unidadeAtendimento == null) {
        campos.push({ campo: "unidadeAtendimento", erro: "A Unidade de Atendimento ORIGEM não foi informada." });
    }
    
    if (item.unidadeAtendimento == null) {
        campos.push({ campo: "unidadeAtendimento", erro: "A UNIDADE DE ATENDIMENTO não foi selecionada." });
    }

    if (item.beneficioEventual == null) {
        campos.push({ campo: "beneficioEventual", erro: "O BENEFICIO EVENTUAL não foi selecionado." });
    }

    if (documentoSaida.unidadeAtendimento != null && item.unidadeAtendimento != null && item.unidadeAtendimento.id === documentoSaida.unidadeAtendimento.id) {
        campos.push({ campo: "unidadeAtendimento", erro: "Não é possível movimentar ITEM para a MESMA UNIDADE DE ATENDIMENTO." });
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
        
        const estoque = item.beneficioEventual.estoque.find(obj => obj.unidadeAtendimento.id === documentoSaida.unidadeAtendimento.id);
        if (estoque.quantidade < sumItens) {
            campos.push({
                campo: "quantidade", erro: "A QUANTIDADE informada para este item ultrapassa o saldo do benefício eventual " +
                    item.beneficioEventual.descricao + " em " + (sumItens - estoque.quantidade) + " unidades."
            });
        }
    }

    return campos;
}

export { emptyDocumentoSaida, emptyItemDocumentoSaida, validarItemDocumentoSaida };