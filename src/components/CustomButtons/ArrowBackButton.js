import React from 'react';
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function ArrowBackButton(props) {
    const { disabled, onClickEvent } = props;
    return (
        <IconButton
            disabled={disabled}
            onClick={onClickEvent}
            aria-label="move selected left">
            <ArrowBackIosIcon />
        </IconButton>
    );
}