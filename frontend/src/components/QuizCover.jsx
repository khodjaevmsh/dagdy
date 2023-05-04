import { useContext, useState } from 'react'
import { ChevronRight } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useLoad } from '../hooks/request'
import { ANSWERS, QUESTIONS, QUIZZES } from '../../urls'
import Loader from './common/Loader'
import { GlobalContext } from '../contexts/GlobalContext'
import Questionn from './Questionn'
import { domain } from '../utils/request'

export default function QuizCover() {
    const { lang } = useContext(GlobalContext)
    const { t } = useTranslation()
    const [quiz, setQuiz] = useState([])
    const [startQuestion, setStartQuestion] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const quizzes = useLoad({ url: QUIZZES }, [lang])
    const questions = useLoad({ url: QUESTIONS, params: { quiz: quiz.id } }, [lang, quiz])
    const newQuestion = questions.response ? questions.response.results : []
    const { id, type } = questions.response && questions.response.results.length ? questions.response.results[currentQuestion] : []

    const answers = useLoad({ url: ANSWERS, params: { question: id } }, [newQuestion, currentQuestion])

    if (quizzes.loading && questions.loading && answers.loading) return <Loader large center />

    return (
        <section className="container my-5">
            {startQuestion ? (
                <Questionn
                    quiz={quiz}
                    newQuestion={newQuestion}
                    answers={answers}
                    type={type}
                    setStartQuestion={setStartQuestion}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion} />
            ) : (
                <>
                    <h1 className="title is-2 mt-3 has-text-centered mb-5 pt-4">{t('chooseCategory')}</h1>
                    <div className="columns mx-0 is-centered is-multiline mt-4 disabled">
                        {quizzes.response ? quizzes.response.results.map((item) => (
                            <div key={item.id} className="column is-4" onClick={() => {
                                setStartQuestion(!startQuestion)
                                setQuiz(item)
                            }}>
                                {/* eslint-disable-next-line max-len */}
                                <div style={{ backgroundImage: `url(${domain + item.cover})` }} className="box quiz-card has-background-white-bis custom-box is-flex is-flex-direction-column is-justify-content-space-between">
                                    <div className="is-flex is-align-items-center is-justify-content-space-between">
                                        <p className={item.cover ? 'title is-5 m-0 has-text-white' : 'title is-5 m-0'}>{item.name}</p>
                                        <ChevronRight width={24} className="mt-1" color={item.cover ? '#ffffff' : '#000000'} />
                                    </div>
                                    <div>
                                        <p className={item.cover ? 'has-text-white' : 'has-text-grey'}>
                                            {item.description.slice(0, 70)}...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </>
            )}
        </section>
    )
}
