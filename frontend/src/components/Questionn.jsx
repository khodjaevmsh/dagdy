import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loader from './common/Loader'
import ShowResult from './common/ShowResult'
import QuizCheckBox from './common/QuizCheckBox'
import StarRating from './common/StarRating'
import QuizRange from './common/QuizRange'
import QuizRadio from './common/QuizRadio'

export default function Questionn({ quiz, newQuestion, currentQuestion, setCurrentQuestion, answers, type, setStartQuestion }) {
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const { t } = useTranslation()

    const handleAnswerOptionClick = (isCorrect, ball) => {
        if (isCorrect) {
            setScore(score + ball)
        }

        // const nextQuestion = currentQuestion + 1
        // if (nextQuestion < newQuestion.length) {
        //     setCurrentQuestion(nextQuestion)
        // } else {
        //     setShowScore(true)
        // }
    }

    function nextPage() {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < newQuestion.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }
    return (
        <div className="app">
            {showScore ? (
                <div className="container a">
                    <div className="hero">
                        <div className="hero-body question-content">
                            <ShowResult quiz={quiz} score={score} setStartQuestion={setStartQuestion} />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="container">
                        <div className="hero">
                            <div className="hero-body question-content">
                                <div>
                                    <span className="has-text-grey">{currentQuestion + 1}/{newQuestion.length}</span>
                                </div>
                                <div>
                                    <h1 className="title is-2">{newQuestion[currentQuestion].text}</h1>
                                    <p className="subtitle is-6 has-text-grey mx-1 is-italic">
                                        {newQuestion[currentQuestion].helpText}
                                    </p>
                                </div>

                                <div className="columns my-4">
                                    <div className="column is-12">

                                        {answers.response ? answers.response.results.map((answerOption, index) => (
                                            type === 'is_checkbox' ? (
                                                <QuizCheckBox
                                                    handleAnswerOptionClick={handleAnswerOptionClick}
                                                    answerOption={answerOption} />
                                            ) : type === 'is_start_rating' ? (
                                                <StarRating
                                                    index={index}
                                                    handleAnswerOptionClick={handleAnswerOptionClick}
                                                    answerOption={answerOption} />
                                            ) : type === 'is_range' ? (
                                                <QuizRange
                                                    index={index}
                                                    handleAnswerOptionClick={handleAnswerOptionClick}
                                                    answerOption={answerOption} />
                                            ) : type === 'is_image_picker' ? (
                                                <h1>Image</h1>
                                            ) : (
                                                <QuizRadio
                                                    index={index}
                                                    handleAnswerOptionClick={handleAnswerOptionClick}
                                                    answerOption={answerOption} />
                                            ))) : <Loader large center />}
                                        <button
                                            onClick={() => nextPage()}
                                            className="button is-small px-6 py-4 is-blue my-6">
                                            {currentQuestion === newQuestion.length - 1
                                                ? t('finish') : t('next')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
