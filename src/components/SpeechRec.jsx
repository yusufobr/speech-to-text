import { useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import RecAnimation from "../components/RecAnimation";


const SpeechRec = () => {
  const [copied, setCopied] = useState(false);
  const divRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const copyToClipboard = () => {
    const text = divRef.current.innerText;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    });
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center max-w-screen-md">
      <div className="flex gap-2">
        <p>Microphone: </p>
        <div>{listening ? <RecAnimation /> : 'off' }</div>
      </div>
      <div className="flex gap-2">
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      {transcript && (
        <div className="flex flex-col gap-4 items-end p-4 bg-gray-900 rounded-md">
          <p ref={divRef} className="text-left capitalize-first">
            {transcript}
          </p>
          <button
            className="bg-transparent border-white"
            onClick={copyToClipboard}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeechRec;
