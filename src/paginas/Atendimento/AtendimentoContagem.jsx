import React from 'react';
import { Grid } from '@material-ui/core';
import AtendimentoService from '../../services/AtendimentoService';
import CustomCircularMonitor from '../../components/CustomFields/CustomCircularMonitor';

export default function AtendimentoContagem(props) {
    const { rowCount, unidadeAtendimentoId } = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        AtendimentoService.getAtendimentoListarContagem(unidadeAtendimentoId)
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