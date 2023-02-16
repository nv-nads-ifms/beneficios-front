import React from "react";
import { Divider, Paper, InputBase, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
import { fichaStyles } from "../../components/UI/GlobalStyle";
import SearchIconButton from "../../components/CustomIconButtons/SearchIconButton";
import LogradouroListagemModal from "./LogradouroListagemModal";
import ClearIconButton from "../../components/CustomIconButtons/ClearIconButton";
import AddIconButton from "../../components/CustomIconButtons/AddIconButton";
import LogradouroCadastroModal from "./LogradouroCadastroModal";
import { emptyLogradouro } from "../../models/Endereco";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function FieldLogradouroComponent(props) {
    const { logradouro, callback, error, onlySearch } = props;
    const inputClasses = useStyles();
    const classes = fichaStyles();
    const [openConsulta, setOpenConsulta] = React.useState(false);
    const [openCadastro, setOpenCadastro] = React.useState(false);

    const handleShowConsulta = () => {
        setOpenConsulta(true);
    };

    const handleCloseConsulta = () => {
        setOpenConsulta(false);
    };

    const handleShowCadastro = () => {
        setOpenCadastro(true);
    };

    const handleCloseCadastro = () => {
        setOpenCadastro(false);
    };

    return (
        <div>
            <Paper elevation={1} square={true} variant="outlined" component="form" className={inputClasses.root} >
                <FormControl fullWidth>
                    <InputBase
                        fullWidth={true}
                        value={logradouro != null ? logradouro.nome : ""}
                        readOnly={true}
                        className={classes.input}
                        error={error != null ? !error.valido : false}
                        placeholder="Buscar um Logradouro"
                        inputProps={{ 'aria-label': 'busca por Nome' }}
                    />
                    <FormHelperText id="component-helper-text">{error != null ? error.texto : ''}</FormHelperText>
                </FormControl>

                <Divider className={classes.divider} orientation="vertical" />
                {(onlySearch != null || logradouro == null || logradouro === emptyLogradouro) && (
                    <SearchIconButton
                        tooltip="Buscar por um Logradouro"
                        onClick={handleShowConsulta} />
                )}

                {onlySearch == null && (
                    (logradouro == null || logradouro === emptyLogradouro) ? (
                        <AddIconButton
                            tooltip="Adicionar um Logradouro"
                            onClick={handleShowCadastro} />
                    ) : (
                        <React.Fragment>
                            <ClearIconButton
                                tooltip="Limpar Logradouro"
                                onClick={() => callback(null)} />
                        </React.Fragment>
                    )
                )}
            </Paper>

            <LogradouroCadastroModal
                id={logradouro != null ? logradouro.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />

            <LogradouroListagemModal
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
        </div>
    );
}