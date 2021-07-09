import cheerio from 'cheerio';

const somePromise = () => {
    return new Promise(resolve => setTimeout(() => resolve("hello"), 500))
}

export default async (req, res) => {
    const {
        query: { version, book, verses },
    } = req;

    // const a = await somePromise()
    const url = `https://ibibles.net/quote.php?${version}-${book}/${verses}`;
    const fetchData = await fetch(url, {mode: 'no-cors'});
    const $ = cheerio.load(await fetchData.text());
    const html = $('body').html();

    return res.send(html)
}