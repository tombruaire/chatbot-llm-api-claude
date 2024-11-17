const { Anthropic } = require('@anthropic-ai/sdk');
const express = require('express')
const app = express()
const port = 3001
const anthropic = new Anthropic({
  apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
});


app.get('/', (req, res) => {
  res.send('Appel de l\'api de Claude')
})

async function   
 sendMessage() {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }],
  });
  console.log(msg);   

}

sendMessage(); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
