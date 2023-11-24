import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';

function ListComponent(props) {
    const { width, height, items, onToggleValue, checked } = props;
    return (
        <Paper sx={{
            width: width,
            height: height,
            overflow: 'auto'

        }}>
            <List dense component={'div'} role='list'>
                {items.map((item) => {
                    const labelId = `transfer-list-item-${item.id}-label`;

                    return (
                        <ListItem
                            key={item.id}
                            role='listitem'
                        >
                            <ListItemButton onClick={onToggleValue(item)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(item) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={item.nome} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

ListComponent.propTypes = {
    width: PropTypes.any.isRequired,
    height: PropTypes.any.isRequired,
    items: PropTypes.arrayOf(PropTypes.object.isRequired),
    onToggleValue: PropTypes.func.isRequired,
    checked: PropTypes.array.isRequired,
}

export default ListComponent;