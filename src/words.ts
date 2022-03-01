import React from 'react';

interface WordListResponse {
    [language: string]: {
        labels: {
            [key: string]: string;
        };
        words: {
            [word: string]: {
                emoji: string;
                base: string;
                word: string;
                etymology: string;
                short: string;
                noun?: string;
                verb?: string;
                modifier?: string;
                preposition?: string;
                particle?: string;
                numeral?: string;
            };
        };
    };
}

interface WordDef {
    [key: string]: string | undefined;
    emoji: string;
    base: string;
    word: string;
    etymology: string;
    short: string;
    noun?: string;
    verb?: string;
    modifier?: string;
    preposition?: string;
    particle?: string;
    numeral?: string;
}
export interface WordList {
    labels: {
        [key: string]: string;
    };
    words: {
        [word: string]: {
            [key: string]: string | undefined;
            emoji: string;
            base: string;
            word: string;
            etymology: string;
            short: string;
            noun?: string;
            verb?: string;
            modifier?: string;
            preposition?: string;
            particle?: string;
            numeral?: string;
        };
    };
}

const extraWords: { [key: string]: WordDef } = {
    nula: {
        emoji: '0️⃣',
        base: 'numeral',
        word: 'nula',
        etymology: 'n/a',
        short: 'zero',
        numeral: 'zero (UNOFFICIAL) ',
    },
    lu: {
        emoji: '🔁',
        base: 'particle',
        word: 'lu',
        etymology: 'n/a',
        short: 'relational',
        particle: 'relational-branching particle (UNOFFICIAL) ',
    },
};

export const fetchWordList = async () => {
    const wordList = (await (await fetch('https://toki-ma.com/api/words.php')).json()) as WordListResponse;
    return { labels: wordList['English'].labels, words: { ...wordList['English'].words, ...extraWords } };
};

export const WordListContext = React.createContext({ labels: {}, words: {} } as WordList);
