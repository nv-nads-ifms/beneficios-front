import React from 'react';
import { Status } from '../../../../api/utils/constants';
import ChipStatus from '../../../../components/CustomButtons/ChipStatus';

function MoradiaStatusColumn(params) {
    const { row } = params;
    const isOcupado = (row.dataSaida == null || row.dataSaida === '');
    let label;
    let status;
    if (isOcupado) {
        label = 'Ocupado';
        status = Status.ATIVO;
    } else {
        label = 'Desocupado';
        status = Status.INATIVO;
    }
    return (
        <ChipStatus label={label} status={status} />
    );
}

export default MoradiaStatusColumn;