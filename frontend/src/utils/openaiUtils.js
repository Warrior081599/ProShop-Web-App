import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const getProductRecommendations = async (query) => {
  //const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiKey =
    import.meta.env.REACT_APP_OPENAI_API_KEY ||
    process.env.REACT_APP_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Recommend similar products for: ${query}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const recommendations = response.data.choices[0].message.content;
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return "Sorry, unable to fetch recommendations at the moment.";
  }
};
