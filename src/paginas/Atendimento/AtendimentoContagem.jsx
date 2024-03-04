import React from 'react';
import CustomCircularMonitor from '../../components/CustomFields/CustomCircularMonitor';
import DataService from '../../api/services/DataServices';
import { Grid } from '@mui/material';

const dataService = new DataService("/atendimentos");

export default function AtendimentoContagem(props) {
    const { rowCount, unidadeAtendimentoId } = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        dataService.getBy('contagem/'+unidadeAtendimentoId)
            .then(resp => {
                setData(resp.data);
            })
    }, [rowCount, unidadeAtendimentoId]);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {Array.isArray(data) && data.map(obj => {
                    return (
                        <Grid item lg={3} md={6} sm={12}>
                            <CustomCircularMonitor
                                status={obj.statusAtendimento}
                                total={obj.totalStatus}
                                percentual={obj.percentualStatus}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}