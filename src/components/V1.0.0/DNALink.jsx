import React from 'react';
import Link from '@mui/material/Link';

export default function DNALink(props) {
    const { children } = props;

    return (
        <Link
            variant="body2"
            {...props}>
            {children}
        </Link>
    );
}