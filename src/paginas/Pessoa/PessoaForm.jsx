import React from 'react';
import { emptyPessoa } from '../../models/Pessoa';
import { DNAStatus } from '../../api/utils/constants';
import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { AppBar, Tab, Tabs } from '@mui/material';

import DescriptionIcon from '@material-ui/icons/Description';
import HouseIcon from '@material-ui/icons/House';
import WorkIcon from '@material-ui/icons/Work';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import PessoaFromGeral from './PessoaFormGeral';
import MoradiasComponent from './moradia/MoradiasComponent';
import RendimentosComponent from './rendimentos/RendimentosComponent';
import AuxilioComponent from './auxilios/AuxilioComponent';


function PessoaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [tabIndex, setTabIndex] = React.useState(0);
    const [pessoa, setPessoa] = React.useState(emptyPessoa);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const setData = (fieldname, value) => {
        setPessoa({
            ...pessoa,
            [fieldname]: value
        });
    }


    return (
        <objectContext.Provider value={{
            object: pessoa,
            setObject: setPessoa,
            emptyObject: emptyPessoa
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados da Pessoa"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
                objectfilefieldname={'foto'}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newValue) => setTabIndex(newValue)}
                        variant="standard"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab para controle do prontuário">
                        <Tab label="Geral" icon={<DescriptionIcon />} {...a11yProps(0)} />
                        <Tab label="Moradia" icon={<HouseIcon />} {...a11yProps(1)} />
                        <Tab label="Trabalho/Emprego" icon={<WorkIcon />} {...a11yProps(2)} />
                        <Tab label="Auxílios/Programas de Governo" icon={<LocalPharmacyIcon />} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                    <PessoaFromGeral
                        disabled={datacontrol === DNAStatus.VIEW} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <MoradiasComponent
                        moradias={pessoa.moradias}
                        disabled={datacontrol === DNAStatus.VIEW}
                        callback={(values) => setData("moradias", values)} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <RendimentosComponent
                        rendimentos={pessoa.rendimentos}
                        disabled={datacontrol === DNAStatus.VIEW}
                        callback={(values) => setData("rendimentos", values)} />
                </TabPanel>

                <TabPanel value={tabIndex} index={3}>
                    <AuxilioComponent
                        auxilios={pessoa.auxilios}
                        disabled={datacontrol === DNAStatus.VIEW}
                        callback={(values) => setData("auxilios", values)} />
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default PessoaForm;