export default function QuizRadio({ answerOption, handleAnswerOptionClick, index }) {
    return (
        <div key={answerOption.id} className="control my-5">
            <label className="radio">
                <input
                    // className={1 === index ? 'selected-answer' : null}
                    onClick={() => handleAnswerOptionClick(answerOption.correct, index)}
                    type="radio"
                    name="foobar" />
                <span className="mx-3">{answerOption.text}</span>
            </label>
        </div>
    )
}
