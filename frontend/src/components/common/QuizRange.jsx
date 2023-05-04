import { useState } from 'react'

export default function QuizRange({ handleAnswerOptionClick, answers }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (

        <div className="star-rating">
            {answers.response ? answers.response.results.map((star, index) => {
                index += 1
                return (
                    <button
                        type="button"
                        className={index <= (hover || rating) ? 'num-range is-size-6 has-text-white mx-2' : 'num-range-active is-size-6 has-text-grey mx-2'}
                        /* eslint-disable-next-line react/no-array-index-key */
                        key={star.id}
                        onClick={() => {
                            handleAnswerOptionClick(star.correct, star.ball)
                            setRating(index)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}>
                        {star.text.slice(0, 2)}
                    </button>
                )
            }) : null}
        </div>

    )
}
