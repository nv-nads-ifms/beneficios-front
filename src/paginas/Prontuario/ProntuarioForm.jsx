import React from 'react';
import Moment from 'moment';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { AppBar, Grid, Tab, Tabs, Typography } from '@mui/material';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { AttachMoney, Description, Group, History, School } from '@mui/icons-material';
import { a11yProps } from '../../components/V1.0.0/DNATabPanel';
import TabPanel from '../../components/CustomTabs/TabPanel';
import ProntuarioFormGeralComponent from './Components/ProntuarioFormGeralComponent';
import ProntuarioFamiliaListagemComponent from './ComposicaoFamiliar/ProntuarioFamiliaListagemComponent';
import ProntuarioRendimentoListagemComponent from './SituacaoEconomica/ProntuarioRendimentoListagemComponent';
import ProntuarioEducacaoListagemComponent from './SituacaoEducacional/ProntuarioEducacaoListagemComponent';
import ProntuarioHistoricoListagemComponent from './Historico/ProntuarioHistoricoListagemComponent';
import { emptyProntuario } from '../../models/Prontuario';
import { DNAStatus } from '../../api/utils/constants';
import { userContext } from '../../hooks/userContext';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import { handleChangeInputComponent } from '../../api/utils/util';

function ProntuarioForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const usuario = React.useContext(userContext);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);

    const [tabIndex, setTabIndex] = React.useState(0);
    const [prontuario, setProntuario] = React.useState(emptyProntuario);

    React.useEffect(() => {
        if (usuario != null && usuario.hasOwnProperty('funcionario')) {
            setUnidadeAtendimento(usuario.funcionario.unidadeAtendimento);
        } else {
            setUnidadeAtendimento(emptyUnidadeAtendimento);
        }
    }, [usuario]);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setProntuario, prontuario);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: prontuario,
            setObject: setProntuario,
            emptyObject: emptyProntuario
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Prontuário"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
                objectfilefieldname={'foto'}
            >
                <Grid sx={{mb: 3}} container spacing={0} direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="subtitle1" color="textPrimary" align="center">
                            Prontuário N.o {prontuario.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="subtitle2" color="textSecondary">
                            {unidadeAtendimento.numeroDaUnidade} - {unidadeAtendimento.nome}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="body2" color="textSecondary" align="center">
                            Data de emissão: {Moment(prontuario.emissao).format('DD/MM/Y hh:mm:ss a')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ChipStatus status={prontuario.status} />
                    </Grid>
                </Grid>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newValue) => setTabIndex(newValue)}
                        variant="standard"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab para controle do prontuário">
                        <Tab label="Geral" icon={<Description />} {...a11yProps(0)} />
                        <Tab label="Composição Familiar" icon={<Group />} {...a11yProps(1)} />
                        <Tab label="Situação Econômica" icon={<AttachMoney />} {...a11yProps(2)} />
                        <Tab label="Situação Educacional" icon={<School />} {...a11yProps(3)} />
                        <Tab label="Histórico" icon={<History />} {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <ProntuarioFormGeralComponent
                        disabled={datacontrol === DNAStatus.VIEW}
                        onChange={handleChange} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ProntuarioFamiliaListagemComponent
                        disabled={datacontrol === DNAStatus.VIEW}
                        onChange={handleChange} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <ProntuarioRendimentoListagemComponent />
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    <ProntuarioEducacaoListagemComponent
                        prontuario={prontuario} />
                </TabPanel>
                <TabPanel value={tabIndex} index={4}>
                    <ProntuarioHistoricoListagemComponent
                        prontuario={prontuario} />
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default ProntuarioForm;