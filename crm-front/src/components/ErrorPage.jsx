

const ErrorPage = ({ mensaje }) => {
    return (
        <div className='bg-red-500 h-16 flex flex-col justify-center'>
            <h3 className='text-red-100 text-center uppercase font-bold'>{mensaje}</h3>

        </div>
    )
}

export default ErrorPage