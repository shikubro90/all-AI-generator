import React from 'react'
import heroImg from '../assets/hero.png'
import Footer from './Footer'
import logo from '../assets/logo.svg'

function Landing() {
    const tools = [
        {
            icon: '🗣️',
            name: 'Chatbot',
            description: 'Chat with a interactive Chatbot',
            link: '/chatbot'
        },
        {
            icon: '🖼️',
            name: 'Image Generator',
            description: 'Generate images from text',
            link: '/img-generator'
        },
        {
            icon: '🐦',
            name: 'Tweet Classifier',
            description: 'Classify the sentiment in these tweets',
            link: '/tweet-classifier'
        },
        {
            icon: '🧮',
            name: 'Math Solver',
            description: 'Solve math problems using AI',
            link: '/math-solver'
        },
        {
            icon: '🔮',
            name: 'Algorithm Designer',
            description: 'Design efficient algorithms using AI',
            link: '/algorithm-generator'
        },
        {
            icon: '📝',
            name: 'Text Summarizer',
            description: 'Summarize a very long text',
            link: '/text-summarizer'
        },
        {
            icon: '😀',
            name: 'Mood Detector',
            description: 'Detect the mood of a text',
            link: '/mood-detector'
        },
        {
            icon: '⭐',
            name: 'Business Idea Generator',
            description: 'Generate market ready business ideas',
            link: '/idea-generator'
        },
        {
            icon: '🐦',
            name: 'Tweets Generator',
            description: 'Generate tweets from a prompt',
            link: '/tweets-gen'
        },
        {
            icon: '🌄',
            name: 'Trip Planner',
            description: 'Plan your next trip using AI',
            link: '/trip-planner'
        },
        {
            icon: '📙',
            name: 'Story Book Generator',
            description: 'Generate a story book from a prompt',
            link: '/storybook-generator'
        },
    ]
    return (
        <>
            <div className='flex flex-col w-full min-h-screen bg-[#EBEAFC] px-6 md:px-24 lg:px-56'>
                {/* Header Bar */}
                <div className='flex flex-row items-center justify-center w-full h-16 px-5 mt-4'>
                    <img src={logo} alt='logo' className='mt-36 w-44' />
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-center w-full mt-44'>
                    <div className='flex flex-col items-center lg:items-start w-full lg:w-1/2'>
                        <h1 className='text-3xl lg:text-5xl text-center lg:text-left font-bold text-primary font-body leading-snug'>
                            Discover highly useful <br /> artificial intelligence tools at one place
                        </h1>
                        <p className='text-xl text-center lg:text-left text-primary font-body mt-6 w-full lg:w-4/5'>
                            AI Coding is a platform that provides you with a wide range of AI tools that can help you in your day to day life. These tools are designed to be highly useful and easy to use.
                        </p>
                        <a href='/chatbot' className='bg-primary transition ease-linear text-white font-body font-normal text-lg px-8 py-4 rounded-lg mt-20 hover:-translate-y-1'>
                            Get Started
                        </a>
                    </div>
                    <div className='flex flex-col items-start w-auto lg:w-1/2 mt-12 lg:mt-0'>
                        <img src={heroImg} alt='hero' className='hover:-translate-y-1 transition-all ease-linear' />
                    </div>
                </div>
                <div className='flex flex-col items-center lg:items-start justify-center w-full mt-24 mb-12'>
                    <h1 className='text-2xl md:text-5xl text-center lg:text-left font-bold text-primary font-body'>
                        Explore our tools
                    </h1>
                    <p className='text-md md:text-xl text-primary text-center lg:text-left font-body mt-6 w-3/5'>
                        We have a wide range of tools that can help you in your day to day life.
                    </p>
                    <div className='flex flex-col flex-wrap md:flex-row items-start justify-start w-full mt-24'>
                        {tools.map((tool, index) => (
                            <div className='flex flex-col items-center justify-evenly w-full md:w-3/6 lg:w-3/12 gap-x-3 p-2 lg:p-4 cursor-pointer hover:-translate-y-1 transition-all' key={index}>
                                <a href={tool.link} className='flex flex-col items-center justify-evenly w-full h-64 bg-[#F6F6FD] shadow-xl border border-primary/30 rounded-2xl p-6 gap-y-2'>
                                    <h1 className='text-5xl font-bold text-primary font-body mt-3'>
                                        {tool.icon}
                                    </h1>
                                    <div className='flex flex-col items-center justify-center w-full h-full mt-4 gap-y-2'>
                                        <h1 className='text-2xl text-center font-bold text-primary font-body'>
                                            {tool.name}
                                        </h1>
                                        <p className='text-lg text-center text-primary font-body w-4/5'>
                                            {tool.description}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Why us */}
                <div className='flex flex-col items-center lg:items-start justify-start w-full mt-24 mb-12 bg-secondary p-6 md:p-12 rounded-xl shadow-lg shadow-primary/10'>
                    <h1 className='text-5xl font-bold text-primary font-body'>
                        Why us?
                    </h1>
                    <p className='text-md lg:text-2xl text-primary text-center lg:text-left font-body mt-6'>
                        Although you can use ChatGPT to generate text, but you dont know how to get the best results. We have designed our tools to be highly useful and easy to use. We have also designed our tools to be highly customizable so that you can get the best results. Moreover These tool will also save time as you dont have to think which input will give you best results. We are also working on adding more tools to our platform.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Landing