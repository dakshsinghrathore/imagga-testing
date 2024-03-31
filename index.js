import OpenAI from "openai";
import got from 'got';
import 'dotenv/config'

const imaggaApiKey = process.env.IMAGGA_Api_Key;
const imaggaApiSecret = process.env.IMAGGA_Api_Secret;
const openai = new OpenAI({ apiKey: process.env.OpenAIapiKey});

async function getKeywordsFromImage(imageUrl) {
    try {
        const imaggaUrl = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(imageUrl)}`;
        const response = await got(imaggaUrl, { username: imaggaApiKey, password: imaggaApiSecret });
        const tags = JSON.parse(response.body).result.tags;

        const tagNames = tags.map(tag => tag.tag.en);

        const keywords = tagNames.join(', ');

        return keywords;
    } catch (error) {
        console.error(error.response.body);
        throw new Error('Failed to retrieve keywords from the image.');
    }
}

async function generateSongsList(keywords) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": `Generate a list of 10 hindi songs in bulleted form along with the context based on the keywords: ${keywords}` }
            ],
            model: "gpt-3.5-turbo",
        });

        const songsList = completion.choices[0].message.content.trim();
        console.log('Generated Songs List:', songsList);
    } catch (error) {
        console.error('Error generating songs list:', error);
    }
}


const imageUrl = ['https://live.staticflickr.com/65535/49406216912_46847e6d63_b.jpg','https://cdn.ca.emap.com/wp-content/uploads/sites/12/2023/10/Howrah-Bridge-Kolkata-Image-by-Chinmaykp25.jpg','https://assets.editorial.aetnd.com/uploads/2010/07/mahatma-gandhi-gettyimages-102701091-2048x2048-1.jpg'];

(async () => {
    try {
        const keywords = await getKeywordsFromImage(imageUrl);
        await generateSongsList(keywords);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();


