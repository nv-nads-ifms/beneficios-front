import React from 'react';
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ArrowForwardButton(props) {
    const { disabled, onClickEvent } = props;
    return (
        <IconButton
            disabled={disabled}
            onClick={onClickEvent}
            aria-label="move selected right">
            <ArrowForwardIosIcon />
        </IconButton>
    );
}