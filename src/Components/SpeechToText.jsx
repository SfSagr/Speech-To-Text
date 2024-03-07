import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

import { CiPlay1 } from "react-icons/ci";
import { BiReset } from "react-icons/bi";
import { CiPause1 } from "react-icons/ci";

const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000,
    });

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    useEffect(() => {
        if (transcript !== "") {
            setTextToCopy(transcript);
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const handleReset = () => {
        setTextToCopy("");
        resetTranscript();
        setCopied(false);
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl text-center text-gray-800 font-serif mb-4 md:mb-8">
                Speech to Text Converter
            </h2>

            <div className="min-h-[300px] md:min-h-[400px] h-auto relative resize-none shadow-md bg-white border border-gray-200 rounded-lg mx-auto md:mx-[160px] p-2 md:p-4 " onClick={() => setTextToCopy(transcript)}>
                {transcript}
            </div>

            <div className="btn-style flex text-[18px] md:text-[28px] items-center justify-center space-x-2 md:space-x-4 my-4 md:my-8 bg-gray-100 w-fit mx-auto p-2 md:p-4">
                <button className="shadow-2xl p-1 md:p-2 rounded bg-gray-300 hover:bg-gray-500 focus:bg-gray-500 focus:outline-none" onClick={startListening}>
                    <CiPlay1 />
                </button>

                <button className="shadow-2xl p-1 md:p-2 rounded bg-gray-300 hover:bg-gray-500 focus:bg-gray-500 focus:outline-none" onClick={SpeechRecognition.stopListening}>
                    <CiPause1 />
                </button>

                <button className="shadow-2xl p-1 md:p-2 rounded bg-gray-300 hover:bg-gray-500 focus:bg-gray-500 focus:outline-none" onClick={handleReset}>
                    <BiReset />
                </button>
            </div>
            <div className='w-fit mx-auto'>
                <button className="shadow-2xl p-1 md:p-2 rounded bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 focus:outline-none" onClick={setCopied}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button>
            </div>
        </div>
    )
}

export default SpeechToText;
