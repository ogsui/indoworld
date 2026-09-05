import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const INDOWORLD_SYSTEM_INSTRUCTION = `You are the Senior AI Travel Architect & Holiday Specialist at Indoworld Tourism Services, incorporated in 2008 and based at Suite UG SR-5B, Ansal Plaza, Sector 1, Vaishali, Ghaziabad, UP 201010.
Our agency provides 4 core travel pillars:
1. Domestic & International Flight Ticketing
2. Verified Hotel & Resort Bookings (3-Star, 4-Star, 5-Star & Heritage Properties)
3. Tailored Tour Packages (Kashmir, Himachal, Kerala, Uttarakhand, Northeast, Dubai, Thailand, Bali, Europe, Vietnam, Japan, and ANY custom destination worldwide)
4. Comprehensive Visa, Travel Insurance & Guided Excursion Support

IMPORTANT RULE: Indoworld provides Flights, Hotels, and Tour Packages. We do NOT provide standalone cab/taxi services. Never mention cabs, taxis, or chauffeur services.

Contact details for Indoworld desk: Phone: 098114 42923 / 098114 42924, Email: info@indoworldtourism.com, Location: Ansal Plaza Vaishali (near Vaishali Metro Station).

Tone & Persona:
- Warm, exceptionally knowledgeable, sophisticated, and encouraging.
- Provide crisp, detailed, and realistic travel plans with realistic timings, route advice, flight recommendations, and dining/local secrets.
- Always offer practical budget estimates in INR (₹) and advise that Indoworld's Vaishali desk can customize, confirm flight rates, and arrange verified hotel stays for this journey.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "indoworld-travel-server" });
  });

  // Multi-Turn Gemini Chatbot Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getAiClient();
      if (!ai) {
        // Fallback response when GEMINI_API_KEY is not configured yet
        return res.json({
          reply: `Hello! I am your Indoworld Travel Concierge from our Vaishali office. Our AI services are ready to assist you. To plan your trip to "${message}", our team offers custom flights, verified hotel stays, and tailored sightseeing packages. You can also connect directly with our desk at 098114 42923!`,
        });
      }

      // Convert history to format accepted by Gemini
      // Format: Array of { role: 'user' | 'model', parts: [{ text: string }] }
      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          if (item.role && item.text) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text }],
            });
          }
        }
      }

      // Add latest message
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: INDOWORLD_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Thank you for reaching out to Indoworld Tourism Services. How else can we tailor your itinerary?";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      return res.status(500).json({
        error: error.message || "Failed to process travel inquiry",
        reply: "Our travel specialist desk is currently updating itineraries. Please try again in a moment or connect with our Vaishali office directly at 098114 42923.",
      });
    }
  });

  // Custom Itinerary Generator Endpoint (Structured JSON)
  app.post("/api/gemini/itinerary", async (req, res) => {
    try {
      const {
        destination,
        days = 5,
        travelers = 2,
        style = "Family Leisure",
        departureCity = "Delhi NCR",
        budgetTier = "Comfort / 4-Star",
        additionalNotes = "",
      } = req.body;

      if (!destination || typeof destination !== "string") {
        return res.status(400).json({ error: "Destination name is required" });
      }

      const ai = getAiClient();
      if (!ai) {
        // High-quality deterministic fallback itinerary
        const fallbackDays = [];
        const numDays = Math.min(Math.max(Number(days) || 5, 2), 14);
        for (let i = 1; i <= numDays; i++) {
          fallbackDays.push({
            day: i,
            title: i === 1 ? `Arrival in ${destination} & Leisure Exploration` : i === numDays ? `Farewell & Departure to ${departureCity}` : `Discovering Top Sights of ${destination} (Day ${i})`,
            morning: i === 1 ? `Touchdown, airport arrival & hotel check-in.` : `Sunrise sightseeing, heritage exploration, and local architectural landmarks.`,
            afternoon: `Curated cultural visit, scenic landscape photography, and regional culinary tasting.`,
            evening: `Relaxing sunset stroll, local artisan market shopping, and authentic local dinner.`,
            stay: `${budgetTier} Handpicked Hotel / Resort in central ${destination}`,
            transportTip: `Recommended local transit passes, walking routes, and guided sightseeing access.`,
          });
        }

        return res.json({
          title: `${numDays}-Day Signature ${destination} Getaway`,
          destination,
          duration: `${numDays} Days / ${numDays - 1} Nights`,
          vibe: style,
          departureCity,
          overview: `A personalized itinerary for exploring ${destination}, designed by Indoworld Tourism Services with verified hotel stays, curated experiences, and flexible pacing.`,
          bestTimeToVisit: "October to April (or peak regional season)",
          visaNotes: "Our Vaishali office assists with seamless visa documentation, flight reservations, and travel insurance.",
          estimatedBudget: {
            economy: `₹${(numDays * 3800 * travelers).toLocaleString('en-IN')} onwards`,
            standard: `₹${(numDays * 6500 * travelers).toLocaleString('en-IN')} onwards`,
            luxury: `₹${(numDays * 12000 * travelers).toLocaleString('en-IN')} onwards`,
          },
          days: fallbackDays,
          insiderTips: [
            `Book flights 45-60 days ahead for optimal fare tiers from ${departureCity}.`,
            `Carry localized currency and ensure international roaming or local e-SIM is activated.`,
            `Indoworld provides 24/7 WhatsApp concierge support throughout your journey.`,
          ],
        });
      }

      const prompt = `Generate a comprehensive, exciting, and professional ${days}-day custom holiday itinerary for destination "${destination}".
Parameters:
- Duration: ${days} Days
- Travelers: ${travelers} Persons
- Travel Style / Vibe: ${style}
- Departure Point: ${departureCity}
- Accommodation Tier: ${budgetTier}
${additionalNotes ? `- Special Requests: ${additionalNotes}` : ""}

Return a detailed JSON response following the exact schema provided.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: `${INDOWORLD_SYSTEM_INSTRUCTION}
Ensure day-by-day descriptions are vibrant, realistic, and contain authentic names of attractions, dining zones, and transport recommendations.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Catchy title for the custom tour" },
              destination: { type: Type.STRING },
              duration: { type: Type.STRING, description: "e.g. 6 Days / 5 Nights" },
              vibe: { type: Type.STRING },
              departureCity: { type: Type.STRING },
              overview: { type: Type.STRING, description: "Executive summary of the journey" },
              bestTimeToVisit: { type: Type.STRING },
              visaNotes: { type: Type.STRING },
              estimatedBudget: {
                type: Type.OBJECT,
                properties: {
                  economy: { type: Type.STRING },
                  standard: { type: Type.STRING },
                  luxury: { type: Type.STRING },
                },
                required: ["economy", "standard", "luxury"],
              },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    morning: { type: Type.STRING },
                    afternoon: { type: Type.STRING },
                    evening: { type: Type.STRING },
                    stay: { type: Type.STRING },
                    transportTip: { type: Type.STRING, description: "Local sightseeing transit tips, walking routes, or train/flight transfers (do not mention cabs or taxis)" },
                  },
                  required: ["day", "title", "morning", "afternoon", "evening", "stay", "transportTip"],
                },
              },
              insiderTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["title", "destination", "duration", "overview", "estimatedBudget", "days", "insiderTips"],
          },
        },
      });

      const jsonText = response.text?.trim() || "{}";
      const parsedData = JSON.parse(jsonText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini Itinerary API Error:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate custom itinerary",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Indoworld Server running on http://localhost:${PORT}`);
  });
}

startServer();
