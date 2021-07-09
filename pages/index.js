import {useEffect, useState} from "react";
import axios from "axios";
import Example from "../component/autosuggest";
const cleanseHtml = (html)=>{
    html = html.replaceAll("<small>", "")
    html = html.replaceAll("</small>", "")

    const lines = html.split('<br>')

    return (
        <>
            {lines.map(e=><p>
                {e}
            </p>)}
        </>
    )
}

const parseQuery = (engBook, query)=>{
//    TODO: syntax error handling should be added
//    format: 민수기 1 2.3 (== 민수기 1장 2-3절)



    const queryList = query.split(' ')

    if(queryList.length != 3){
        alert("예시) 민수기 1장 2-3절:\n민수기 1 2.3")
        return
    }


    const chapter = queryList[queryList.length-2]
    const verses = queryList[queryList.length-1].replace('.','-')

    return {
        version: "kor",
        book: engBook,
        verses: chapter+":"+verses
    }
}


export default function Home() {
    const [bibleText, setBibleText] = useState("")
    const [query, setQuery] = useState("")
    const [engBookParam, setEngBookParam] = useState("")

    const getBibleVerses = ()=>{
        const parsed = parseQuery(engBookParam, query)
        if (!parsed){
            return
        }
        const {
            version,
                book,
                verses,
        } = parsed
        axios.get(`api/gethtml?version=${version}&book=${book}&verses=${verses}`)
            .then(res =>{
                const cleanText = cleanseHtml(res.data)
                setBibleText(cleanText)
            })
    }

    const registerChange = (e)=>{
        console.log(e.target.value)
    }

    return (
        <>
            <p>
                현재 입력한 값: {query}
            </p>
            <p>
                영어성경 이름: {engBookParam}
            </p>
            <Example setEngBookParam = {setEngBookParam} setQuery={setQuery} />
            <button onClick={getBibleVerses}>search!</button>
            <p>

                {bibleText}
            </p>

        </>
    )
}
