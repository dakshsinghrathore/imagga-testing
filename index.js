import OpenAI from "openai";
import got from "got";
import "dotenv/config";

const imaggaApiKey = process.env.IMAGGA_API_KEY;
const imaggaApiSecret = process.env.IMAGGA_API_SECRET;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getKeywordsFromImage(imageUrl) {
  try {
    const imaggaUrl = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(
      imageUrl
    )}`;
    const response = await got(imaggaUrl, {
      username: imaggaApiKey,
      password: imaggaApiSecret,
    });
    const tags = JSON.parse(response.body).result.tags;

    const tagNames = tags.map((tag) => tag.tag.en);

    const keywords = tagNames.join(", ");

    return keywords;
  } catch (error) {
    console.error(error.response.body);
    throw new Error("Failed to retrieve keywords from the image.");
  }
}

async function generateSongsList(keywords) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Generate a list of 10 hindi songs in bulleted form along with the context based on the keywords: ${keywords}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const songsList = completion.choices[0].message.content.trim();
    
    return songsList;
  } catch (error) {
    console.error("Error generating songs list:", error);
  }
}

const generateSongsUsingAI = async (imageUrl) => {
  try {
    const keywords = await getKeywordsFromImage(imageUrl);
    const songList = await generateSongsList(keywords);
    return songList;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default generateSongsUsingAI;

// console.log(await generateSongsUsingAI("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"))

// (async () => {
//     try {
//         const keywords = await getKeywordsFromImage(imageUrl);
//         await generateSongsList(keywords);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// })();
