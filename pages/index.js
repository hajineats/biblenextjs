import {useEffect, useState} from "react";
import axios from "axios";
import Example from "../component/autosuggest";
import {Button, Paper, Typography} from "@material-ui/core";
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
    const [bibleText, setBibleText] = useState("")
    const [query, setQuery] = useState("")
    const [engBookParam, setEngBookParam] = useState("")

    const getHelp = ()=>{
        alert(
`
입력 예시 - 민수기 1장 2-3절:
민수기 1 2.3

입력 예시 - 민수기 1장 1절:
민수기 1 1

현재 한국어 & 구약만 지원
`)
    }

    const getDetails = ()=>{
        alert(`
========================================
핸드폰에서 성경을 가능한 빨리 찾기 위해서 만든 앱입니다!
(UI는 안중에 없는 앱)
---------------------------------------
현재 기능:
- 초성 검색 자동 제안기능
- 구약 검색 가능

추가될 기능:
- 신약 검색
- 영어 성경 검색
- 멀티 검색 (제자반 숙제할 때 로마서 보다가 히브리서 보다가 로마서 보기 쉽게)
    - 결과 지워지지 않고 계속 검색 가능
- 히스토리 이용 (금방 뒤로 갈 수 있음 reliable 하게) => 제자반 하다보면 왔다갔다 해야해서 귀찮다
- 음성 검색
        `)
    }

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

    const checkQueriable = ()=>{
        const queryList = query.split(' ')
        if(queryList.length!=3){
            return false
        }

        if(queryList[2] == ""){
            return false
        }

        return true
    }

    return (
        <>
            <Paper>
                <Typography variant='body2'>
                    {checkQueriable()
                        ?"(아마도)검색 가능!":""}
                </Typography>
            </Paper>

            <div style={{padding:"10px 0"}}>
                <Example setEngBookParam = {setEngBookParam} setQuery={setQuery} />
            </div>
            <Button variant="contained" color="primary" onClick={getBibleVerses}>검색하기</Button>
            <Paper>
                <Typography variant='body1'>
                    {bibleText}
                </Typography>
            </Paper>
            <br/>
            <Button variant="contained" color="secondary" onClick={getHelp}>
                도움말
            </Button>

            <Button variant="contained" color="secondary" onClick={getDetails}>
                현재 기능들
            </Button>


        </>
    )
}
