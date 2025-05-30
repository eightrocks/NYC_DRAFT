import React, { useState, useRef } from 'react';

// TypeScript type definitions for Web Speech API
// These are not in the default TS lib, so we declare them here

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Setup Web Speech API
  const getRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Web Speech API is not supported in this browser.');
      return null;
    }
    return new SpeechRecognition();
  };

  const handleDictate = () => {
    if (isDictating) {
      recognitionRef.current?.stop();
      setIsDictating(false);
      return;
    }
    const recognition = getRecognition();
    if (!recognition) return;
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsDictating(false);
    };
    recognition.onerror = () => {
      setIsDictating(false);
    };
    recognition.onend = () => {
      setIsDictating(false);
    };
    recognition.start();
    setIsDictating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${input}`);
    // TODO: Call backend API
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <label htmlFor="topic" className="font-semibold text-lg">Enter a topic</label>
        <div className="flex gap-2">
          <input
            id="topic"
            type="text"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your topic or dictate..."
            autoFocus
          />
          <button
            type="button"
            onClick={handleDictate}
            className={`px-4 py-2 rounded ${isDictating ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} transition`}
            aria-pressed={isDictating}
          >
            {isDictating ? 'Stop' : 'Dictate'}
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
