import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { DNAStatus } from '../../api/utils/constants';
import { emptyDocumentoSaida } from '../../models/DocumentoSaida';
import { AppBar, Tab, Tabs } from '@mui/material';
import { Description, ListAlt } from '@mui/icons-material';
import TabPanel, { a11yProps } from '../../components/V1.0.0/DNATabPanel';
import DocumentoSaidaDadosForm from './components/DocumentoSaidaDadosForm';
import { userContext } from '../../hooks/userContext';
import ItemDocumentoSaidaForm from './components/ItemDocumentoSaidaForm';

function DocumentoSaidaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;
    /* Controle dos dados do funcionario logado */
    const usuario = React.useContext(userContext);

    const [tabIndex, setTabIndex] = React.useState(0);
    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);

    const disableFields = React.useMemo(() => {
        return datacontrol === DNAStatus.VIEW;
    }, [datacontrol]);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }
    return (
        <objectContext.Provider value={{
            object: {
                ...documentoSaida,
                unidadeAtendimento: usuario.funcionario.unidadeAtendimento
            },
            setObject: setDocumentoSaida,
            emptyObject: emptyDocumentoSaida
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Documento de Saída"}
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
                        aria-label="tab para controle do documento">
                        <Tab label="Dados do documento" icon={<Description />} {...a11yProps(0)} />
                        <Tab label="Itens de saída" icon={<ListAlt />} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <DocumentoSaidaDadosForm
                        value={documentoSaida}
                        disabled={disableFields}
                        callback={setDocumentoSaida}
                    />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ItemDocumentoSaidaForm
                        disabled={disableFields}
                    />
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default DocumentoSaidaForm;