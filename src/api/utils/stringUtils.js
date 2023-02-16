const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase()
}

const capitalizeTwoLetters = (s) => {
    if (typeof s !== 'string') return '';
    let S = s.split(' ');

    return capitalize(S[0]) + (S.length > 1 ? capitalize(S[S.length]) : '');
}

const extractCapitalizeLetters = (s) => {
    if (typeof s !== 'string') return '';
    let S = s.split(' ');
    const capitalize = S.length > 1;
    // não capitaliza se for apenas 1 palavra
    if (!capitalize)
        return s;

    let letters = '';
    for (let i = 0; i < S.length; i++) {
        // ignora preposiçao 'de'
        if (S[i].length > 2) {
            letters += S[i].charAt(0).toUpperCase();
        }
    }
    return letters;
}

const firstName = (s) => {
    if (typeof s !== 'string') return '';
    let S = s.split(' ');
    return S[0];
}

export { capitalizeTwoLetters, extractCapitalizeLetters, firstName }