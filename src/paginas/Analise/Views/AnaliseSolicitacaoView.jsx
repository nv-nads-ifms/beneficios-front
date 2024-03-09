import React from 'react';
import {
    AppBar, Avatar,
    Card, CardActions, CardContent, CardHeader,
    Grid, Stack, Tab, Tabs, Typography
} from '@mui/material';
import CardPessoaComponent from '../../Prontuario/Components/CardPessoaComponent';
import AnaliseFicha from '../AnaliseFicha';
import ImportButton from '../../../components/CustomButtons/ImportButton';
import { emptyProntuario } from '../../../models/Prontuario';
import AnaliseHistoricoSolicitacoesView from './AnaliseHistoricoSolicitacoesView';
import { importModalMessage } from '../../../api/utils/modalMessages';
import { objectContext } from '../../../contexts/objectContext';
import { yellow } from '@mui/material/colors';
import { Warning } from '@mui/icons-material';
import TabPanel, { a11yProps } from '../../../components/V1.0.0/DNATabPanel';
import DataService from '../../../api/services/DataServices';
import { emptyAtendimento } from '../../../models/Atendimento';
import { setFieldValue } from '../../../api/utils/util';
import { TextField } from '@material-ui/core';

const dsAtendimento = new DataService('/atendimentos');

export default function AnaliseSolicitacaoView() {
    /* Recuperação do atendimento que será manipulado */
    const { object, setObject } = React.useContext(objectContext);
    
    const atendimento = React.useMemo(() => {
        if (object != null) {
            return object.atendimento;
        }
        return emptyAtendimento;
    }, [object]);

    const prontuario = React.useMemo(() => {
        if (atendimento !== emptyAtendimento) {
            return atendimento.prontuario;
        }
        return emptyProntuario;
    }, [atendimento]);

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleImportarProntuario = () => {
        importModalMessage(
            () => dsAtendimento.save(["importar", atendimento.id]),
            (value) => setFieldValue('atendimento', value, setObject, object)
        );
    }

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                {(prontuario == null || prontuario === emptyProntuario) && (
                    <Card raised>
                        <CardHeader
                            avatar={
                                <Avatar style={{ color: '#000', backgroundColor: yellow[500] }}>
                                    <Warning />
                                </Avatar>
                            }

                            title={
                                <Typography variant="h6">
                                    Atenção!
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant="body2" color="red">
                                    O SOLICITANTE vinculado a esta SOLICITAÇÃO não possui registro de prontuario ATIVO no sistema!
                                </Typography>
                                <Typography>
                                    Providencie o cadastro e a análise do PRONTUÁRIO para dar sequência no antendimento.
                                </Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <ImportButton
                                label={"Importar Prontuário"}
                                tooltip="Clique aqui para importar o Prontuário da pessoa 
                                    assim que ele estiver ATIVO."
                                onClick={handleImportarProntuario} />
                        </CardActions>
                    </Card>
                )}
            </Grid>
            <Grid item>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newValue) => setTabIndex(newValue)}
                        variant="standard"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab para controle de perfis">
                        <Tab label="Solicitação" {...a11yProps(0)} />
                        <Tab label="Histórico de Solicitações" {...a11yProps(1)} />
                        {(prontuario != null && prontuario !== emptyProntuario) && (
                            <Tab label="Prontuário" {...a11yProps(2)} />
                        )}
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <CardPessoaComponent value={atendimento.pessoa} />
                    <TextField
                        id="descricao-solicitacao"
                        label="Descrição da solicitação"
                        value={atendimento.descricao}
                        minRows={4}
                        variant='outlined'
                        multiline
                        disabled
                    />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <AnaliseHistoricoSolicitacoesView />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <AnaliseFicha />
                </TabPanel>

            </Grid>
        </Grid>
    );
}