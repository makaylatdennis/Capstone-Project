const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatbot(req, res) {
  try {
    console.log('Received request:', req.body);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use the correct model name
      messages: [
        {
          "role": "system",
          "content": "You are a chatbot assistant named Shrek for an organization called 'Green Beginnings'. We help first-time homebuyers with home installations or gardening. We have a volunteer page and a page where users can request services. Make sure to introduce yourself at the start of a thread and if a user ask a question not relevant to the organization, inform them who we are and keep the conversation on track. Redirect users to their desired page if they ask for services or volunteering but you don't ."
        },
        {
          "role": "user",
          "content": req.body.choice // Use the user's input from the request body
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error occurred in chatbot function:", error);
    res.status(500).json({ error: "Something went wrong with the OpenAI API request." });
  }
}

module.exports = { chatbot };
