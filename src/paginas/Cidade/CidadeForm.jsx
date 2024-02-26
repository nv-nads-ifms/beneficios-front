import React from 'react';
import { Grid, TextField } from '@mui/material';
import { handleChangeInputComponent } from '../../api/utils/util';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

const emptyCidade = {
    ...emptyBaseObject,
    uf: null
};

export default function CidadeForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [cidade, setCidade] = React.useState(emptyCidade);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setCidade, cidade);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: cidade,
            setObject: setCidade,
            emptyObject: emptyCidade
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados da Cidade"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                maxWidth={'md'}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            label="Nome"
                            value={cidade.nome}
                            placeholder="Digite o nome da Cidade"
                            autoFocus={true}
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="uf"
                            path="ufs"
                            input_label="Unidade Federativa"
                            value={cidade.uf}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}