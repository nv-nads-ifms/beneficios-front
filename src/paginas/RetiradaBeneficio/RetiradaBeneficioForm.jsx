import React from 'react';
import Moment from 'moment';
import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { emptyItemAnalise } from '../../models/Analise';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import ListDocumentoView from '../Analise/Components/ListDocumentoView';
import { userContext } from '../../hooks/userContext';
import { DNAStatus } from '../../api/utils/constants';
import { ativacaoModalMessageComInput } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import { emptyPerfilMenu, getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import SaveButton from '../../components/CustomButtons/SaveButton';

function RetiradaBeneficioForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const usuario = React.useContext(userContext);
    /* Perfil de analise dos atendimentos */
    const perfilRetirada = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/retirada-de-beneficio`);
        return emptyPerfilMenu;
    }, [usuario]);

    const [itemAnalise, setItemAnalise] = React.useState(emptyItemAnalise);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const handlePost = () => {
        const dataService = new DataService(`/${data_source_url}/retirar`);

        ativacaoModalMessageComInput("Confirmar a retirada do Benefício Eventual " +
            itemAnalise.beneficioEventual?.nome + "?", '',
            (text) => dataService.save(0, {
                itemId: id_value[1],
                analiseId: id_value[0],
                observacao: text
            }),
            () => on_close_func()
        );
    };

    return (
        <objectContext.Provider value={{
            object: itemAnalise,
            setObject: setItemAnalise,
            emptyObject: emptyItemAnalise
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Registro de Retirada de Benefício Eventual"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"md"}
            >
                <List dense={true}>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant="h6" align="center" >
                                    Requisição/Item N.o {itemAnalise.analiseId} / {itemAnalise.id}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography variant="h5" align="center" color="textSecondary" >
                                        {itemAnalise.tecnico != null && itemAnalise.tecnico.unidadeAtendimento.nome}
                                    </Typography>
                                    <Typography variant="subtitle1" align="center" color="textSecondary">
                                        Data de emissão da requisição: {Moment(itemAnalise.emissaoAtendimento).format('DD/MM/Y hh:mm:ss a')}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant="h6">
                                    Identificação do solicitante
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt={itemAnalise.pessoa?.nome}
                                src={"data:image/png;base64," + itemAnalise.pessoa?.foto} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h6" color="primary">
                                    {itemAnalise.pessoa?.nome}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" color="textSecondary">
                                    Solicitante
                                </Typography>
                            }
                        />
                        <ListItemText
                            primary={
                                <Typography variant="h6" color="primary">
                                    Documentos
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Grid container spacing={1}>
                                        {itemAnalise.pessoa?.documentos.map((obj, index) => (
                                            <Grid item xs={12}>
                                                <ListDocumentoView documentoPessoa={obj} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </React.Fragment>
                            } />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant="h6">
                                    Benefício a ser retirado
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant="h6" color="primary">
                                    {itemAnalise.beneficioEventual?.nome}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="h6" color="textSecondary">
                                    Total a retirar: {itemAnalise.quantidade}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
                <Grid container spacing={1}>
                    <Grid item xs={12} container direction={"column"} alignItems="flex-end">
                        {perfilRetirada.escrever && datacontrol === DNAStatus.EDIT && (
                            <SaveButton
                                label="Confirmar retirada"
                                type="button"
                                onClick={handlePost} />
                        )}
                    </Grid>
                </Grid>
            </DNAFormDialog >
        </objectContext.Provider >
    );
}

export default RetiradaBeneficioForm;