import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";
import { formContext } from "../../../contexts/formContext";
import DNABaseDialogForm from "./DNABaseDialogForm";
import DNADefaultDialogListForm from "./DNADefaultDialogListForm";
import { DNAStatus } from "../../../api/utils/constants";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    editable: false,
  },
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
    minWidth: 100,
    editable: false,
  },
];

function DNABaseDialogListForm(props) {
  const { formtitle, dialog_form_title, datasourceUrl } = props;

  /* Atributos utilizados para realizar a filtragem da consulta */
  const [nome, setNome] = React.useState("");

  /* Atributos de controle do formulário modal */
  const [open, setOpen] = React.useState(false);
  const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
  /* Atributo de controle do ID do objeto de negócio a ser manipulado */
  const [formId, setFormId] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
    setFormId(-1);
  };

  return (
    <formContext.Provider value={{
      setFormId: setFormId,
      setDataControl: setDataControl,
      setOpen: setOpen
    }}>
      <DNADefaultDialogListForm
        {...props}
        formtitle={formtitle}
        filterparams={{ nome: nome }}
        columns={columns}

        handleeditnome={setNome}
        handlenome={nome}
      >
        <Grid container spacing={0} sx={{ mt: 1 }}>
          <Grid item xs={12} container direction={'row'} justifyContent={'flex-start'}>
            <TextField
              id="nome"
              value={nome}
              label="Buscar por nome"
              variant='outlined'
              fullWidth
              onChange={(e) => setNome(e.target.value)} />
          </Grid>
        </Grid>
      </DNADefaultDialogListForm>

      <DNABaseDialogForm
        id_value={formId}
        datacontrol={dataControl}
        text={dialog_form_title}
        on_change_datacontrol={setDataControl}
        open={open}
        on_close_func={handleClose}
        data_source_url={datasourceUrl}
      />
    </formContext.Provider>
  );
}

DNABaseDialogListForm.propTypes = {
  formtitle: PropTypes.string.isRequired,
  dialog_form_title: PropTypes.string.isRequired,
  datasourceUrl: PropTypes.string.isRequired,
};

export default DNABaseDialogListForm;
