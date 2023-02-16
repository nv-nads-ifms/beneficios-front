import React from 'react';
import Moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import {
    Typography, Avatar, makeStyles,
    List, ListItem, ListItemText, ListItemAvatar, Grid,
} from '@material-ui/core';
import { emptyAnalise, emptyItemAnalise } from '../../models/Analise';
import ListDocumentoView from '../Analise/Components/ListDocumentoView';
import SaveButton from '../../components/CustomButtons/SaveButton';
import BackButton from '../../components/CustomButtons/BackButton';
import BaseForm from '../../components/CustomForms/BaseForm';
import ItemAnaliseService from '../../services/ItemAnaliseService';
import AtendimentoService from '../../services/AtendimentoService';
import { emptyAtendimento } from '../../models/Atendimento';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    lista: {
        width: '100%',
        minWidth: '48ch',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function RetiradaBeneficioView() {
    let history = useHistory();
    const { itemId, id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/retirada-de-beneficio";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);

    const classes = useStyles();
    const [analise, setAnalise] = React.useState(emptyAnalise);
    const [atendimento, setAtendimento] = React.useState(emptyAtendimento);
    const [itemAnalise, setItemAnalise] = React.useState(emptyItemAnalise);
    const [descricao, setDescricao] = React.useState("");
    const [quantidade, setQuantidade] = React.useState(0);

    React.useEffect(() => {
        if (id !== '') {
            AtendimentoService.getAtendimentoByAnaliseId(id)
                .then(r => {
                    const data = r.data;
                    setAtendimento(data);
                    setAnalise(data.analise);
                    data.analise.itens.map(obj => {
                        if (parseInt(obj.id, 10) === parseInt(itemId, 10)) {
                            setItemAnalise(obj);
                            if (obj.beneficioEventual != null) {
                                setDescricao(obj.beneficioEventual.descricao);
                                setQuantidade(obj.quantidade);
                            }
                        }
                        return obj;
                    });

                });
        }
    }, [id, itemId]);

    const handlePost = (event) => {
        Swal.fire({
            title: 'Confirma a retirada do benefício eventual?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Candelar',
            showLoaderOnConfirm: true,
            preConfirm: (message) => {
                const params = {
                    itemId: itemAnalise.id,
                    analiseId: analise.id,
                    observacao: message,
                };

                return ItemAnaliseService.retirar(params)
                    .then(data => {
                        history.push('/retirada-de-beneficio');
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Retirado!',
                    `O Benefício Eventual foi retirado.`,
                    'success'
                );
                history.push('/retirada-de-beneficio');
            }
        });
    }

    return (
        <BaseForm
            title="Retirada de Benefício Eventual">
            <List className={classes.lista} dense={true}>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="h6" align="center" >
                                Requisição/Item N.o {analise.id} / {itemAnalise.id}
                            </Typography>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography variant="h5" align="center" color="textSecondary" >
                                    {analise.tecnico != null && analise.tecnico.unidadeAtendimento.nome}
                                </Typography>
                                <Typography variant="subtitle1" align="center" color="textSecondary">
                                    Data de emissão da requisição: {Moment(atendimento.emissao).format('DD/MM/Y hh:mm:ss a')}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item>
                    <List>
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
                                    className={classes.large}
                                    alt={itemAnalise.pessoa.nome}
                                    src={"data:image/png;base64," + itemAnalise.pessoa.foto} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" color="primary">
                                        {itemAnalise.pessoa.nome}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        Solicitante
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" color="primary">
                                        Documentos
                                    </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Grid container spacing={1}>
                                            {itemAnalise.pessoa.documentos.map((obj, index) => (
                                                <Grid item >
                                                    <ListDocumentoView documentoPessoa={obj} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </React.Fragment>
                                } />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <List>
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
                                        {descricao}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="h6" color="textSecondary">
                                        Total a retirar: {quantidade}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="flex-end">
                <Grid item xs>
                    {perfil.escrever && status !== 'view' && (
                        <SaveButton
                            label="Confirmar retirada"
                            type="button"
                            className={classes.button}
                            onClick={handlePost} />
                    )}

                    <BackButton className={classes.button} />
                </Grid>
            </Grid>
        </BaseForm>
    );
}