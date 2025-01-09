const OpenAI = require('openai'); // Import OpenAI SDK to interact with the API

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is set as an environment variable
});

const aiEval = async (req, res) => {
    try {
        const { userMessage } = req.body; // Extract the 'userMessage' field from the request body

        // Validate the user input to ensure a message is provided
        if (!userMessage) {
            return res.status(400).send({ error: 'User message is required' }); // Respond with a 400 status if input is missing
        }

        // Use OpenAI's API to generate a response from ChatGPT
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Specify the GPT model (update if using a different model)
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' }, // System message to define the assistant's behavior
                { role: 'user', content: userMessage }, // User message passed to the assistant
            ],
        });

        const aiResponse = completion.choices[0].message.content; // Extract the AI's response content

        // Send the AI's response back to the client
        res.status(200).send({ response: aiResponse });
    } catch (error) {
        console.error('Error in ChatGPT route:', error.message); // Log any errors that occur during processing

        // Respond with a 500 status and a generic error message in case of failure
        res.status(500).send({ error: 'Failed to process your request' });
    }
}

module.exports = aiEval;