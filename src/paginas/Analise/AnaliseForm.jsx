import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { userContext } from '../../hooks/userContext';
import { emptyAnalise } from '../../models/Analise';
import { handleChangeInputComponent } from '../../api/utils/util';
import { DNAStatus } from '../../api/utils/constants';
import { AppBar, Tab, Tabs } from '@mui/material';
import { a11yProps } from '../../components/V1.0.0/DNATabPanel';
import TabPanel from '../../components/CustomTabs/TabPanel';
import { emptyAtendimento } from '../../models/Atendimento';
import AnaliseSolicitacaoView from './Views/AnaliseSolicitacaoView';

function AnaliseForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const usuario = React.useContext(userContext);
    const [analise, setAnalise] = React.useState(emptyAnalise);
    const [atendimento, setAtendimento] = React.useState(emptyAtendimento);
    const [tabIndex, setTabIndex] = React.useState(0);

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
                texto_titulo_formulario={"Dados da Análise do Atendimento"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newValue) => setTabIndex(newValue)}
                        variant="standard"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab para controle de perfis">
                        <Tab label="Dados da Solicitação" {...a11yProps(0)} />
                        <Tab label="Registro da Análise" {...a11yProps(1)} />
                        <Tab label="Lançamento dos Benefícos" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <AnaliseSolicitacaoView />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    {/* <AnaliseFormulario
                        value={atendimento}
                        onChange={onChange}
                        disabled={disableComponents}
                    /> */}
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    {/* <ItemAnaliseListagem
                        value={atendimento.atendimento}
                        unidadeAtendimento={atendimento.prontuario != null ? atendimento.prontuario.unidadeAtendimento : emptyUnidadeAtendimento}
                        callback={setItens}
                        disabled={disableComponents} /> */}
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default AnaliseForm;