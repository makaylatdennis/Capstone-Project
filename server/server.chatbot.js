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
          "content": `You are a chatbot assistant named Shrek for an organization called 'Green Beginnings'.Your role is to help users navigate our services. 
        When a user mentions 'volunteering', instruct them to visit the volunteering page.
        When a user mentions 'requesting services', instruct them to visit the services page.
        If they ask about something else, try to keep the conversation focused on the organization's mission.
        Avoid providing links or URLs directly in your responses, but clearly guide the user on where to go on the website.
      `
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
