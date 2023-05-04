import { useEffect, useRef, useState } from 'react'
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { lorem } from '../../lorem'
import { useLoad } from '../../hooks/request'
import { RESULT, RESULTS } from '../../../urls'
import QuizSocialShare from './QuizSocialShare'
import Loader from './Loader'

export default function ShowResult({ quiz, score, setStartQuestion }) {
    const [width, setWidth] = useState(window.innerWidth)
    const { t } = useTranslation()
    const [showEmailForm, setShowEmailForm] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const results = useLoad({ url: RESULTS, params: { quiz: quiz.id } })
    // const resultItem = useLoad({ url: RESULT.replace('{resultId}', 2), params: { quiz: quiz.id } })
    const newResults = results.response ? results.response.results : []
    const [finResult, setFinResult] = useState('')

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        newResults.length > 0 ? newResults.map((item) => (
            // eslint-disable-next-line max-len
            setFinResult(score <= item.easyScore ? item.easyDescription : score <= item.mediumScore ? item.mediumDescription : score <= item.hardScore ? item.hardDescription : null)
        )) : ''
    }, [newResults, score])

    function updateDimensions() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    async function exportToWord() {
        const date = new Date().getDate()
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        const fullDate = `${date}.0${month}.${year}`

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: 'dagdy.kz',
                                color: '#45A7F5',
                                size: 42,
                                allCaps: true,
                            }),
                            new TextRun({
                                text: String(fullDate),
                                color: '#939393',
                                size: 22,
                                break: 1,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: String(quiz.name),
                                color: '#000000',
                                size: 36,
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Ваш результат: ${score}`,
                                color: '#000000',
                                size: 32,
                                break: 1,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: String(finResult),
                                color: '#000000',
                                size: 18,
                                break: 1,
                            }),
                        ],
                    }),
                ],
            }],
        })
        const buffer = await Packer.toBuffer(doc)
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = quiz ? `${quiz.name}.docx` : 'dagdy.docx'
        link.click()
    }

    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault()
        emailjs.sendForm('service_cgpc0ke', 'template_d8fw20f', form.current, 'mTVX745jpg9K9awcG')
            .then((result) => {
                console.log(result.text)
                setShowSuccessMessage(true)
                setShowEmailForm(false)
                e.target.reset()
            }, (error) => {
                console.log(error.text)
            })
    }
    return (
        <div className="column">
            <div className="mb-6">
                <p className="title is-2 has-text-centered">{quiz.name}</p>
                <p onClick={exportToWord} className="subtitle is-6 is-underlined has-text-grey has-text-centered pointer">
                    {t('downloadResult')}
                </p>
            </div>
            <div className="columns is-centered mt-3">
                <div className="column is-6-desktop">
                    <div>
                        <h1 className="title is-4 mb-4">{t('yourResult')}: {score}</h1>
                        {newResults.length > 0 ? newResults.map((item, index) => (
                            <div key={item.id}>
                                {score <= item.easyScore ? item.easyDescription : <p>{score <= item.mediumScore ? item.mediumDescription : <p>{score <= item.hardScore ? item.hardDescription : null}</p>}</p>}
                                {showEmailForm ? (
                                    <div className={'columns my-5'}>
                                        <div className="column is-12">
                                            <form ref={form} onSubmit={sendEmail}>
                                                <input
                                                    className="input my-1 has-background-white-bis"
                                                    type="text" required placeholder="Введите имя"
                                                    name="user_name" />
                                                <input
                                                    className="input my-1 has-background-white-bis"
                                                    type="email"
                                                    required
                                                    placeholder="Email"
                                                    name="user_email" />
                                                <textarea
                                                    className="textarea is-hidden"
                                                    name="message"
                                                    placeholder=""
                                                    value={score <= item.easyScore ? item.easyDescription : score <= item.mediumScore ? item.mediumDescription : score <= item.hardScore ? item.hardDescription : null} />
                                                <input
                                                    className="button is-fullwidth is-blue my-1"
                                                    type="submit"
                                                    value="Отправить" />
                                            </form>
                                        </div>
                                    </div>
                                ) : null}
                                {showSuccessMessage ? (
                                    <div className="my-4">
                                        <h1 className="is-size-4 has-text-success">Ваш результат успешно отправлен!</h1>
                                    </div>
                                ) : null}
                            </div>
                        )) : null}

                    </div>
                </div>

                <div className="column is-4-desktop is-offset-1">
                    <QuizSocialShare />
                </div>
            </div>

            <div className="columns is-centered">
                <div className="column is-3">
                    <button className="button is-blue is-fullwidth" onClick={() => setStartQuestion(false)}>
                        {t('again')}
                    </button>
                </div>

                <div className="column is-5">
                    <button className="button is-blue is-outlined is-fullwidth" onClick={() => setShowEmailForm(!showEmailForm)}>
                        {width <= 350 ? t('send') : t('sendResult')}
                    </button>
                </div>
                <div className="column is-3">
                    <button className="button is-dark is-outlined is-fullwidth">{t('otherTest')}</button>
                </div>
            </div>
        </div>
    )
}
