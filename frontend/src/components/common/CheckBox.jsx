import { useState } from 'react'
import { useLoad } from '../../hooks/request'
import { ANSWERS, QUESTIONS } from '../../../urls'

export default function () {
    const questionData = useLoad({ url: QUESTIONS, params: { quiz: 2 } })
    const questList = questionData.response ? questionData.response.results : []

    const answers = useLoad({ url: ANSWERS, params: { question: 1 } })
    const answersList = answers.response ? answers.response.results : []

    const [data, setData] = useState({
        items: [
            { id: 1, value: 'Javascript', checked: false },
            { id: 2, value: 'HTML', checked: false },
            { id: 3, value: 'CSS', checked: false },
            { id: 4, value: 'Java', checked: false },
        ],
        submitTime: new Date().toString(),
    })

    const submitForm = (e) => {
        e.preventDefault()
        const items = data.items.filter((obj) => obj.checked === true)
        if (items.length > 1) {
            window.location = 'https://codesandbox.io'
        } else {
            alert('Hey, select atleast two please...')
        }
    }

    const updateState = (id) => {
        const updatedItems = [...data.items]
        const itemId = updatedItems.findIndex((obj) => obj.id === id)
        updatedItems[itemId].checked = !updatedItems[itemId].checked
        setData({
            ...data,
            items: updatedItems,
            submitTime: new Date().toString(),
        })
    }

    const { items, submitTime } = data
    return (
        <div className="formContainer">
            <h4>Please select a Language </h4>
            <form className="ui form" onSubmit={submitForm}>
                {questionData.response ? questionData.response.results.map((item) => (
                    <div key={item.id}>
                        <li>
                            <label htmlFor="check">
                                <input
                                    type="checkbox"
                                    id="check"
                                    value={item.text}
                                    checked={item.checked}
                                    onChange={() => updateState(item.id)}
                                />{' '}
                                {answers.text} {item.checked}
                            </label>
                        </li>
                    </div>
                )) : null}
                <input id="submitTime" name="submitTime" type="hidden" value={submitTime} />
                <input type="submit" value="Submit" className="ui button" />
            </form>
        </div>
    )
}
