const { Anthropic } = require('@anthropic-ai/sdk');
const express = require('express')
const app = express()
const port = 3001
const anthropic = new Anthropic({
  apiKey: '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',
});


app.get('/', async (req, res) => {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello, Claude" }],
    });
    console.log(msg);
    res.send(`Appel de l'api de Claude : ${msg.content}`);
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Claude:", error);
    res.status(500).send("Erreur lors de l'appel à l'API Claude");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
