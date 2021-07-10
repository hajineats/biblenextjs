import {useState} from "react";
import axios from "axios";
import Example from "../component/autosuggest-2";
import {Button, Paper, Typography} from "@material-ui/core";
import Link from 'next/link'
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
    const [update, setUpdate] = useState(false)
    const [bibleText, setBibleText] = useState(["", ""])
    const [query, setQuery] = useState(["", ""])
    const [engBookParam, setEngBookParam] = useState(["",""])

    const setGeneralQuery = (i)=>(newValue)=>{
        let queryCopy = query
        queryCopy[i] = newValue
        setQuery(queryCopy)
    }

    const setGeneralEngBookParam = (i)=>(newValue)=>{
        let engBookCopy = engBookParam
        engBookCopy[i] = newValue
        setEngBookParam(engBookCopy)
    }


    const getBibleVerses1 = ()=>{
        getBibleVerses(engBookParam[0], query[0],0)
    }
    const getBibleVerses2 = ()=>{
        getBibleVerses(engBookParam[1], query[1],1)
    }


    const getBibleVerses = (engBook, queryBody, i)=>{
        const parsed = parseQuery(engBook, queryBody)
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
                const bibleTextCopy = bibleText
                bibleTextCopy[i] = cleanText

                setBibleText(bibleTextCopy)
                setUpdate(!update)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return (
        <>
            <Typography variant="body2">
                <strong>듀얼검색: 2가지 다른 구절들을 띄어놓고 볼 수 있는 곳입니다. </strong>
                <Link href="/">뒤로가기</Link>
            </Typography>
            <hr/>
            <Typography variant="body1">
                제1검색결과:
            </Typography>
            <div style={{padding:"10px 0"}}>
                <Example setEngBookParam = {setGeneralEngBookParam(0)} setQuery={setGeneralQuery(0)} />
            </div>
            <Button variant="contained" color="primary" onClick={getBibleVerses1}>검색하기</Button>
            <Paper>
                <Typography variant='body1'>
                    {update?bibleText[0]:bibleText[0]}
                </Typography>
            </Paper>
            <hr/>


            <Typography variant="body1">
                제2검색결과:
            </Typography>
            <div style={{padding:"10px 0"}}>
                <Example setEngBookParam = {setGeneralEngBookParam(1)} setQuery={setGeneralQuery(1)} />
            </div>
            <Button variant="contained" color="primary" onClick={getBibleVerses2}>검색하기</Button>
            <Paper>
                <Typography variant='body1'>
                    {update?bibleText[1]:bibleText[1]}
                </Typography>
            </Paper>



            <br/>

        </>
    )
}
