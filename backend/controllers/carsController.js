async function getAllCars (httpRequest) {
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'TEST'
        }
    }
}

export { getAllCars }
