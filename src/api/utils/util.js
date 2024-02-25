
export const createUtilFunctions = () => {

    const setFieldValue = (fieldname, value, setterFunction, object) => {
        setterFunction({
            ...object,
            [fieldname]: value
        });
    }

    const extractEventValue = (e, newValue) => {
        let t = e.target;
        let value = newValue ? newValue : t.value;
        let fieldname = t.id.split('-')[0];
        if (fieldname === null || fieldname === undefined || fieldname === '') {
            fieldname = t.name;
        }
console.log(fieldname)
        if (t.type === "checkbox") {
            value = t.checked;
        } else if (t.type === "file") {
            let file = t.files[0];
            value = {
                id: '',
                nome: file.name,
                tipo: file.type,
                data: file,
            };
        }
        return { value, fieldname };
    }

    const handleChangeInputComponent = (e, newValue, setterFunction, object) => {
        const { value, fieldname } = extractEventValue(e, newValue);

        setFieldValue(fieldname, value, setterFunction, object);
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

    function convertToParams(object) {
        let params = {};
        Object.entries(object).map(([k, v]) => {
            params[`${k}`] = v;
            return v;
        });
        return params;
    }

    function formatString(mask, number) {
        var s = '' + number, r = '';
        for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
            r += mask.charAt(im) === 'X' ? s.charAt(is++) : mask.charAt(im);
        }
        return r;
    }

    function not(a, b) {
        return a.filter((value) => b.map(obj => obj.id).indexOf(value.id) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.map(obj => obj.id).indexOf(value.id) !== -1);
    }

    function union(a, b) {
        return [...a, ...not(b, a)];
    }

    return {
        setFieldValue,
        extractEventValue,
        handleChangeInputComponent,
        dataURLtoFile,
        convertImgToBase64URL,
        convertToParams,
        formatString,
        not,
        intersection,
        union
    };
}

export const {
    setFieldValue,
    extractEventValue,
    handleChangeInputComponent,
    dataURLtoFile,
    convertImgToBase64URL,
    convertToParams,
    formatString,
    not,
    intersection,
    union
} = createUtilFunctions();
