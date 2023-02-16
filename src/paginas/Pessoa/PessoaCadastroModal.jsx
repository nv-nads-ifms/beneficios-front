import React from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import DialogForms from "../../components/CustomForms/DialogForms";
import PessoaService from "../../services/PessoaService";
import MoradiasComponent from "./moradia/MoradiasComponent";
import RendimentosComponent from "./rendimentos/RendimentosComponent";
import { emptyPessoa } from "../../models/Pessoa";
import DescriptionIcon from '@material-ui/icons/Description';
import HouseIcon from '@material-ui/icons/House';
import WorkIcon from '@material-ui/icons/Work';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import AuxilioComponent from "./auxilios/AuxilioComponent";
import PessoaFromGeral from "./PessoaFormGeral";

import noImageAvailable from "../../img/noImageAvailable.png";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function PessoaCadastroModal(props) {
    const { pessoaId, openModal, onClose, callback, status } = props;
    const usuario = React.useContext(userContext);
    const returnURL = "/pessoas";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [tabIndex, setTabIndex] = React.useState(0);
    const [title, setTitle] = React.useState('');

    const [pessoa, setPessoa] = React.useState(emptyPessoa);

    React.useEffect(() => {
        if (pessoaId > 0) {
            setTitle('Alteração de dados da Pessoa');
            PessoaService.getPessoaById(pessoaId)
                .then(r => {
                    const data = r.data;
                    if (data.foto != null) {
                        let foto = null;
                        if (data.foto.includes("data:image")) {
                            foto = data.foto;
                        } else {
                            foto = "data:image/png;base64," + data.foto;
                        }
                        setPessoa({
                            ...data,
                            foto: foto,
                        });
                    } else {
                        setPessoa(data);
                    }
                });
        } else {
            setTitle('Cadastro de Pessoa');
            setTabIndex(0);
            setPessoa({
                ...emptyPessoa,
                foto: noImageAvailable,
                contatos: [],
                moradias: [],
                documentos: [],
                rendimentos: [],
                auxilios: [],
            });

        }
    }, [pessoaId]);

    const handleClose = () => {
        onClose();
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => PessoaService.savePessoa(pessoaId, pessoa),
            () => {
                callback();
                handleClose();
            }
        );
    }

    const setData = (fieldname, value) => {
        setPessoa({
            ...pessoa,
            [fieldname]: value,
        });
    }

    return (
        <DialogForms
            title={title}
            open={openModal}
            maxWidth="lg"
            onClose={handleClose}
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
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
                    pessoa={pessoa} 
                    disabled={!enabledFields}
                    callback={setPessoa} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <MoradiasComponent
                    moradias={pessoa.moradias}
                    disabled={!enabledFields}
                    callback={(values) => setData("moradias", values)} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <RendimentosComponent
                    rendimentos={pessoa.rendimentos}
                    disabled={!enabledFields}
                    callback={(values) => setData("rendimentos", values)} />
            </TabPanel>

            <TabPanel value={tabIndex} index={3}>
                <AuxilioComponent
                    auxilios={pessoa.auxilios}
                    disabled={!enabledFields}
                    callback={(values) => setData("auxilios", values)} />
            </TabPanel>
        </DialogForms>
    );
}