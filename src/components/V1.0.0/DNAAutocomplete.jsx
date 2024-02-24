import React from "react";
import PropTypes from 'prop-types';
import { formContext } from "../../contexts/formContext";
import { Autocomplete, CircularProgress, InputAdornment, TextField } from "@mui/material";
import DataService from "../../api/services/DataServices";
import AddIconButton from "../CustomIconButtons/AddIconButton";
import DNABaseDialogForm from "./forms/DNABaseDialogForm";
import { DNAStatus } from "../../api/utils/constants";

function DNAAutocomplete(props) {
    const { path, input_label, input_modal, input_modal_title, input_handle_modal } = props;

    /* Atributos de controle do formulário */
    const [openModal, setOpenModal] = React.useState(false);
    const [formId, setFormId] = React.useState(0);

    /* controle de edição do formulário */
    const dataControl = React.useMemo(() => {
        return props.disabled ? DNAStatus.VIEW : DNAStatus.EDIT;
    }, [props.disabled]);

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;


    const dataService = React.useMemo(() => {
        return new DataService(`/${path}`);
    }, [path]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await dataService.getDataList();

            if (active) {
                if (response.hasOwnProperty('status') && response.status === 404) {
                    setOptions([]);
                } else {
                    setOptions(response.data);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [formId, loading, dataService]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            // setDataControl: setDataControl,
            setOpen: setOpenModal
        }}>
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}

                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={input_label}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (props.startAdornment),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                    {input_modal != null && (
                                        <AddIconButton
                                            disabled={props.disabled}
                                            tooltip="Adicionar uma nova opção"
                                            onClick={input_handle_modal != null ? input_handle_modal : onShowCadastro} />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                {...props}
            />

            <DNABaseDialogForm
                id_value={formId}
                datacontrol={dataControl}
                text={input_modal_title}
                
                open={openModal}
                on_close_func={handleClose}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

DNAAutocomplete.propTypes = {
    path: PropTypes.string.isRequired,
    input_label: PropTypes.string.isRequired,
    input_modal: PropTypes.bool, 
    input_modal_title: PropTypes.string,
    input_handle_modal: PropTypes.func
};

export default DNAAutocomplete;