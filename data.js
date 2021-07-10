const languages = [
    {
        short: 'ㅊㅅㄱ',
        long: '창세기',
        eng: 'genesis'
    },
    {
        short: 'ㅊㅇㄱㄱ',
        long: '출애굽기',
        eng: 'Exodus'
    },
    {
        short: 'ㄹㅇㄱ',
        long: '레위기',
        eng: 'Leviticus'
    },
    {
        short: 'ㅁㅅㄱ',
        long: '민수기',
        eng: 'Numbers'
    },
    {
        short: 'ㅅㅁㄱ',
        long: '신명기',
        eng: 'Deuteronomy'
    },
    {
        short: 'ㅇㅎㅅㅇ',
        long: '여호수아',
        eng: 'Joshua'
    },
    {
        short: 'ㅅㅅㄱ',
        long: '사사기',
        eng: 'Judges'
    },
    {
        short: 'ㄹㄱ',
        long: '룻기',
        eng: 'Ruth'
    },
    {
        short: 'ㅅㅁㅇㅅ',
        long: '사무엘상',
        eng: '1Samuel'
    },
    {
        short: 'ㅅㅁㅇㅎ',
        long: '사무엘하',
        eng: '2Samuel'
    },
    {
        short: 'ㅇㅇㄱㅅ',
        long: '열왕기상',
        eng: '1Kings'
    },
    {
        short: 'ㅇㅇㄱㅎ',
        long: '열왕기하',
        eng: '2Kings'
    },
    {
        short: 'ㅇㄷㅅ',
        long: '역대상',
        eng: '1Chronicles'
    },
    {
        short: 'ㅇㄷㅎ',
        long: '역대하',
        eng: '2Chronicles'
    },
    {
        short: 'ㅇㅅㄹ',
        long: '에스라',
        eng: 'Ezra'
    },
    {
        short: 'ㄴㅎㅁㅇ',
        long: '느헤미야',
        eng: 'Nehemiah'
    },
    {
        short: 'ㅇㅅㄷ',
        long: '에스더',
        eng: 'Esther'
    },
    {
        short: 'ㅇㄱ',
        long: '욥기',
        eng: 'Job'
    },
    {
        short: 'ㅅㅍ',
        long: '시편',
        eng: 'Psalms'
    },
    {
        short: 'ㅈㅇ',
        long: '잠언',
        eng: 'Proverbs'
    },
    {
        short: 'ㅈㄷㅅ',
        long: '전도서',
        eng: 'Ecclesiastes'
    },
    {
        short: 'ㅇㄱ',
        long: '아가',
        eng: 'SongofSolomon'
    },
    {
        short: 'ㅇㅅㅇ',
        long: '이사야',
        eng: 'Isaiah'
    },
    {
        short: 'ㅇㄹㅁㅇ',
        long: '예레미야',
        eng: 'Jeremiah'
    },
    {
        short: 'ㅇㄹㅁㅇ ㅇㄱ',
        long: '예레미야 애가',
        eng: 'Lamentations'
    },
    {
        short: 'ㅇㅅㄱ',
        long: '에스겔',
        eng: 'Ezekiel'
    },
    {
        short: 'ㄷㄴㅇ',
        long: '다니엘',
        eng: 'Daniel'
    },
    {
        short: 'ㅎㅅㅇ',
        long: '호세아',
        eng: 'Hosea'
    },
    {
        short: 'ㅇㅇ',
        long: '요엘',
        eng: 'Joel'
    },
    {
        short: 'ㅇㅁㅅ',
        long: '아모스',
        eng: 'Amos'
    },
    {
        short: 'ㅇㅂㄷ',
        long: '오바댜',
        eng: 'Obadiah'
    },
    {
        short: 'ㅇㄴ',
        long: '요나',
        eng: 'Jonah'
    },
    {
        short: 'ㅁㄱ',
        long: '미가',
        eng: 'Micah'
    },
    {
        short: 'ㄴㅎ',
        long: '나훔',
        eng: 'Nahum'
    },
    {
        short: 'ㅎㅂㄱ',
        long: '하박국',
        eng: 'Habakkuk'
    },
    {
        short: 'ㅅㅂㄴ',
        long: '스바냐',
        eng: 'Zephaniah'
    },
    {
        short: 'ㅎㄱ',
        long: '학개',
        eng: 'Haggai'
    },
    {
        short: 'ㅅㄱㄹ',
        long: '스가랴',
        eng: 'Zechariah'
    },
    {
        short: 'ㅁㄹㄱ',
        long: '말라기',
        eng: 'Malachi'
    },
    {
        short: 'ㅁㅌㅂㅇ',
        long: '마태복음',
        eng: 'Matthew',
    },
    {
        short: 'ㅁㄱㅂㅇ',
        long: '마가복음',
        eng: 'Mark',
    },
    {
        short: 'ㄴㄱㅂㅇ',
        long: '누가복음',
        eng: 'Luke',
    },
    {
        short: 'ㅇㅎㅂㅇ',
        long: '요한복음',
        eng: 'John',
    },
    {
        short: 'ㅅㄷㅎㅈ',
        long: '사도행전',
        eng: 'Acts',
    },
    {
        short: 'ㄹㅁㅅ',
        long: '로마서',
        eng: 'Romans',
    },
    {
        short: 'ㄱㄹㄷㅈㅅ',
        long: '고린도전서',
        eng: '1Corinthians',
    },
    {
        short: 'ㄱㄹㄷㅎㅅ',
        long: '고린도후서',
        eng: '2Corinthians',
    },
    {
        short: 'ㄱㄹㄷㅇㅅ',
        long: '갈라디아서',
        eng: 'Galatinas',
    },
    {
        short: 'ㅇㅂㅅㅅ',
        long: '에베소서',
        eng: 'Ephesians',
    },
    {
        short: 'ㅂㄹㅂㅅ',
        long: '빌립보서',
        eng: 'Philippians',
    },
    {
        short: 'ㄱㄹㅅㅅ',
        long: '골로새서',
        eng: 'Colossians',
    },
    {
        short: 'ㄷㅅㄹㄴㄱㅈㅅ',
        long: '데살로니가전서',
        eng: '1Thessalonians',
    },
    {
        short: 'ㄷㅅㄹㄴㄱㅎㅅ',
        long: '데살로니가후서',
        eng: '2Thessalonians',
    },
    {
        short: 'ㄷㅁㄷㅈㅅ',
        long: '디모데전서',
        eng: '1Timothy',
    },
    {
        short: 'ㄷㅁㄷㅎㅅ',
        long: '디모데후서',
        eng: '2Timothy',
    },
    {
        short: 'ㄷㄷㅅ',
        long: '디도서',
        eng: 'Titus',
    },
    {
        short: 'ㅂㄹㅁㅅ',
        long: '빌레몬서',
        eng: 'Philemon',
    },
    {
        short: 'ㅎㅂㄹㅅ',
        long: '히브리서',
        eng: 'Hebrews',
    },
    {
        short: 'ㅇㄱㅂㅅ',
        long: '야고보서',
        eng: 'James',
    },
    {
        short: 'ㅂㄷㄹㅈㅅ',
        long: '베드로전서',
        eng: '1Peter',
    },
    {
        short: 'ㅂㄷㄹㅎㅅ',
        long: '베드로후서',
        eng: '2Peter',
    },{
        short: 'ㅇㅎ1ㅅ',
        long: '요한1서',
        eng: '1John',
    },
    {
        short: 'ㅇㅎ2ㅅ',
        long: '요한2서',
        eng: '2John',
    },
    {
        short: 'ㅇㅎ3ㅅ',
        long: '요한3서',
        eng: '3John',
    },
    {
        short: 'ㅇㄷㅅ',
        long: '유다서',
        eng: 'Jude',
    },
    {
        short: 'ㅇㅎㄱㅅㄹ',
        long: '요한계시록',
        eng: 'Revelation',
    },
];
export default languages