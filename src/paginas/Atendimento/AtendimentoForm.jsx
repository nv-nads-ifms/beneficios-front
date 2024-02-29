import React from 'react';
import Moment from 'moment';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { handleChangeInputComponent, setFieldValue } from '../../api/utils/util';
import { DNAStatus } from '../../api/utils/constants';
import { emptyAtendimento } from '../../models/Atendimento';
import { Grid, TextField, Typography } from '@mui/material';
import { userContext } from '../../hooks/userContext';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';

function AtendimentoForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props; 

    const usuario = React.useContext(userContext);
    const [atendimento, setAtendimento] = React.useState(emptyAtendimento);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setAtendimento, atendimento);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: atendimento,
            setObject: setAtendimento,
            emptyObject: emptyAtendimento
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Atendimento"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
            >
                <Grid container spacing={1} direction="column">
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <Typography variant="subtitle2" gutterBottom>
                                    Atendente:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {usuario.funcionario != null ? usuario.funcionario.nome : " -- "}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="subtitle2" gutterBottom>
                                    Emissão:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" gutterBottom>
                                    {Moment(atendimento.emissao).format('DD/MM/Y hh:mm:ss a')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FieldPessoaComponent
                            id="pessoa"
                            name="pessoa"
                            pessoa={atendimento.pessoa}
                            disabled={datacontrol === DNAStatus.VIEW}
                            callback={(value) => setFieldValue("pessoa", value, setAtendimento, atendimento)} 
                            onlySearch />
                    </Grid>
                    <Grid item >
                        <TextField
                            id="descricao"
                            label="Descrição"
                            value={atendimento.descricao}
                            placeholder={"Digite a solicitação da pessoa em poucas palavras"}
                            disabled={datacontrol === DNAStatus.VIEW}
                            autoFocus={true}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined'
                            rows={4}
                            multiline
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default AtendimentoForm;