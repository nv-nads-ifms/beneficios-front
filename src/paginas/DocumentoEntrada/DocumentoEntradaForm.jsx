import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import { AppBar, Tab, Tabs } from '@mui/material';
import { Description, ListAlt } from '@mui/icons-material';
import TabPanel, { a11yProps } from '../../components/V1.0.0/DNATabPanel';
import { DNAStatus } from '../../api/utils/constants';
import DocumentoEntradaDadosForm from './components/DocumentoEntradaDadosForm';
import ItemDocumentoEntradaForm from './components/ItemDocumentoEntradaForm';
import { userContext } from '../../hooks/userContext';

function DocumentoEntradaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;
    /* Controle dos dados do funcionario logado */
    const usuario = React.useContext(userContext);

    const [tabIndex, setTabIndex] = React.useState(0);
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    const disableFields = React.useMemo(() => {
        return datacontrol === DNAStatus.VIEW;
    }, [datacontrol]);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }
    console.log(documentoEntrada);
    return (
        <objectContext.Provider value={{
            object: {
                ...documentoEntrada,
                unidadeAtendimento: usuario.funcionario.unidadeAtendimento
            },
            setObject: setDocumentoEntrada,
            emptyObject: emptyDocumentoEntrada
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Documento de Entrada"}
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
                        <Tab label="Itens de entrada" icon={<ListAlt />} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <DocumentoEntradaDadosForm
                        disabled={disableFields}
                    />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ItemDocumentoEntradaForm
                        disabled={disableFields}
                    />
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default DocumentoEntradaForm;