// this is the part for OpenAI as a chat response thing

// const { Configuration, OpenAIApi } = require("openai");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const token = process.env.API_TOKEN;
// console.log(token);
// const configuration = new Configuration({ apiKey: token });
// const openai = new OpenAIApi(configuration);

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.post("/message", (req, res) => {
//   const response = openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: req.body.prompt,
//     temperature: 0,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     max_tokens: 1024,
//   });
//   response.then((data) => {
//     console.log(data);
//     res.send({ message: data.data.choices[0].text });
//   });
// });

// app.listen(3000, () => {
//   console.log("listening on port 3000");
// });

// this is the part for Anthropic to make the same completion styled Endpoint :->
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { AI_PROMPT, Client, HUMAN_PROMPT } = require("@anthropic-ai/sdk");
const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
}
const client = new Client(apiKey);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/message", (req, res) => {
  console.log("within post req");
  const userQuestion = req.body.prompt;
  const prompting = "\n\nHuman: " + userQuestion + "\n\nAssistant:";
  console.log(
    "-----\n" + userQuestion + "\n--XXXXX--\n" + prompting + "\n----\n"
  );

  const response = client
    .complete({
      prompt: prompting,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 200,
      model: "claude-v1",
    })
    .then((completion) => {
      console.log("completion will be seen below --- > ");
      console.log(completion.completion);
      res.send({ message: completion.completion });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
