import React from 'react';
import Moment from 'moment';
import AvatarComponent from '../../components/V1.0.0/DNAAvatarComponent';
import { emptyPessoa } from '../../models/Pessoa';
import { DNAStatus, Status } from '../../api/utils/constants';
import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import { userContext } from '../../hooks/userContext';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { emptyPerfilMenu, getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import RetiradaBeneficioForm from './RetiradaBeneficioForm';

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            return <AvatarComponent status={params.row.status} />;
        }
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Origem',
        width: 150,
        valueGetter: ({ value }) => value.numeroDaUnidade,
    },
    {
        field: 'pessoa',
        headerName: 'Assistido',
        width: 150,
        valueGetter: ({ value }) => value.nome,
    },
    {
        field: 'emissao',
        headerName: 'Emissão',
        width: 200,
        valueGetter: ({value}) => {
            return Moment(value).format('DD/MM/Y hh:mm:ss a')
        }
    },
    {
        field: 'beneficioEventual',
        headerName: 'Benefício Eventual',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    },
    {
        field: 'quantidade',
        headerName: 'Quantidade',
        width: 90,
    },
];

function RetiradaBeneficioConsulta() {
    const usuario = React.useContext(userContext);
    /* Perfil de analise dos atendimentos */
    const perfilRetirada = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/retirada-de-beneficio`);
        return emptyPerfilMenu;
    }, [usuario]);

    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "item-analise";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [status, setStatus] = React.useState(Status.TODOS);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(null);

    const decrement = React.useCallback(() => {
        if (formId != null) {
            var l = formId;
            l[0]--;
            setFormId(l);
        } else {
            setFormId(null);
        }
    }, [formId]);

    const handleClose = () => {
        setOpen(false);
        decrement();
    };

    const handleCheckout = React.useCallback(
        (params) => () => {
            if (params.row.status !== Status.PENDENTE) {
                swalWithBootstrapButtons.fire(
                    'Ooops!',
                    `O Benefício Eventual já foi RETIRADO/CANCELADO.`,
                    'warning'
                );
            } else {
                setFormId(params.id);
                setOpen(true);
                setDataControl(params.row.status === Status.PENDENTE ? DNAStatus.EDIT : DNAStatus.VIEW);
            }
        }, []);

    const buttonMoreActions = React.useMemo(() => {
        if (perfilRetirada !== undefined && perfilRetirada.escrever) {
            return [
                { label: 'Registrar retirada', icon: <ShoppingCartCheckout />, handleClick: handleCheckout },
            ];
        }
        return [];
    }, [perfilRetirada, handleCheckout]);

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                getRowId={(row) => [row.analiseId, row.id]}
                formtitle='Consultar registro da retirada de benefício eventual'
                filterparams={{
                    pessoaId: pessoa != null && pessoa != emptyPessoa ? pessoa.id : "",
                    status: status !== Status.TODOS ? status : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FieldPessoaComponent
                            id="pessoa"
                            name="pessoa"
                            pessoa={pessoa}
                            callback={setPessoa}
                            onlySearch />
                    </Grid>
                    <Grid item xs={12}>
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
                                <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendente (a retirar)" />
                                <FormControlLabel value={Status.RETIRADO} control={<Radio color="primary" />} label="Retirado" />
                                <FormControlLabel value={Status.CANCELADO} control={<Radio color="primary" />} label="Cancelado" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <RetiradaBeneficioForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={() => handleClose(0)}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

export default RetiradaBeneficioConsulta;