import React from 'react'

const Error = ({ mensaje }) => {
    return (
        <p className='bg-red-300 text-red-900 p-2 '>{mensaje}</p>
    )
}

export default Error