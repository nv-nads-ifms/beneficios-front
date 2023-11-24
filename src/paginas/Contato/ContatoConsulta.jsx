import React, { useState } from "react";

// Mui Imports
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Form Imports
import { formContext } from '../../contexts/formContext';
import { DNAStatus, TipoContato } from '../../api/utils/constants';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import ContatoForm from "./ContatoForm";

const columns = [
    {
        field: 'id',
        headerName: 'Código',
        width: 90,
    },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1
    },
    {
        field: 'tipoContato',
        headerName: 'Tipo do Contato',
        minWidth: 150,
        flex: 1,
    },
];

function ContatoConsulta() {
    const path = "contatos";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = useState("");
    const [tipoContato, setTipoContato] = useState("");

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = useState(false);
    const [dataControl, setDataControl] = useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(0);
    };
    return (
        <>
            <formContext.Provider value={{
                setFormId: setFormId,
                setDataControl: setDataControl,
                setOpen: setOpen
            }}>
                <DNADefaultDialogListForm
                    datasourceUrl={path}
                    formtitle='Consultar Contatos'
                    filterparams={{
                        nome: nome,
                        tipoContato: tipoContato,
                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id='nome'
                                value={nome}
                                label={"Buscar por nome"}
                                variant='outlined'
                                fullWidth
                                onChange={(event) => setNome(event.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ToggleButtonGroup
                                id="tipoContato"
                                name="tipoContato"
                                value={tipoContato}
                                exclusive
                                size="large"
                                onChange={(e, value) => setTipoContato(value)}
                                aria-label="text tipo contato"
                            >
                                <ToggleButton value={TipoContato.PHONE} aria-label="telefone">
                                    <PhoneIcon />
                                </ToggleButton>
                                <ToggleButton value={TipoContato.MAIL} aria-label="e-mail">
                                    <MailIcon />
                                </ToggleButton>
                                <ToggleButton value={TipoContato.TWITTER} aria-label="twitter">
                                    <TwitterIcon />
                                </ToggleButton>
                                <ToggleButton value={TipoContato.FACEBOOK} aria-label="facebook">
                                    <FacebookIcon />
                                </ToggleButton>
                                <ToggleButton value={TipoContato.CELLPHONE} aria-label="celular">
                                    <SettingsCellIcon />
                                </ToggleButton>
                                <ToggleButton value={TipoContato.WHATSAPP} aria-label="whatsApp">
                                    <WhatsAppIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                </DNADefaultDialogListForm>

                <ContatoForm
                    id_value={formId}
                    datacontrol={dataControl}
                    on_change_datacontrol={setDataControl}
                    open={open}
                    on_close_func={handleClose}
                    data_source_url={path}
                />
            </formContext.Provider>

        </>
    )
}

export default ContatoConsulta;