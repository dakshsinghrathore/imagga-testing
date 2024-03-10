import OpenAI from "openai";
import got from 'got';

const imaggaApiKey = 'key';
const imaggaApiSecret = 'key';
const openai = new OpenAI({ apiKey: 'key' });

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
                { "role": "user", "content": `Generate a list of hindi songs based on the keywords: ${keywords}` }
            ],
            model: "gpt-3.5-turbo",
        });

        const songsList = completion.choices[0].message.content.trim();
        console.log('Generated Songs List:', songsList);
    } catch (error) {
        console.error('Error generating songs list:', error);
    }
}


const imageUrl = 'https://cdn.britannica.com/60/176060-131-624C5D0C/Ganesha-beginnings-Hindu.jpg';

(async () => {
    try {
        const keywords = await getKeywordsFromImage(imageUrl);
        await generateSongsList(keywords);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();


