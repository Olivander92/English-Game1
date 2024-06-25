import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const words = [
  { type: 'subject', words: ['The cat', 'My friend', 'The teacher'] },
  { type: 'verb', words: ['jumps', 'sings', 'writes'] },
  { type: 'object', words: ['the ball', 'a song', 'an essay'] },
];

const SentenceBuilder = () => {
  const [sentence, setSentence] = useState([]);
  const [currentWordType, setCurrentWordType] = useState('subject');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const addWord = (word) => {
    setSentence([...sentence, word]);
    setCurrentWordType(currentWordType === 'subject' ? 'verb' : currentWordType === 'verb' ? 'object' : 'complete');
  };

  const checkSentence = () => {
    if (sentence.length === 3) {
      setScore(score + 1);
      setFeedback('Great job! You built a correct sentence.');
    } else {
      setFeedback('Try again. A complete sentence needs a subject, verb, and object.');
    }
  };

  const resetGame = () => {
    setSentence([]);
    setCurrentWordType('subject');
    setFeedback('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>English Sentence Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-bold">Current Sentence:</h3>
          <p>{sentence.join(' ')}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Choose a {currentWordType}:</h3>
          <div className="flex flex-wrap gap-2">
            {words.find(w => w.type === currentWordType)?.words.map((word, index) => (
              <Button key={index} onClick={() => addWord(word)} disabled={currentWordType === 'complete'}>
                {word}
              </Button>
            ))}
          </div>
        </div>
        {currentWordType === 'complete' && (
          <Button onClick={checkSentence} className="w-full mb-2">Check Sentence</Button>
        )}
        <Button onClick={resetGame} variant="outline" className="w-full">Reset</Button>
        {feedback && (
          <div className={`mt-4 p-2 rounded ${feedback.includes('Great') ? 'bg-green-100' : 'bg-red-100'}`}>
            {feedback.includes('Great') ? <CheckCircle2 className="inline mr-2" /> : <AlertCircle className="inline mr-2" />}
            {feedback}
          </div>
        )}
        <div className="mt-4">
          <h3 className="font-bold">Score: {score}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceBuilder;
