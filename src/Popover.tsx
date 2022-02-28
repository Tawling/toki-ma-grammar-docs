import { useContext, useEffect, useRef } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import { WordListContext } from './words';

const Popover = ({ word, span }: { word: string; span: null | React.MutableRefObject<null | HTMLSpanElement> }) => {
    const scrollSize = useScrollbarSize();
    const ref = useRef(null) as React.MutableRefObject<null | HTMLDivElement>;
    if (!word || !span) {
        return null;
    }
    const wordList = useContext(WordListContext);
    if (word in wordList.words) {
        const r = span.current?.getBoundingClientRect() ?? { top: 0, bottom: 0, left: 0, right: 0 };
        const rect = {
            top: r.top + window.scrollY,
            left: r.left + window.scrollX,
            bottom: r.bottom + window.scrollY,
            right: r.right + window.scrollX,
        };
        const popoverLeft = Math.min(
            rect.left - 10,
            document.documentElement.clientWidth -
                scrollSize.width -
                Math.min(document.documentElement.clientWidth * 0.5, 400),
        );
        return (
            <div
                ref={ref}
                className="popover"
                style={{
                    top: rect.top + (span?.current?.offsetHeight ?? 0) + 10,
                    left: popoverLeft,
                }}
            >
                <div
                    className="tip"
                    style={{
                        left:
                            (rect.right - rect.left) / 2 +
                            (rect.left -
                                popoverLeft),
                    }}
                ></div>
                <span className="word-def">{word}</span>
                <br />
                <span className="base-pos">
                    (Base Type: {wordList.labels[wordList.words[word].base] || 'Irregular'})
                </span>
                <br />
                <br />
                {['noun', 'verb', 'modifier', 'numeral', 'preposition', 'particle']
                    .filter((pos) => wordList.words[word][pos])
                    .map((pos) => (
                        <>
                            <span className="pos">{wordList.labels[pos]}</span>: {wordList.words[word][pos]}
                            <br />
                        </>
                    ))}
            </div>
        );
    }
    return null;
};

export default Popover;