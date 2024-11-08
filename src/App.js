import React, { useState } from 'react';
import './App.css';
import questionsData from './questions.json';
import Question from './Question';

const App = () => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length === questionsData.length) {
            setSubmitted(true);
            setShowSummary(true);
        } else {
            alert('Please answer all questions before submitting.');
        }
    };

    const calculateScore = () => {
        return questionsData.reduce((score, question) => {
            return answers[question.id] === question.answerKey ? score + 1 : score;
        }, 0);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const restartQuiz = () => {
        setAnswers({});
        setSubmitted(false);
        setCurrentQuestionIndex(0);
        setShowSummary(false);
    };

    // const exitQuiz = () => {
    //     setShowSummary(false);
    // };

    return (
        <div className="App">
            <h1>LSEG Quiz App</h1>
            {!showSummary ? (
                <>
                    <Question
                        question={questionsData[currentQuestionIndex]}
                        selectedAnswer={answers[questionsData[currentQuestionIndex].id]}
                        handleAnswerChange={handleAnswerChange}
                    />
                    <div>
                        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                        <button onClick={handleNext} disabled={currentQuestionIndex === questionsData.length - 1}>Next</button>
                    </div>
                    {currentQuestionIndex === questionsData.length - 1 && (
                        <button onClick={handleSubmit}>Submit Quiz</button>
                    )}
                </>
            ) : (
                <div>
                    <h2>Your Answers</h2>
                    <p className="score-highlight">Score: {calculateScore()} / {questionsData.length}</p>
                    <ul>
                        {questionsData.map((question) => (
                            <li key={question.id}>
                                <strong>{question.question}</strong><br />
                                Your Answer: {answers[question.id] ? question.options.find(opt => opt.key === answers[question.id]).text : 'No Answer'}
                                {answers[question.id] === question.answerKey ? (
                                    <span className="correct"> ✓ Correct</span>
                                ) : (
                                    <span className="incorrect"> ✗ Incorrect</span>
                                )}
                                <br />
                                {answers[question.id] !== question.answerKey && (
                                    <span className="correct-answer">Correct Answer: {question.options.find(opt => opt.key === question.answerKey).text}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                    {/* <button onClick={exitQuiz}>Exit</button> */}
                </div>
            )}
        </div>
    );
};

export default App;