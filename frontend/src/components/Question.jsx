import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoad } from '../hooks/request'
import { ANSWERS, RESULTS } from '../../urls'
import ShowResult from './common/ShowResult'
import StarRating from './common/StarRating'
import QuizCheckBox from './common/QuizCheckBox'
import QuizRadio from './common/QuizRadio'
import QuizRange from './common/QuizRange'
import Loader from './common/Loader'

export default function Question({ setStartQuestion, questions, startQuestion, quizData, quizItem }) {
    const { t } = useTranslation()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({ score: 20, correctAnswers: 0, wrongAnswers: 0 })

    const { id, text, type, helpText } = questions.response && questions.response.results.length ? questions.response.results[activeQuestion] : []
    const answers = useLoad({ url: ANSWERS, params: { question: id } }, [activeQuestion, startQuestion])
    const questionText = text
    const typeOfQuestion = type
    const correctAnswer = answers.response ? answers.response.results[activeQuestion] : []

    if (questions.loading && answers.loading) return <Loader large center />

    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) => (selectedAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
            }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
        if (activeQuestion !== questions.response.results.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer.correct === correctAnswer.correct) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <div className="container">
            <div className="columns mx-0 is-vcentered">
                <div className="column is-12">
                    <div className="hero question-content">
                        <div className={!showResult ? 'hero-body pt-0' : 'hero-body'}>
                            {!showResult ? (
                                <>
                                    <div>
                                        <span className="active-question-no">
                                            {addLeadingZero(activeQuestion + 1)}
                                        </span>
                                        <span className="total-question">
                                            /{addLeadingZero(questions.response ? questions.response.results.length : '')}
                                        </span>
                                    </div>

                                    <h2 className="title is-2">
                                        {questionText}
                                    </h2>
                                    <h2 className="subtitle is-6 has-text-grey is-italic mb-6">
                                        {helpText}
                                    </h2>

                                    {typeOfQuestion === 'is_checkbox' ? (
                                        <QuizCheckBox
                                            activeQuestion={activeQuestion}
                                            selectedAnswerIndex={selectedAnswerIndex}
                                            onAnswerSelected={onAnswerSelected}
                                            answers={answers} />
                                    ) : typeOfQuestion === 'is_start_rating' ? (
                                        <StarRating
                                            answers={answers}
                                            onAnswerSelected={onAnswerSelected} />
                                    ) : typeOfQuestion === 'is_image_picker' ? (
                                        <h1>Image</h1>
                                    ) : typeOfQuestion === 'is_range' ? (
                                        <QuizRange
                                            answers={answers}
                                            onAnswerSelected={onAnswerSelected} />
                                    ) : (
                                        <QuizRadio
                                            answers={answers}
                                            selectedAnswerIndex={selectedAnswerIndex}
                                            onAnswerSelected={onAnswerSelected} />
                                    )}
                                    <div className="my-6">
                                        <button
                                            className="button is-blue mt-5"
                                            onClick={onClickNext}
                                            disabled={selectedAnswerIndex === null}>
                                            {activeQuestion === questions.response && questions.response.results.length - 1
                                                ? t('finish') : t('next')}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <ShowResult
                                    quizItem={quizData}
                                    questions={questions}
                                    result={result}
                                    setStartQuestion={setStartQuestion} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
