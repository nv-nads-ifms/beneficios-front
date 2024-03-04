import React from 'react';
import { Grid } from '@material-ui/core';
import CustomCircularMonitor from '../../../components/CustomFields/CustomCircularMonitor';
import DataService from '../../../api/services/DataServices';

const dataService = new DataService('/prontuarios');

export default function ProntuarioContagem(props) {
    const { rowCount, unidadeAtendimentoId } = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const value = (!!unidadeAtendimentoId ? unidadeAtendimentoId : 0);
        dataService.getBy('contagem/'+value)
            .then(data => {
                setData(data);
            })
    }, [rowCount, unidadeAtendimentoId]);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {data.map(obj => {
                    return (
                        <Grid item md={4} sm={12}>
                            <CustomCircularMonitor
                                status={obj.status}
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