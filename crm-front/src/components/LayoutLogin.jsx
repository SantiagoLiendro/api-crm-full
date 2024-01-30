import { Outlet } from 'react-router-dom'

const LayoutLogin = () => {
    return (
        <div className=' md:flex md:min-h-screen'>
            <aside className='md:w-2/6 lg:w-3/12 md:h-screen flex md:items-center justify-center ' >
                <h2 className='mt-20 md:mt-0 text-3xl text-center py-6 font-extrabold'>CRM <span className='text-bold text-sky-950'>Practica</span></h2>

            </aside>

            <main className='md:w-4/6 lg:w-9/12 h-screen bg-sky-950 flex items-center'>
                <Outlet />
            </main>

        </div>
    )
}

export default LayoutLogin