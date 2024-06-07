import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);


//----------------------------------------ML Model-----------------------------------------------------
async function query2(prompt) {
  //console.log(data)
  const response = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: prompt,
    parameters: {
      max_length: 50
    }
  })
  //console.log("Here is prompt I got under the function: ", prompt);
  return response;
}



// ML Model 2
async function query(prompt) {
  //console.log(data)
	const response = await hf.textToImage({
        inputs: `${prompt}/ hybrid,/ highly detailed,/ photorealistic, /sci-fi [featured on DeviantArt]`,
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        parameters: {
          negative_prompt: 'blurry',
          num_inference_steps: 70,
          guidance_scale: 8.5,
          seed: 1780,
          width: 512,
          height: 512,
        }
      })
      return response;
}


app.post("/api/sendPrompt", (req, res) => {
  const { promptText, artStyles } = req.body;

  console.log(promptText);
  
  query(promptText).then((response) => {
    const imageURL = URL.createObjectURL(response);
    console.log("Response generated: ", imageURL);
    res.status(200).json({ message: "Data received successfully"});
  }).catch((error) => {
    console.error("Error processing query:", error);    
    res.status(500).json({ message: "Error processing request" });
  });

  

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
