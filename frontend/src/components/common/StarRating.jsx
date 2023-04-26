import { useState } from 'react'
import { Star } from 'react-feather'

export default function StarRating({ index, answerOption, handleAnswerOptionClick }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (
        <button
            type="button"
            /* eslint-disable-next-line react/no-array-index-key */
            key={answerOption.id}
            onClick={() => {
                handleAnswerOptionClick(answerOption.correct, index)
                setRating(index)
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            <Star
                size={38}
                color={index <= (hover || rating) ? '#45A7F5' : '#ddd'}
                fill={index <= (hover || rating) ? '#45A7F5' : '#ddd'} />
        </button>
    )
}
