export default function QuizCheckBox({ answerOption, handleAnswerOptionClick }) {
    return (
        <div key={answerOption.id} className="control my-5">
            <label className="container-checkbox">
                <input type="checkbox" onClick={() => handleAnswerOptionClick(answerOption.correct, answerOption.ball)} />
                <span className="checkmark" />
                <span className="">{answerOption.text}</span>
            </label>
        </div>
    )
}
