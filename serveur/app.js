const { Anthropic } = require('@anthropic-ai/sdk');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const anthropic = new Anthropic({
  apiKey: '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',
});

app.post('/api/claude', async (req, res) => {
  try {
    console.log("Message reçu :", req.body.message);
    
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: req.body.message }],
      system: "You are a helpful AI assistant."
    });

    console.log("Réponse de Claude :", response);
    
    res.json({ response: response.content[0].text });
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Claude:", error);
    res.status(500).json({ error: "Erreur lors de l'appel à l'API Claude" });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`)
});