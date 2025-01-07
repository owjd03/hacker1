async function sendData(data) {
    try {
        const response = await fetch('http://localhost:3000/api/submit-contact', { // Include '/api' prefix
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response.json(); // Expect a JSON response
    } catch (error) {
        console.error('Failed to send data:', error);
        return { message: 'Failed to send data' };
    }
}

export default sendData;