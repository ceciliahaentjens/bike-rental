const AVAILABLE_STATUS = ['AVAILABLE', 'LOST', 'RENT', 'REPAIR'];

function getReadableStatus (status) {
    switch (status) {
        case 'AVAILABLE':
            return 'Disponible'
        case 'LOST':
            return 'Perdu';
        case 'RENT':
            return 'En location';
        case 'REPAIR':
            return 'En réparation';
        default:
            return status;
    }
}

function isAvailable(status) {
    return status === 'AVAILABLE';
}

module.exports = {
    AVAILABLE_STATUS,
    getReadableStatus,
    isAvailable
}