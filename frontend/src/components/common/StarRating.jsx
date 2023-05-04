import { useState } from 'react'
import { Star } from 'react-feather'

export default function StarRating({ answers, handleAnswerOptionClick }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (
        <div className="star-rating">
            {answers.response ? answers.response.results.map((star, index) => {
                index += 1
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? 'on' : 'off'}
                        onClick={() => {
                            setRating(index)
                            handleAnswerOptionClick(star.correct, star.ball)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star" style={{ fontSize: 38 }}>&#9733;</span>
                    </button>
                )
            }) : null}
        </div>
    )
}
