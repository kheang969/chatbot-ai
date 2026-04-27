const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

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
    res.json({
      reply: "Error: cannot connect to Ollama"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
