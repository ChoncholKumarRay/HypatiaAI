import { HfInference } from "@huggingface/inference";
const hf = new HfInference('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');
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//----------------------------------------ML Model-----------------------------------------------------
async function query(prompt) {
  //console.log(data)
  const response = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: prompt,
    parameters: {
      max_length: 100
    }
  })
  //console.log("Here is prompt I got under the function: ", prompt);
  return response;
}


app.post("/api/sendPrompt", (req, res) => {
  const { promptText, artStyles } = req.body;
  
  console.log("Received promptText:", promptText);
  console.log("Received artStyles:", artStyles);

  // Process the data received from the frontend as needed

  query(promptText).then((response) => {
      // Use summary
      console.log("Here is the summary of the text: ",response["summary_text"]);
  });

  res.status(200).json({ message: "Data received successfully" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
