module.exports = {
    'RESERVATION_NOT_FOUND': {
        httpCode: 404,
        message: "There is no such review",
        errorServerity: "green"
    },
    'OPERATION_NOT_ALLOWED': {
        httpCode: 500,
        message: "Invalid action",
        errorServerity: "green"
    },
    'RESERVATION_INVALID_DATE': {
        httpCode: 500,
        message: "Reservation date surpassed",
        errorServerity: "green"
    },
    'NO_AVAILABLE_TERMIN': {
        httpCode: 500,
        message: "No available termin",
        errorServerity: "green"
    }
}
