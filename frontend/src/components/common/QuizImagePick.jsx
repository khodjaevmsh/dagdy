import { useState } from 'react'
import imageData from '../../static/default-user-image.png'

export default function QuizImagePick({ selectedAnswerIndex, onAnswerSelected, answersList, setAnswerBall }) {
    const [img, setImg] = useState(null)
    const images = [{
        id: 1, image: imageData, ball: 2,
    }]
    function onPick(image) {
        setImg({ image })
    }
    return (

        // eslint-disable-next-line react/jsx-no-bind
        <ImagePicker images={images.map((image, i) => ({ src: image, value: i }))} onPick={onPick} />
        // imageData.map((answer, index) => (
        //     <div key={answer.id} className="control my-5">
        //         <label className="checkbox">
        //             <input
        //                 type="checkbox"
        //                 onClick={() => {
        //                     onAnswerSelected(answer, index)
        //                     setAnswerBall(answer.ball)
        //                     setImg(answer.image)
        //                 }}
        //                 className={selectedAnswerIndex === index ? 'selected-answer' : null} />
        //             <span className="mx-3">{answer.text}</span>
        //         </label>
        //     </div>
    )
}
