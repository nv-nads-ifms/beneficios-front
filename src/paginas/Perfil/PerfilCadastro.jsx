import React from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Grid, FormControlLabel, Switch, AppBar, Tabs, Tab } from "@material-ui/core";
import PerfilService from "../../services/PerfilService";
import DescriptionIcon from '@material-ui/icons/Description';
import MenuIcon from '@material-ui/icons/Menu';
import CustomTextField from "../../components/CustomFields/CustomTextField";
import PerfilMenuComponent from "./PerfilMenuComponent";
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import MenuService from "../../services/MenuService";
import BaseForm from "../../components/CustomForms/BaseForm";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { userContext } from "../../hooks/userContext";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function PerfilCadastro() {
    let history = useHistory();
    
    const { id, status } = useParams();
    const [tabIndex, setTabIndex] = React.useState(0);
    const usuario = React.useContext(userContext);
    const perfilMenu = getMenuPerfilByUrl(usuario.perfis, '/perfis');
    
    const [perfil, setPerfil] = React.useState({
        nome: '',
        status: "ATIVO",
        menus: []
    });
    const [menuItens, setMenuItens] = React.useState([]);

    React.useEffect(() => {
        MenuService.getMenus()
            .then((r) => {
                setMenuItens(r.data);
            });
    }, [setMenuItens]);

    React.useEffect(() => {
        if (id > 0) {
            PerfilService.getPerfilById(id)
                .then(r => {
                    setPerfil(r.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history]);

    const onChange = (event) => {
        let t = event.target;
        const value = t.type === "checkbox" ?
            (t.checked ? "ATIVO" : "INATIVO") : t.value;
        setData(t.name, value);
    }

    const setData = (fieldname, value) => {
        setPerfil({
            ...perfil,
            [fieldname]: value,
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => PerfilService.savePerfil(id, perfil),
            () => history.push('/perfis')
        );
    }

    return (
        <BaseForm
            title="Cadastro de Perfil"
            backButton
            onSave={perfilMenu.escrever && status === 'edit' ? handlePost : null}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                    variant="standard"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tab para controle de perfis">
                    <Tab label="Dados" icon={<DescriptionIcon />} {...a11yProps(0)} />
                    <Tab label="Menus" icon={<MenuIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <CustomTextField
                            id="nome"
                            label="Nome"
                            value={perfil.nome}
                            placeholder="Digite o nome de um perfil"
                            autoFocus={true}
                            onChangeHandler={onChange}
                            disabled={status === "view"}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={0} direction="column" alignItems="flex-end">
                    <Grid item xs>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={perfil.status === "ATIVO"}
                                    onChange={onChange}
                                    name="status"
                                    color="primary"
                                    size="medium"
                                />
                            }
                            label="Ativo"
                            disabled={status === "view"}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <PerfilMenuComponent
                            rows={perfil.menus}
                            menus={menuItens}
                            setRows={(data) => setData("menus", data)} />
                    </Grid>
                </Grid>
            </TabPanel>
        </BaseForm>
    );
}