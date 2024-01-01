import React, { useRef } from 'react'

const IndeterminateCheckbox = ({ indeterminate, className = '', ...rest }) => {
    const ref = useRef(null)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current !== null) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

export default IndeterminateCheckbox
