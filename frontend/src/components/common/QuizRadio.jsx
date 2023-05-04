export default function QuizRadio({ answers, handleAnswerOptionClick }) {
    return (
        answers.response ? answers.response.results.map((answerOption) => (
            <div key={answerOption.id} className="control my-5">
                <label className="radio">
                    <input
                    // className={1 === index ? 'selected-answer' : null}
                        onClick={() => handleAnswerOptionClick(answerOption.correct, answerOption.ball)}
                        type="radio"
                        name="foobar" />
                    <span className="mx-3">{answerOption.text}</span>
                </label>
            </div>
        )) : null
    )
}
