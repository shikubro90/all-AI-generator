import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import {RiMenu2Line} from 'react-icons/ri'
import logo_text from '../assets/text_logo.svg'

import '../App.css'

function Sidebar(props) {
    const [active, setActive] = React.useState()
    const [hideTop, setHideTop] = React.useState(false)
    const [menu, setMenu] = React.useState([
        {
            id: 1,
            name: '💬 Chat Bot',
            link: '/chatbot',
        },
        {
            id: 2,
            name: '📷 Image Generation',
            link: '/img-generator',
        },
        {
            id: 3,
            name: '🐦 Tweet Classifier',
            link: '/tweet-classifier',
        },
        {
            id: 4,
            name: '📈 Math Problem Solver',
            link: '/math-solver',
        },
        {
            id: 5,
            name: '🔮 Algorithm Design',
            link: '/algo-generator',
        },
        {
            id: 6,
            name: '📝 Text Summarizer',
            link: '/text-summarizer',
        },
        {
            id: 7,
            name: '😀 Mood Detector',
            link: '/mood-detector',
        },
        {
            id: 8,
            name: '⭐ Business Ideas Generator',
            link: '/idea-generator',
        },
        {
            id: 9,
            name: '🐦 Tweet Generator',
            link: '/tweets-gen',
        },
        {
            id: 10,
            name: '🌄 Trip Planner',
            link: '/trip-planner',
        },
        {
            id: 11,
            name: '📙 Story Writing',
            link: '/story-gen',
        },
    ])

    React.useEffect(() => {
        if(active) {
            document.getElementById('topbar').classList.add('hidden')
            document.getElementById('topbar').classList.remove('flex')
            document.getElementById('main').classList.add('hidden')
            document.getElementById('main').classList.remove('flex')
        }else{
            document.getElementById('topbar').classList.remove('hidden')
            document.getElementById('topbar').classList.add('flex')
            document.getElementById('main').classList.remove('hidden')
            document.getElementById('main').classList.add('flex')
        }
    }, [active])


    return (
        <div className='flex flex-col lg:flex-row min-h-screen'>
            {/* create sidebar */}
            <div id='topbar' className="flex lg:hidden flex-col h-20 bg-primary sticky top-0 shadow-lg">
                <div className='flex flex-row items-center justify-between w-full h-full px-4 text-secondary'>
                    <RiMenu2Line className="transition text-3xl text-secondary cursor-pointer" onClick={() => setActive(!active) && setHideTop(!hideTop)} />
                    <a href='/'>
                        <img src={logo_text} alt='logo' className='w-52 p-4' />
                    </a>
                    <div className='w-auto bg-secondary/20'></div>
                </div>
            </div>
            {active ? <div className="transition flex lg:hidden items-center justify-center flex-col w-screen min-h-screen bg-primary/20">
                <div className='flex flex-row items-center justify-center w-full h-20 text-secondary top-0 bg-primary z-10 fixed'>
                    <IoCloseSharp className="relative transition text-3xl text-secondary cursor-pointer" onClick={() => setActive(!active) && setHideTop(!hideTop)} />
                </div>
                <div className='flex flex-row items-center justify-center w-full text-secondary bg-primary'>
                    <ul className="flex flex-col justify-center w-full h-full mt-20">
                        {menu.map((item) => (
                            <a className='w-full' href={item.link} key={item.id}>
                                {props.activeItem === item.id ? <li className=" transition  px-5 py-5 text-lg font-bold font-body text-secondary">
                                    {item.name}
                                </li> : <li className="transition px-5 py-5 text-lg font-normal font-body bg-primary text-secondary/80">
                                    {item.name}
                                </li>}
                            </a>
                        ))}
                    </ul>
                </div>
            </div> : null}
            {/* large */}
            <div className="flex-col hidden lg:flex lg:w-1/5 h-screen bg-primary shadow-lg sticky left-0 top-0 justify-between border-r border-secondary/20">
                {/* create sidebar header */}
                <a href='/' className="flex flex-row items-center justify-start px-8 w-full h-24 bg-primary/5 border-b border-secondary/20">
                    <img src={logo_text} alt='logo' className='w-56' />
                </a>
                {/* create sidebar menu */}
                <div className="flex flex-col items-center w-full h-full">
                    <ul className="flex flex-col items-center w-full h-full">
                    {menu.map((item) => (
                            <a className='w-full' href={item.link} key={item.id}>
                                {props.activeItem === item.id ? <li className="flex flex-row transition items-center justify-center lg:justify-start px-5 py-5 text-lg font-bold font-body bg-secondary/10 text-secondary">
                                    {item.name}
                                </li> : <li className="flex flex-row transition items-center justify-center lg:justify-start px-5 py-5 text-lg font-normal font-body text-secondary hover:bg-secondary/10">
                                    {item.name}
                                </li>}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
            {/* props */}
            <div id="main" className="w-full h-full">
            {props.children}
            </div>
        </div>
    )
}

export default Sidebar