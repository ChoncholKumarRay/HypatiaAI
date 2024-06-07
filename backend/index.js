import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

//----------------------------------ML MODEL---------------------------------------------------------

// ML Model 1
async function query1(prompt) {
  //console.log(data)
	const response = await hf.textToImage({
        // inputs: `${prompt}/fantasy, /detailed, /photo realistic, /sci-fi, /digital painting, /watercolor, /oil painting, /cyberpunk, /steampunk, /surreal, /abstract, /hybrid [trending on artstation]`,
        inputs: `${prompt}/ hybrid,/ highly detailed,/ photorealistic, /sci-fi [trending on artstation]`,
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        parameters: {
          negative_prompt: 'blurry',
          num_inference_steps: 50,
          guidance_scale: 7.5,
          seed: 1234,
          width: 512,
          height: 512,
        }
      })
      return response;
}

// ML Model 2
async function query2(prompt) {
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
  });
  return response;
}

app.post("/api/sendPrompt", async (req, res) => {
  const { promptText } = req.body;

  try {
    const response = await query1(promptText);
    const imageURL1 = URL.createObjectURL(response); 
    res.status(200).json({img1:imageURL1});
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
