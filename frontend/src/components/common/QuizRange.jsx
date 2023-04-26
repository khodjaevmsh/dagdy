import { useState } from 'react'

export default function QuizRange({ index, handleAnswerOptionClick, answerOption }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (

        <button
            type="button"
            className={index <= (hover || rating) ? 'num-range is-size-6 has-text-white mx-2' : 'num-range-active is-size-6 has-text-grey mx-2'}
            /* eslint-disable-next-line react/no-array-index-key */
            key={answerOption.id}
            onClick={() => {
                answerOption(answerOption.correct, index)
                setRating(index)
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            {answerOption.text.slice(0, 2)}
        </button>
    )
}
