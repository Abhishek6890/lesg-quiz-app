import React from 'react';

const Question = ({ question, selectedAnswer, handleAnswerChange }) => (
    <div className="question">
        <h3>{question.question}</h3>
        {question.options.map(option => (
            <label key={option.key} style={{ display: 'block', margin: '5px 0' }}>
                <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.key}
                    checked={selectedAnswer === option.key}
                    onChange={() => handleAnswerChange(question.id, option.key)}
                />
                {option.text}
            </label>
        ))}
    </div>
);

export default Question;