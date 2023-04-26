import { useState } from 'react'
import { useLoad } from '../hooks/request'
import { QUESTIONS } from '../../urls'

export default function Question({ quizItem }) {
    const questionData = useLoad({ url: QUESTIONS, params: { quiz: quizItem.id } })
    const questList = questionData.response ? questionData.response.results : []

    const [myMap, setMyMap] = useState()

    const quiz = {
        topic: quizItem.name,
        level: quizItem.level,
        totalQuestions: questList.length,
        perQuestionScore: 5,
        questionssss: [{
            question: 'sss',
            choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
            type: 'MCQs',
            correctAnswer: 'stringify()',
        }],
    }
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({ score: 0, correctAnswers: 0, wrongAnswers: 0 })

    const { questions } = quizItem
    const { question, choices, correctAnswer } = questions[activeQuestion]

    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) => (selectedAnswer
            ? { ...prev, score: prev.score + 5, correctAnswers: prev.correctAnswers + 1 }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }))

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <div className="container">
            {!showResult ? (
                <div className="columns is-centered">
                    <div className="column is-11 question-content is-flex is-align-items-center">
                        <div className="hero">
                            <div className="hero-body">
                                <div className="my-2 has-text-grey">
                                    <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                                    <span className="total-question">/{addLeadingZero(questions.length)}</span>
                                </div>
                                <h2 className="title is-3">{question}</h2>

                                {choices.map((answer, index) => (
                                    <div key={answer} className="control">
                                        <label className="radio mx-1 my-3">
                                            <input
                                                onClick={() => onAnswerSelected(answer, index)}
                                                checked={selectedAnswerIndex === index ? true : null}
                                                type="radio"
                                                name={index} />
                                            <span className="subtitle is-5 mx-2">{answer}</span>
                                        </label>
                                    </div>
                                ))}
                                <div className="my-5">
                                    <button
                                        className="button is-info is-outlined px-6"
                                        onClick={onClickNext}
                                        disabled={selectedAnswerIndex === null}>
                                        {activeQuestion === questions.length - 1 ? 'Завершить тест' : 'Следущий'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="result-content">
                    <h3>Result</h3>
                    <p>Total Question: <span>{questions.length}</span></p>
                    <p>Total Score:<span> {result.score}</span></p>
                    <p>Correct Answers:<span> {result.correctAnswers}</span></p>
                    <p>Wrong Answers:<span> {result.wrongAnswers}</span></p>
                </div>
            )}
        </div>
    )
}
