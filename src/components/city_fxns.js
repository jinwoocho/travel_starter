export function citySelect(city) {
    let location = '';
    switch(city) {
        case 'Los Angeles':
        case 'LA':
            location = 'Los Angeles';
            break;
        case 'Madrid':
        case 'Spain':
            location = 'Madrid';
            break;
        default:
            location = 'Los Angeles';
            break;
    }
    return location;
}