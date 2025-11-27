import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizOption } from '../types';

interface QuizScreenProps {
  onComplete: (answers: Record<number, QuizOption>) => void;
}

export const QuizScreen = ({ onComplete }: QuizScreenProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});

  const handleAnswer = (option: QuizOption) => {
    const newAnswers = { ...answers, [currentQ]: option };
    setAnswers(newAnswers);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col justify-center max-w-2xl mx-auto">
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8">
        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
      
      <span className="text-emerald-600 font-semibold mb-2">Pitanje {currentQ + 1} od {QUIZ_QUESTIONS.length}</span>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium group-hover:text-emerald-700">{opt.text}</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

