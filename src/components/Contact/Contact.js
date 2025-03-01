export const normalizePhoneNumber = number => {
    number = number.match(/\d/gi).join('');
    switch (number.length) {
        case 7: return number.replace(/^(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
        case 10: return number.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4');
        case 11: return number.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1($2)-$3-$4-$5');
        default: number;
    }
}