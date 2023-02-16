import React from 'react';
import NumberFormat from 'react-number-format';

export default function CustomInteger(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            thousandSeparator='.'
            decimalSeparator=','
            thousandsGroupStyle='thousand'
            allowNegative={false}
            displayType='input'
            type='text'
            isNumericString
            onValueChange={(values) => {
                onChange({
                    target: {
                        id: props.id,
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
        />
    );
}