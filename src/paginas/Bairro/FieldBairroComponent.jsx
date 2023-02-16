import React from "react";
import { Divider, Paper, InputBase, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
import { fichaStyles } from "../../components/UI/GlobalStyle";
import SearchIconButton from "../../components/CustomIconButtons/SearchIconButton";
import BairroListagemModal from "./BairroListagemModal";
import ClearIconButton from "../../components/CustomIconButtons/ClearIconButton";
import AddIconButton from "../../components/CustomIconButtons/AddIconButton";
import BairroCadastroModal from "./BairroCadastroModal";
import { emptyBairro } from "../../models/Endereco";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function FieldBairroComponent(props) {
    const { bairro, callback, error, onlySearch } = props;
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
                        value={bairro != null ? bairro.nome : ""}
                        readOnly={true}
                        className={classes.input}
                        error={error != null ? !error.valido : false}
                        placeholder="Buscar um Bairro"
                        inputProps={{ 'aria-label': 'busca por Nome' }}
                    />
                    <FormHelperText id="component-helper-text">{error != null ? error.texto : ''}</FormHelperText>
                </FormControl>

                <Divider className={classes.divider} orientation="vertical" />
                {(onlySearch != null || bairro == null || bairro === emptyBairro) && (
                    <SearchIconButton
                        tooltip="Buscar por um Bairro"
                        onClick={handleShowConsulta} />
                )}

                {onlySearch == null && (
                    (bairro == null || bairro === emptyBairro) ? (
                        <AddIconButton
                            tooltip="Adicionar um Bairro"
                            onClick={handleShowCadastro} />
                    ) : (
                        <React.Fragment>
                            <ClearIconButton
                                tooltip="Limpar Bairro"
                                onClick={() => callback(null)} />
                        </React.Fragment>
                    )
                )}
            </Paper>

            <BairroCadastroModal
                id={bairro != null ? bairro.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />

            <BairroListagemModal
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
        </div>
    );
}