import React from "react";
import { Divider, Paper, InputBase, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PessoaCadastroModal from "./PessoaCadastroModal";
import PessoaListagemModal from "./PessoaListagemModal";
import { fichaStyles } from "../../components/UI/GlobalStyle";
import SearchIconButton from "../../components/CustomIconButtons/SearchIconButton";
import AddIconButton from "../../components/CustomIconButtons/AddIconButton";
import EditIconButton from "../../components/CustomIconButtons/EditIconButton";
import ClearIconButton from "../../components/CustomIconButtons/ClearIconButton";
import { emptyPessoa } from "../../models/Pessoa";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function FieldPessoaComponent(props) {
    const { disabled, pessoa, callback, error, onlySearch } = props;
    const inputClasses = useStyles();
    const classes = fichaStyles();
    const [openCadastro, setOpenCadastro] = React.useState(false);
    const [openConsulta, setOpenConsulta] = React.useState(false);

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
        <div>
            <Paper elevation={1} component="form" className={inputClasses.root}>
                <PersonIcon />
                <FormControl fullWidth>
                    <InputBase
                        disabled={disabled}
                        fullWidth={true}
                        value={pessoa != null ? pessoa.nome : ""}
                        readOnly={true}
                        className={classes.input}
                        error={error != null ? !error.valido : false}
                        placeholder="Selecione uma pessoa"
                        inputProps={{ 'aria-label': 'busca por nome' }}
                    />
                    <FormHelperText id="component-helper-text">{error != null ? error.texto : ''}</FormHelperText>
                </FormControl>

                <Divider className={classes.divider} orientation="vertical" />
                {(onlySearch != null || pessoa == null || pessoa === emptyPessoa) && (
                    <SearchIconButton
                        disabled={disabled}
                        tooltip="Buscar por uma Pessoa"
                        onClick={handleShowConsulta} />
                )}

                {onlySearch == null && (
                    (pessoa == null || pessoa === emptyPessoa) ? (
                        <AddIconButton
                            disabled={disabled}
                            tooltip="Adicionar uma Pessoa"
                            onClick={handleShowCadastro} />
                    ) : (
                        <React.Fragment>
                            <EditIconButton
                                disabled={disabled}
                                tooltip="Alterar dados da Pessoa"
                                onClick={handleShowCadastro} />
                            <ClearIconButton
                                disabled={disabled}
                                tooltip="Limpar pessoa"
                                onClick={() => callback(null)} />
                        </React.Fragment>
                    )
                )}
            </Paper>

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
        </div>
    );
}