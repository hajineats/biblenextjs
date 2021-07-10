import cheerio from 'cheerio';

const somePromise = () => {
    return new Promise(resolve => setTimeout(() => resolve("hello"), 500))
}

export default async (req, res) => {
    const {
        query: { version, book, verses },
    } = req;



    // const a = await somePromise()
    const url = `https://ibibles.net/quote.php?niv-${book}/${verses}`;
    const fetchData = await fetch(url, {mode: 'no-cors'});
    const $ = cheerio.load(await fetchData.text());
    const engHtml = $('body').html();



    //kor
    const url2 = `https://ibibles.net/quote.php?${version}-${book}/${verses}`;
    const fetchData2 = await fetch(url2, {mode: 'no-cors'});
    const $2 = cheerio.load(await fetchData2.text());
    const korHtml = $2('body').html();

    console.log("url2",url2)

    const resultHtml = korHtml + engHtml

    return res.send(resultHtml)
}