import React from 'react';
import { Grid } from '@material-ui/core';
import CustomCircularMonitor from '../../components/CustomFields/CustomCircularMonitor';
import DataService from '../../api/services/DataServices';

const dataService = new DataService('/documento-entrada');

export default function DocumentoEntradaContagem(props) {
    const { rowCount } = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        dataService.getBy('contagem')
            .then(resp => {
                setData(resp.data);
            })
    }, [rowCount]);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {data.map(obj => {
                    return (
                        <Grid item lg={4} md={6} sm={12}>
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