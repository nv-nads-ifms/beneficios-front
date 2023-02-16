import React from 'react';

import CondicaoDeMoradiaService from '../../services/CondicaoDeMoradiaService';
import SimpleLoadTable from '../CustomTable/SimpleLoadTable';
import CustomTextField from '../CustomFields/CustomTextField';
import AddButton from '../CustomButtons/AddButton';
import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';

const columnsNames = [
    { id: 'descricao', label: 'Descrição' },
];

export default function CondicaoMoradia() {
    const [descricao, setDescricao] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const idColumnName = 'id';

    React.useEffect(() => {
        CondicaoDeMoradiaService.getCondicoesDeMoradia()
            .then(r => r.json())
            .then((data) => {
                setRows(data.content);
            })
    }, [descricao]);

    const handleRemove = (idValue) => {
        CondicaoDeMoradiaService.deleteCondicaoDeMoradia(idValue)
            .then(() => {
                setRows(rows.filter(row => row[idColumnName] !== idValue));
            });
    }

    const submitData = (event) => {
        event.preventDefault();

        CondicaoDeMoradiaService.saveCondicaoDeMoradia({ descricao: descricao })
            .then(r => r.json())
            .then(data => {
                // setRows([...rows, data]);
                setDescricao("");
            });
    }

    return (
        <Card>
            <CardContent>
                <Typography align='center' component="h5" variant="h5">
                    Condições de Moradia
                </Typography>
                <form onSubmit={submitData}>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >

                        <Grid item xc={8}>
                            <CustomTextField
                                id="descricao"
                                label="Condição de Moradia"
                                value={descricao}
                                placeholder={"Digite uma condição de moradia"}
                                shrink={false}
                                onChangeHandler={(event) => setDescricao(event.target.value)}
                            />
                        </Grid>
                        <Grid item xc={4}>
                            <AddButton />
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <CardActions disableSpacing>
                <SimpleLoadTable
                    rows={rows}
                    columns={columnsNames}
                    idColumnName={idColumnName}
                    handleRemove={handleRemove}
                />
            </CardActions>
        </Card>
    );
}
