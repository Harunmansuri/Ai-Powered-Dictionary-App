import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Search, Heart } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import FadeLoader from "react-spinners/FadeLoader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  async function getResult() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Considered you are a dictionary AI. we will give to a word and you need to Give all the Dictionary details in good form including examples also, Meaning, Synonyms, Antonyms, Usage in a sentence for the word: ${word}`,
    });

    // Clean result for pronunciation/fancy quotes
    let cleanText = response.text
      .replace(/[\u2018\u2019\u201C\u201D]/g, "'") // smart quotes to normal
      .replace(/\s{2,}/g, " ")                  // multiple spaces to one
      .replace(/–/g, "-");                      // fancy dash to normal dash

    setResult(cleanText);
    setLoading(false);
  }

  return (
    <>
      <Navbar />

      {/* Search Section */}
      <div className="search-section mt-5 px-[200px]">
        <div className="inputBox flex items-center gap-3">
          <Search
            color="gray"
            size={30}
            className="ml-3 cursor-pointer"
            onClick={getResult}
          />

          <input
            type="text"
            placeholder="Search for a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") getResult();
            }}
            className="w-full p-4 text-2xl rounded-md border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Result Section */}
      <div className="resultContainer py-[20px] mt-5 min-h-[40vh] mx-[200px] p-5 border border-gray-300 rounded-md whitespace-pre-wrap">
        <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
        {loading && (
          <FadeLoader color="#36d7b7" size={150} className="mx-auto" />
        )}
      </div>

      {/* Footer */}
      <div className="footer text-center mt-5 py-3 flex justify-center items-center gap-2">
        <p>
          Made by <strong>Harun Masnuri</strong>
        </p>
        <Heart color="#ef4444" size={20} />
      </div>
    </>
  );
}

export default App;
