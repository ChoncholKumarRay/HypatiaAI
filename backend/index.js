import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(cors());
app.use(bodyParser.json());

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

// Filtering promptText
const filterPromptText = (promptText) => {
  const randomStrings = [
    "Imagen en ilustración dibujo digital de una naranja y flores de azhar , que ddiga la frase General Teràn, 3d render, cinematic, vibrant, fashion, photo, poster, illustration, typography, conceptual art, dark fantasy, anime, product, wildlife photography, ukiyo-e, painting, graffiti, architecture, portrait photography",
    "In the dynamic impactful Anime style with special effects: a woman wearing Palestine Kuffiyah Hijab (Palestine Kuffiyah Hijab must be in a uniform grid of alternating black and white squares, white ground) and Abaya (midnight black, gracefully flowing). She stands atop a skyscraper in a futuristic cityscape at dusk, neon lights reflecting off her attire, with holographic billboards and flying cars adding a high-tech dynamic feel., anime, cinematic, vibrant, illustration",
    "A striking and intricate illustration of a woman with long, cascading hair, covering a portion of her face with her delicately patterned hand. Her attire is adorned with vibrant geometric and abstract designs, creating a mesmerizing visual pattern. The background is a soft blend of warm and cool colors, adding depth to the overall composition. The woman exudes an air of mystery and allure, captivating the viewer's attention with her enigmatic presence.",
    "A captivating anime-style illustration of a regal female figure, her vibrant red hair flowing in the wind as she stands proudly among the grandeur of a Gothic cathedral. Her fiery phoenix-like wings, a blend of fiery orange and deep red, are intricately adorned with golden details, adding a touch of opulence to her divine presence. Clad in a white and gold ensemble with golden armor-like pieces on her arms and waist, she exudes a powerful aura. The fire beneath her, a bed of flames emanating from the ground upwards, showcases her fiery nature. The celestial statues and the intricate architecture of the cathedral provide a breathtaking backdrop, further emphasizing her majestic and otherworldly beauty., anime",
    "A captivating anime-style illustration of an elegant woman, adorned in a flowing, vibrant gown that captures the viewer's attention. Her long, cascading hair frames her enigmatic smile, while she stands gracefully against the backdrop of a serene, star-studded night sky. In the distance, a crescent moon and distant galaxies are visible, adding to the dreamy and ethereal atmosphere of the scene., illustration, anime"
  ];

  if (/rawnak/i.test(promptText)) {
    const randomIndex = Math.floor(Math.random() * randomStrings.length);
    return randomStrings[randomIndex];
  }

  return promptText;
};


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
    const imageBuffer = await query4(filterPromptText(promptText), artStyles);
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
