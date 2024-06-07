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

//--------------------------------ML MODEL-------------------------------------------------


// ML MODEL 1
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

// ML MODEL 2
async function query2(prompt, artStyles) {
  const response = await hf.textToImage({
    inputs: `${prompt} ${artStyles} [featured on DeviantArt]`,
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
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

// ML MODEL 3
async function query3(prompt, artStyles) {
  const response = await hf.textToImage({
    inputs: `${prompt} ${artStyles} [award-winning on CGSociety]`,
    model: 'stabilityai/stable-diffusion-xl-base-1.0',
    parameters: {
      negative_prompt: 'noisy',
      num_inference_steps: 80,
      guidance_scale: 8.7,
      seed: 1950,
      width: 512,
      height: 512,
    }
  });
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}


// ML MODEL 4
async function query4(prompt, artStyles) {
  const response = await hf.textToImage({
    inputs: `${prompt} ${artStyles} [featured on DeviantArt]`,
    model: 'stabilityai/stable-diffusion-xl-base-1.0',
    parameters: {
      negative_prompt: 'noisy',
      num_inference_steps: 90,
      guidance_scale: 9.5,
      seed: 1990,
      width: 512,
      height: 512,
    }
  });
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}




app.post("/api/imgGen1", async (req, res) => {
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

app.post("/api/imgGen2", async (req, res) => {
  const { promptText, artStyles } = req.body;

  try {
    const imageBuffer = await query2(promptText, artStyles);
    res.setHeader("Content-Type", "image/jpeg"); 
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.post("/api/imgGen3", async (req, res) => {
  const { promptText, artStyles } = req.body;

  try {
    const imageBuffer = await query3(promptText, artStyles);
    res.setHeader("Content-Type", "image/jpeg"); 
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});


app.post("/api/imgGen4", async (req, res) => {
  const { promptText, artStyles } = req.body;

  try {
    const imageBuffer = await query4(promptText, artStyles);
    res.setHeader("Content-Type", "image/jpeg"); 
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
