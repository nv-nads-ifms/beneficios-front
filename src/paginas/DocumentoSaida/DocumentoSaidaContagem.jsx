import React from 'react';
import { Grid } from '@material-ui/core';
import CustomCircularMonitor from '../../components/CustomFields/CustomCircularMonitor';
import DocumentoSaidaService from '../../services/DocumentoSaidaService';

export default function DocumentoSaidaContagem(props) {
    const { rowCount } = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        DocumentoSaidaService.getDocumentoSaidaListarContagem()
            .then(resp => resp.data)
            .then(data => {
                setData(data);
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