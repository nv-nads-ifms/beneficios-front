import React from 'react';
import NumberFormat from "react-number-format";

import { Facebook, LinkedIn, Mail, PermDeviceInformation, Phone } from '@mui/icons-material';

const normalizeInput = (value, previousValue) => {
    const onlyNums = value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 10) {
        return onlyNums;
    } else if (onlyNums.length === 11) {
        const number = onlyNums.replace(
            /(\d{3})(\d{4})(\d{4})/,
            '($1) $2-$3'
        );
        return number;
    } else if (onlyNums.length === 12) {
        const number = onlyNums.replace(
            /(\d{3})(\d{5})(\d{4})/,
            '($1) $2-$3'
        );
        return number;
    }
};

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function ccyFormat(num) {
    let n = 0;
    if (!isNaN(num)) {
        n = Number(num);
    }
    return (
        <NumberFormat
            value={n.toFixed(2)}
            displayType={'text'}
            thousandSeparator="."
            decimalSeparator=","
            isNumericString={true}
            decimalScale={2}
            prefix={'R$ '} />
    );
}

function dataURLtoFile(imageBase64, filename) {
    var arr = imageBase64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

function convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

const ChipIcon = (type) => {
    const text = type.toLowerCase();
    if (text.indexOf('mail') !== -1) {
        return <Mail />;
    } else if (text.indexOf('fone') !== -1) {
        return <Phone />
    } else if (text.indexOf('celular') !== -1) {
        return <PermDeviceInformation />
    } else if (text.indexOf('linked') !== -1) {
        return <LinkedIn />
    } else if (text.indexOf('face') !== -1) {
        return <Facebook />
    }
}

export {
    normalizeInput, validateEmail, ccyFormat,
    dataURLtoFile, convertImgToBase64URL, ChipIcon
};