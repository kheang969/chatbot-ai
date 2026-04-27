const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

/* HOME ROUTE (fixes Cannot GET /) */
app.get("/", (req, res) => {
  res.send("🤖 Chatbot server is running");
});

/* CHAT API */
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "phi3",
      prompt: userMessage,
      stream: false
    });

    res.json({
      reply: response.data.response
    });

  } catch (err) {
    // fallback message for demo
    res.json({
      reply: "🤖 Demo mode: AI is running locally on developer's computer."
    });
  }
});

/* IMPORTANT FOR RENDER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
