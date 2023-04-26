import React from 'react'
import cn from 'classnames'

export default function Loader({ large, center, className, padded = false, show = true }) {
    const classes = cn(className, 'loader', {
        'is-size-1': large,
        'align-center': center,
        'is-padded': padded,
    })
    return show ? <span className={classes} /> : null
}
