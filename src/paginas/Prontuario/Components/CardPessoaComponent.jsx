import React from "react";
import Moment from 'moment';
import {
    Avatar, Card, CardHeader, makeStyles, Collapse
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PessoaCadastroModal from "../../Pessoa/PessoaCadastroModal";
import PessoaListagemModal from "../../Pessoa/PessoaListagemModal";
import { CardContent } from "@material-ui/core";
import { emptyPessoa } from "../../../models/Pessoa";
import SearchIconButton from "../../../components/CustomIconButtons/SearchIconButton";
import EditIconButton from "../../../components/CustomIconButtons/EditIconButton";
import ClearIconButton from "../../../components/CustomIconButtons/ClearIconButton";
import AddIconButton from "../../../components/CustomIconButtons/AddIconButton";
import ExpandMoreIconButton from "../../../components/CustomIconButtons/ExpandMoreIconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const emptyTitle = {
    title: "Pessoa",
    subtitle: "Adicionar Pessoa",
}

export default function CardPessoaComponent(props) {
    const { disabled, children, value, callback } = props;
    const classes = useStyles();
    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [title, setTitle] = React.useState(emptyTitle)
    const [openCadastro, setOpenCadastro] = React.useState(false);
    const [openConsulta, setOpenConsulta] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    React.useEffect(() => {
        if (value != null && value !== emptyPessoa) {
            const texto = "Nascido em " +
                Moment(value.nascimento).format('DD/MM/Y') +
                " - Tem " + value.idade + " anos";
            setPessoa(value);
            setTitle({
                title: value.nome,
                subtitle: texto,
            });
        } else {
            setPessoa(emptyPessoa);
            setTitle(emptyTitle);
        }
    }, [value]);

    const handleShowCadastro = () => {
        setOpenCadastro(true);
    };

    const handleShowConsulta = () => {
        setOpenConsulta(true);
    };

    const handleCloseCadastro = () => {
        setOpenCadastro(false);
    };

    const handleCloseConsulta = () => {
        setOpenConsulta(false);
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={pessoa.nome}
                            aria-label="titular"
                            src={"data:image/png;base64," + pessoa.foto}
                            className={classes.large} >
                            <PersonIcon />
                        </Avatar>
                    }
                    title={title.title}
                    subheader={title.subtitle}
                    action={
                        callback != null && (
                            <React.Fragment>
                                {pessoa === emptyPessoa ? (
                                    <React.Fragment>
                                        <SearchIconButton
                                            disabled={disabled}
                                            tooltip="Buscar uma pessoa"
                                            onClick={handleShowConsulta} />
                                        <AddIconButton
                                            disabled={disabled}
                                            tooltip="Cadastrar uma nova pessoa"
                                            onClick={handleShowCadastro} />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <EditIconButton
                                            disabled={disabled}
                                            tooltip={"Alterar os dados da pessoa"}
                                            onClick={handleShowCadastro} />
                                        <ClearIconButton
                                            disabled={disabled}
                                            tooltip="Limpar o campo"
                                            onClick={() => callback(null)} />
                                    </React.Fragment>
                                )}
                                <ExpandMoreIconButton
                                    tooltip="Ver mais dados da pessoa."
                                    expanded={expanded}
                                    callback={setExpanded} />
                            </React.Fragment>
                        )

                    }
                />
                {children != null && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {children}
                        </CardContent>
                    </Collapse>
                )}
            </Card>

            <PessoaCadastroModal
                pessoaId={pessoa != null ? pessoa.id : 0}
                openModal={openCadastro}
                status='edit'
                onClose={handleCloseCadastro}
                callback={callback}
            />

            <PessoaListagemModal
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
        </React.Fragment>
    );
}