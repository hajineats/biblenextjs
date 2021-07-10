import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import languages from "../data";
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


const Dictaphone = () => {
    const [query, setQuery] = useState("");
    const [bibleText, setBibleText] = useState("");
    const [queryBookParam, setQueryBookParam] = useState("");
    const [showTranscription, setShowTranscription] = useState(false);
    // const [queryChapParam, setQueryChapParam] = useState("");
    // const [queryVerseParam, setQueryVerseParam] = useState("")

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const takeNumbersOnly = (text)=>{
        let number = ""
        for(let i = 0; i<text.length; i++){
            if(!isNaN(text[i])){
                number = number+text[i]
            }else{
                return number
            }
        }

    }

    const parseQuery = (text,isKorean)=>{
        if(isKorean){
            const queryList = text.split(' ')
            if(queryList.length != 4 && queryList.length != 5){
                return
            }
            //expected format: 요한복음 3장 16절에서 21절
            const bookTitle = queryList[0]
            const bookChapter = takeNumbersOnly(queryList[1])
            const bookVerse = takeNumbersOnly(queryList[2])
            console.log("book title", bookTitle)

            let englishBookName = ""
            for(let i = 0; i<languages.length; i++){
                if(languages[i].long == bookTitle){
                    englishBookName = languages[i].eng
                    break;
                }
            }

            let parseResult = {
                version: 'kor',
                book: englishBookName,
            }
            console.log(parseResult)

            if(queryList.length == 4){
                //expected format: 요한복음 3장 16절 ('4' means 3 stuff)
                parseResult['verses'] = bookChapter+":"+bookVerse
                return parseResult
            }else{
                const bookVerse2 = takeNumbersOnly(queryList[3])
                parseResult['verses'] = bookChapter+":"+bookVerse+"-"+bookVerse2
                return parseResult
            }

        }
        return ""
    }

    const realTimeQueryProcess = ()=>{
        const startLocation = transcript.lastIndexOf('시작')
        const endLocation = transcript.lastIndexOf('끝')
        const koreanStartOffset = 3;
        if(endLocation > startLocation){
            const intermediateQuery = transcript.substring(startLocation+koreanStartOffset,endLocation)
            //check if query has been done before
            if(query != intermediateQuery){
                setQuery(intermediateQuery)

                const parseResult = parseQuery(intermediateQuery,true)

                console.log(parseResult)
                if (!parseResult){
                    // console.log('me here')
                    //TODO: notify that the query is not in the right format
                    return
                }

                const {
                    version,
                    book,
                    verses
                } = parseResult

                axios.get(`api/gethtml?version=${version}&book=${book}&verses=${verses}`)
                    .then(res => setBibleText(cleanseHtml(res.data)))
            }
        }

    }
    useEffect(()=>{
        realTimeQueryProcess()
    },[transcript])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const bibleStartListen = ()=>{
        SpeechRecognition.startListening(
            {
                continuous: true,
                language: 'ko'

            })
    }
    const bibleEndListen = ()=>{
        SpeechRecognition.stopListening()
    }




    return (
        <div>
            <Typography variant="body1">
                <strong>음성으로 검색하세요! (현재는 한국어만 지원) </strong>
                <span onClick={bibleEndListen}>
                    <Link href='/'>뒤로가기</Link>
                </span>
                <p>
                    예시1: '시작 요한복음 3장 16절 끝' => 요한복음 3장 16절
                </p>
                <p>
                    예시2: '시작 요한복음 3장 1절에서 16절 끝' => 요한복음 3장 1-16절
                </p>
            </Typography>
            <hr/>

            <Button variant="contained" color="primary" onClick={bibleStartListen}>Start</Button>
            <Button variant="contained" color="secondary" onClick={bibleEndListen}>Stop</Button>
            <Button variant="contained" color="secondary" onClick={()=>{
                alert(`
이 페이지는 당신의 말을 실시간으로 인식해서 성경 구절을 보여줍니다! (와우!)
- 마이크가 켜져있는 동안은 항상 당신의 말을 들어요. 귀찮게 계속 시작했다 정지했다 할 필요가 없지요.
- '시작'이라는 말로 하나의 요청을 시작합니다 (마치 '하이 시리'나 '하이 빅스비 처럼요!')
- '요한복음 3장 16절'처럼 단일 구절을 검색할 수도 있고, '요한복음 3장 16절에서 20절' 처럼 여러 구절들을 한번에(!!!) 검색할 수도 있습니다!
- '끝'이라는 말로 하나의 요청을 끝냅니다.

예시: '시작 요한복음 3장 16절 끝' => 요한복음 3장 16절
예시2: '시작 요한복음 3장 1절에서 16절 끝' => 요한복음 3장 1-16절

모든 사람들이 가장 효율적으로 성경을 찾을 수 있는 그날까지-

참고:
- 현재는 크롬 브라우저만 가능한 기능입니다 (WebSpeech API).
                `)
            }}>도움말</Button>
            <br/>

            <br/>
            <Typography variant="body1">
                가장 최근 인식된 ('시작'과 '끝'으로 감싸진)된 요청: {query}
            </Typography>

            <Paper>
                <Typography variant='body1'>
                    {bibleText}
                </Typography>
            </Paper>

            <br/>
            <br/>
            <Button onClick={
                ()=>setShowTranscription(!showTranscription)
            }>{showTranscription?'Transcript 숨기기':'Transcript 열기'}</Button>

            {showTranscription?<Paper>
                <Typography variant="body1">
                    <strong>{listening ? '마이크가 켜져있습니다' : '마이크가 꺼져있습니다'}</strong>
                </Typography>
                <p>이 세션동안 인식된 말: </p>
                <p>
                    {transcript}
                </p>

                <Button onClick={resetTranscript}>reset transcript</Button>

            </Paper>:<div></div>}



        </div>
    );
}
export default Dictaphone;