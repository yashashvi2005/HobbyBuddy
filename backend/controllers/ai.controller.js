import axios from 'axios';
import env from 'dotenv';

env.config();

export const answerHobbyQuestion = async (req, res) => {
  const { hobby, question } = req.body;

  if (!hobby || !question) {
    return res.status(400).json({ success: false, message: "Hobby and question are required" });
  }

  const prompt = `
You are an expert on the hobby: "${hobby}".

Answer this question clearly and concisely:

Question: ${question}

Answer:
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!answer) {
      return res.status(500).json({ success: false, message: "No answer returned from AI" });
    }

    return res.json({ success: true, answer });

  } catch (err) {
    console.error('Gemini API error:', err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Failed to get answer from AI' });
  }
};
