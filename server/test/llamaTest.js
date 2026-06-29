import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

// 1️⃣ Initialize Groq LLaMA client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2️⃣ Prepare your mining/emission/sink test data
const userData = {
  coalProduction: 1200,
  transportCapacity: 800,
  efficiency: 55,
  methaneRate: 2000,
  emissionsTonsPerDay: 45,
  carbonOffsetTonsPerDay: 1.2
};


// 3️⃣ Build prompt dynamically
const prompt = `
You are an expert mining sustainability analyst AI.
Analyze the following mining operation and generate 4 recommendations.

Mining Data:
- Coal Production: ${userData.coalProduction} tons/day
- Transport Capacity: ${userData.transportCapacity} tons/day
- Equipment Efficiency: ${userData.efficiency}%
- Methane Capture Rate: ${userData.methaneRate} m3/day
- Total Emissions: ${userData.emissionsTonsPerDay} tCO2/day
- Carbon Offset: ${userData.carbonOffsetTonsPerDay} tCO2/day

Return ONLY VALID JSON in the following EXACT format:

[
  {
    "title": "",
    "category": "",
    "priority": "",
    "timeframe": "",
    "explanation": "",
    "improvementEstimate": "",
    "impactValue": ""
  }
]

Rules:
- No markdown
- No backticks
- No comments
- No extra text outside JSON
- No truncated sentences
- Ensure JSON is valid and complete
`;


// 4️⃣ Run LLaMA
async function runTest() {
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4 // more analytical, less creative
  });

  console.log("\n=== LLaMA SUGGESTIONS OUTPUT ===\n");
  console.log(response.choices[0].message.content);
  console.log("\n=================================\n");
}

runTest();
