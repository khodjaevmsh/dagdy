export default function QuizCheckBox({ answers, handleAnswerOptionClick }) {
    return (
        answers.response ? answers.response.results.map((answerOption) => (
            <label key={answerOption.id} className="container-checkbox">
                <input type="checkbox" onClick={() => handleAnswerOptionClick(answerOption.correct, answerOption.ball)} />
                <span className="checkmark" />
                <span className="">{answerOption.text}</span>
            </label>
        )) : null
    )
}
