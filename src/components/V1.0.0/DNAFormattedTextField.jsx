import React from 'react';
import InputMask from 'react-input-mask';
import DNATextfield from './DNATextfield';

export default function DNAFormattedTextField(props) {
    const { label, fullWidth } = props;

    return (
        <InputMask
            {...props}
        >
            <DNATextfield
                label={label}
                fullWidth={fullWidth}
            />
        </InputMask>
    );
}