import React from 'react'
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import DataService from '../../api/services/DataServices';

const dataService = new DataService('/perfis');

export default function CheckboxPerfil(props) {
    const { values, callback, read } = props;
    const [perfis, setPerfis] = React.useState([]);

    React.useEffect(() => {
        dataService.getDataList()
            .then(r => setPerfis(r.data))
    }, [setPerfis]);

    const handleToggle = (value) => () => {
        const currentIndex = values.map(p => p.id).indexOf(value.id);

        if (currentIndex === -1) {
            values.push(value);
        } else {
            values.splice(currentIndex, 1);
        }
        
        callback(values);
    };

    return (
        <List
            dense
            component="div"
            role="list"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Perfis de Acesso
                </ListSubheader>
            }
        >
            {perfis.map((value) => {
                const labelId = `transfer-list-all-item-${value.id}-label`;

                return (
                    <ListItem key={value.id} role="listitem" onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={values.map(obj => obj.id).indexOf(value.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                disabled={!read}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.nome} />
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    )
}