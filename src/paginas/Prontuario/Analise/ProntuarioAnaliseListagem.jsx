import ProntuarioService from '../../../services/ProntuarioService';
import DefaultListForm from '../../../components/CustomForms/DefaultListForm';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable/CustomTable';
import React from 'react';
import ProntuarioAnaliseTableRow from './ProntuarioAnaliseTableRow';
import MessageDialogForm, { emptyMessage } from '../../../components/CustomForms/MessageDialogForm';
import { emptyData, Message, Status } from '../../../api/utils/constants';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';

const columns = [
    { id: 'status', label: 'Status' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'titular', label: 'Titular' },
    { id: 'emissao', label: 'Emissão' },
    { id: 'acompanhamento', label: 'Acompanhamento' },
];

export default function ProntuarioAnaliseListagem() {
    let history = useHistory();
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [message, setMessage] = React.useState(emptyMessage);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowCount, setRowCount] = React.useState(0);
    const [data, setData] = React.useState(emptyData);
    const [value, setValue] = React.useState('');

    const getRequestParams = (status, page, pageSize) => {
        let params = {};
        if (page) {
            params["page"] = page;
        }
        if (pageSize) {
            params["size"] = pageSize;
        }
        if (status !== Status.TODOS) {
            params["status"] = status;
        }
        return params;
    };

    React.useEffect(() => {
        const params = getRequestParams(value, page, rowsPerPage);
        ProntuarioService.getProntuarios(params)
            .then((resp) => {
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [rowCount, value, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleView = (value) => {
        history.push(`/prontuarios-ficha/${value.id}/${value.unidadeAtendimento.id}`);
    }

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const showModal = (type, text, callback) => {
        setMessage({
            ...message,
            open: true,
            type: type,
            text: text,
            callback: callback,
        });
    }

    function ativacao(value, observacao, status) {
        ProntuarioService.ativarProntuario(value.id,
            value.unidadeAtendimento.id, observacao, status)
            .then((r) => {
                setRowCount(rowCount + 1);
                sendMessage(Message.SUCCESS, "Prontuario atualizado com sucesso!");
            })
            .catch(e => sendMessage(Message.ERROR, "Entre em contato com o ADMINISTRADOR!"));
    }

    const handleDesativar = (value) => {
        showModal(Message.INPUT,
            "Informe o motivo da INATIVAÇÃO do prontuário de " +
            value.titular.nome + "?",
            (description) => ativacao(value, description, "desativar"));
    }

    const handleRestore = (value) => {
        showModal(Message.INPUT,
            "Informe o motivo da REATIVAÇÃO do prontuário de " +
            value.titular.nome + "?",
            (description) => ativacao(value, description, "reativar"));
    }

    const handleAtivar = (value) => {
        showModal(Message.QUESTION,
            "Confirma a ATIVAÇÃO do prontuário de " +
            value.titular.nome + "?",
            (description) => ativacao(value, description, "ativar"));
    }

    return (
        <DefaultListForm
            url={"/prontuarios-ficha"}
            formTitle="Análise de Prontuarios"
            messageAlert={messageAlert}>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status do Prontuário</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={Status.TODOS}
                            aria-label="status"
                            name="status"
                            value={value}
                            onChange={(event) => setValue(event.target.value)}>
                            <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                            <FormControlLabel value={Status.ATIVO} control={<Radio color="primary" />} label="Ativos" />
                            <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendentes" />
                            <FormControlLabel value={Status.INATIVO} control={<Radio color="primary" />} label="Inativos" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <CustomTable
                data={data}
                columns={columns}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            >
                {data.content.map((row, key) => {
                    return (
                        <ProntuarioAnaliseTableRow
                            key={"row-" + key}
                            row={row}
                            onViewRow={handleView}
                            onAtivarRow={handleAtivar}
                            onDesativarRow={handleDesativar}
                            onRestoreRow={handleRestore} />
                    );
                })}
            </CustomTable>

            <MessageDialogForm value={message} callback={setMessage} />
        </DefaultListForm>
    );
}