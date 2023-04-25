import React from 'react';
import {
    AppBar, Avatar,
    Card, CardActions, CardContent, CardHeader,
    Grid, Tab, Tabs, Typography
} from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardPessoaComponent from '../../Prontuario/Components/CardPessoaComponent';
import WarningIcon from '@material-ui/icons/Warning';
import { yellow } from '@material-ui/core/colors';
import AtendimentoService from '../../../services/AtendimentoService';
import ProntuarioService from '../../../services/ProntuarioService'
import AnaliseFicha from '../AnaliseFicha';
import TabPanel, { a11yProps } from '../../../components/CustomTabs/TabPanel';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import ImportButton from '../../../components/CustomButtons/ImportButton';
import { emptyProntuario } from '../../../models/Prontuario';
import AnaliseHistoricoSolicitacoesView from './AnaliseHistoricoSolicitacoesView';
import { importModalMessage } from '../../../api/utils/modalMessages';
import NewButton from '../../../components/CustomButtons/NewButton';
import ProntuarioFormGeralComponent from '../../Prontuario/Components/ProntuarioFormGeralComponent';
import { useHistory } from 'react-router-dom';


export default function AnaliseSolicitacaoView(props) {
    const { atendimento, callback } = props;
    const prontuario = atendimento.prontuario;
    const [tabIndex, setTabIndex] = React.useState(0);
    let history = useHistory();

    const handleImportarProntuario = () => {
        importModalMessage(
            () => AtendimentoService.importarAtendimento(atendimento.id),
            (value) => callback(value)
        );
    }

    const buscarProntuario = () => {
        history.push('/prontuarios-ficha/0/edit');
    }

    

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                {(prontuario == null || prontuario === emptyProntuario) && (
                    <React.Fragment>
                        <Card raised>
                            <CardHeader
                                avatar={
                                    <Avatar style={{ color: '#055', backgroundColor: yellow[500] }}>
                                        <WarningIcon />
                                    </Avatar>
                                }
                                disableTypography={true}
                                title={
                                    <Typography variant="h6">
                                        Atenção!
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2" color="secondary">
                                    O SOLICITANTE vinculado a esta SOLICITAÇÃO não possui registro de prontuario ATIVO no sistema!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ImportButton
                                    label={"Importar Prontuário"}
                                    tooltip="Clique aqui para importar o Prontuário da pessoa 
                                    assim que ele estiver ATIVO."
                                    onClick={handleImportarProntuario} />

                                <NewButton
                                    label="Cadastrar um novo prontuário"
                                   onClick={buscarProntuario}/>
                            </CardActions>
                        </Card>
                    </React.Fragment>
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
                    <CustomTextField
                        id="descricao-solicitacao"
                        label="Descrição da solicitação"
                        value={atendimento.descricao}
                        rows={4}
                        multiline
                        disabled
                    />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <AnaliseHistoricoSolicitacoesView atendimento={atendimento} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <AnaliseFicha atendimento={atendimento} />
                </TabPanel>

            </Grid>
        </Grid>
    );
}