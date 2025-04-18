'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const flashcards = [
  { question: "What is the dose of Epinephrine 1:1,000 IM for anaphylaxis?", answer: "0.3–0.5 mg IM every 5–15 minutes as needed" },
  { question: "What does APGAR stand for?", answer: "Appearance, Pulse, Grimace, Activity, Respiration" },
  { question: "What IV fluid is used for hypovolemic shock?", answer: "Normal Saline or Lactated Ringers" },
  { question: "What is the common side effect of Albuterol?", answer: "Tachycardia" },
  { question: "What is the glucose dose for an adult with hypoglycemia?", answer: "25–50 mL D50 IV or D10 titrated to effect" },
];

const quizQuestions = [
  {
    question: "Which airway device is considered supraglottic?",
    choices: ["OPA", "NPA", "i-gel", "ET Tube"],
    answer: "i-gel"
  },
  {
    question: "What is the most appropriate fluid for a burn patient?",
    choices: ["D5W", "NS", "LR", "Hypertonic Saline"],
    answer: "LR"
  },
  {
    question: "Which medication reverses opioid overdose?",
    choices: ["Glucagon", "Narcan", "Zofran", "Nitroglycerin"],
    answer: "Narcan"
  }
];

export default function AEMTStudyApp() {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">AEMT Study PWA</h1>
      <Tabs defaultValue="flashcards">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards">
          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{flashcards[currentCard].question}</p>
              {showAnswer && <p className="mt-2 text-green-600">{flashcards[currentCard].answer}</p>}
              <div className="mt-4 space-x-2">
                <Button onClick={() => setShowAnswer(!showAnswer)}>
                  {showAnswer ? "Hide" : "Show"} Answer
                </Button>
                <Button onClick={() => {
                  setCurrentCard((currentCard + 1) % flashcards.length);
                  setShowAnswer(false);
                }}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{quizQuestions[quizIndex].question}</p>
              <div className="mt-4 space-y-2">
                {quizQuestions[quizIndex].choices.map((choice) => (
                  <Button
                    key={choice}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedChoice(choice);
                      setIsCorrect(choice === quizQuestions[quizIndex].answer);
                    }}>
                    {choice}
                  </Button>
                ))}
              </div>
              {selectedChoice && (
                <p className={`mt-4 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect ? "Correct!" : `Wrong! Correct answer: ${quizQuestions[quizIndex].answer}`}
                </p>
              )}
              <Button className="mt-4" onClick={() => {
                setQuizIndex((quizIndex + 1) % quizQuestions.length);
                setSelectedChoice("");
                setIsCorrect(null);
              }}>
                Next Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
