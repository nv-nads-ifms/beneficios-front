import React from 'react';
import InputMask from 'react-input-mask';

// const onlyNumbers = (str) => str.replace(/[^\d]/g, '');

export default function MaskedInput(props) {
    const { value, mask, onChange, children, ...others } = props;

    // const handleChange = (event) => {
    //     const value = event.target.value;

    //     if (mask === '')
    //         onChange(event);
    //     else
    //         onChange({
    //             ...event,
    //             target: {
    //                 ...event.target,
    //                 value: onlyNumbers(value),
    //             }
    //         });
    // }

    return (
        <InputMask
            mask={mask}
            maskChar=" "
            value={value}
            onChange={onChange}
            formatChars={{
                '9': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9@_.-]'
            }}
            {...others}
        >
            {children}
        </InputMask>
    );
}