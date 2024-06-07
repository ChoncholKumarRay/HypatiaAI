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

async function query1(prompt, artStyles) {
  const response = await hf.textToImage({
    inputs: `${prompt} ${artStyles} [trending on artstation]`,
    model: 'stabilityai/stable-diffusion-xl-base-1.0',
    parameters: {
      negative_prompt: 'blurry',
      num_inference_steps: 50,
      guidance_scale: 7.5,
      seed: 1234,
      width: 512,
      height: 512,
    }
  });

  // Convert response to arrayBuffer and then to Buffer
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log("Prompt1: ", `${prompt} ${artStyles} [trending on artstation]`);
  return buffer;
}

app.post("/api/sendPrompt", async (req, res) => {
  const { promptText, artStyles } = req.body;

  try {
    const imageBuffer = await query1(promptText, artStyles);
    res.setHeader("Content-Type", "image/jpeg"); // Set the correct content type
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
