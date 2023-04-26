import React, { Fragment } from 'react'
import useTrans from '../../hooks/trans'

function ErrorItem({ field, error }) {
    if (field === 'nonFieldErrors' || field === 'detail') {
        return <li><strong>{error}</strong></li>
    }

    return (
        <li>
            <strong>{field}: </strong>
            {error[0]}
        </li>
    )
}

export default function ServerError({ error }) {
    const t = useTrans()
    if (!error || !error.data) return <Fragment />

    return (
        <div className="message is-danger">
            <div className="message-body">
                <ul>
                    {typeof error.data === 'string' ? (
                        <ErrorItem field="detail" error={t('unknownError')} />
                    ) : Object.keys(error.data).map((key) => (
                        <ErrorItem key={key} field={key} error={error.data[key]} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
