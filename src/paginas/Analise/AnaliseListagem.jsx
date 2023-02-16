import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import AtendimentoService from '../../services/AtendimentoService';
import BaseForm from '../../components/CustomForms/BaseForm';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import { emptyPessoa } from '../../models/Pessoa';
import { emptyData, Status } from '../../api/utils/constants';
import AnaliseTableRow from './AnaliseTableRow';
import { userContext } from '../../hooks/userContext';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';
import AtendimentoContagem from '../Atendimento/AtendimentoContagem';
import { ativacaoModalMessage } from '../../api/utils/modalMessages';

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'unidade', label: 'Unidade Atend.' },
    { id: 'prontuario', label: 'Prontuario' },
    { id: 'funcionario', label: 'Atendente' },
    { id: 'pessoa', label: 'Assistido' },
    { id: 'emissao', label: 'Emissão' },
    { id: 'encaminhamento', label: 'Encaminhamento?' },
];

const getRequestParams = (pessoa, uaid, status, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    if (pessoa != null && pessoa.id !== undefined) {
        params["pessoaId"] = pessoa.id;
    }
    if (uaid != null) {
        params["unidadeAtendimentoId"] = uaid;
    }
    if (status !== Status.TODOS) {
        params["status"] = status;
    }

    return params;
}

export default function AnaliseListagem() {
    let history = useHistory();

    const usuario = React.useContext(userContext);
    
    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(usuario.funcionario.unidadeAtendimento);
    const [uaid, setUaid] = React.useState(usuario.funcionario.unidadeAtendimento.id);
    const [status, setStatus] = React.useState(Status.TODOS);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setUaid(0);
        if (unidadeAtendimento != null) {
            setUaid(unidadeAtendimento.id);
        }
    }, [unidadeAtendimento]);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(pessoa, uaid, status, page, rowsPerPage);
        AtendimentoService.getAtendimentos(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [pessoa, uaid, status, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleStart = (value) => {
        ativacaoModalMessage(
            'Iniciar atendimento?', 'Iniciar',
            () => AtendimentoService.iniciarAtendimento(value.id),
            (value) => handleView(value)
        );
    }
    
    const handleAction = (id, action) => {
        history.push(`/analise-atendimento-ficha/${id}/${action}`);
    }

    const handleView = (value) => {
        handleAction(value.id, 'view')
    }

    return (
        <BaseForm title="Análise dos Atendimentos">
            <AtendimentoContagem
                rowCount={0}
                unidadeAtendimentoId={uaid} />
            <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                    <FieldPessoaComponent
                        id="pessoa"
                        name="pessoa"
                        pessoa={pessoa}
                        callback={setPessoa}
                        onlySearch />
                </Grid>
                <Grid item sm={12} md={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status do Atendimento</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={Status.TODOS}
                            aria-label="status"
                            name="status"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}>
                            <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                            <FormControlLabel value={Status.ABERTO} control={<Radio color="primary" />} label="Aberto" />
                            <FormControlLabel value={Status.INICIADO} control={<Radio color="primary" />} label="Iniciado" />
                            <FormControlLabel value={Status.AUTORIZADO} control={<Radio color="primary" />} label="Autorizado" />
                            <FormControlLabel value={Status.NEGADO} control={<Radio color="primary" />} label="Negado" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={12} md={12}>
                    <ComboUnidadeAtendimento
                        id="unidadeAtendimento"
                        label="Unidade de Atendimento"
                        value={unidadeAtendimento}
                        callback={(value) => setUnidadeAtendimento(value)}
                    />
                </Grid>
            </Grid>
            <CustomTable
                data={data}
                columns={columnsNames}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <AnaliseTableRow
                            key={"row-" + key}
                            row={row}
                            onViewRow={handleView}
                            onInitRow={handleStart} />
                    );
                })}
            </CustomTable>
        </BaseForm>

    );
}