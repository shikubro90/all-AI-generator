import React from 'react'
import {HiDotsHorizontal} from 'react-icons/hi'
import {Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function ChatBot() {
    const [startChat, setStartChat] = React.useState(false)
    const [input, setInput] = React.useState('')
    const [converstation, setConversation] = React.useState([{
        usrInput: '',
        botInput: ''
    }])
    const [loading, setLoading] = React.useState(false)

    const checkKey = (e) => {
        if(e.key === 'Enter'){
            onClick()
        }
    }

    const onClick = async() => {
        setLoading(true)
        if(startChat === false){
            converstation.pop()
            setStartChat(true)
        }
        setConversation([...converstation, {usrInput: input, botInput: ''}])
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Answer this question: ${input}. also keep this context in mind: ${converstation.map((item) => item.botInput).join(' ')}`,
            max_tokens: 300,
            temperature: 0.9,
            top_p: 1,
            presence_penalty: 0,
            frequency_penalty: 0.2,
        })
        setLoading(false)
        setConversation([...converstation, {usrInput: input, botInput: response.data.choices[0].text}])
        setInput('')
        document.querySelector('input').value = ''
    }

    return (
        <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
            <div className='flex flex-col w-full justify-center items-center py-6 mt-5'>
                <div className='flex flex-row items-center justify-center w-full h-auto'>
                    <h1 className='text-4xl font-bold text-primary font-body'>ChatBot 💬</h1>
                </div>
                {/* display results */}
                {startChat ? <div className='flex flex-col h-full font-body mt-12 px-5 text-primary gap-y-5  w-full'>
                    {converstation.map((item) => (
                        <div className='flex flex-col lg:w-8/12 gap-y-2'>
                            <div className='flex flex-row items-center w-full gap-x-5'>
                                <p className='text-lg font-bold'>You:</p>
                                <p className='text-xl'>{item.usrInput}</p>
                            </div>
                            <div className='flex flex-row items-start w-full gap-x-5'>
                                <p className='text-xl font-bold w-auto'>Bot:</p>
                                <p className='text-xl font-bold text-primary w-auto'>{item.botInput}</p>
                            </div>
                        </div>
                    ))}
                </div> : <p className='text-md text-primary font-body mt-10'>Click on the button below to start the chat</p>}
            </div>
            {/* input box at end of screen */}
            <div className="flex flex-row items-center w-full fixed bottom-0 border-t border-primary z-40">
                <input onKeyDown={checkKey} onChange={(e)=>{setInput(e.target.value)}} className="flex flex-row w-full h-16 px-4 text-lg font-normal font-body text-primary/80 bg-secondary border-secondary/20 focus:outline-none placeholder:text-primary/50" type="text" placeholder="Type your message here" />
                {loading ? <HiDotsHorizontal className='animate-pulse text-primary/80 text-3xl mr-2' /> : null}
                <button onClick={onClick} className='px-4 py-4 md:px-12 md:py-4 bg-primary text-secondary h-16 w-auto font-body'>Send</button>
            </div>
        </div>
    )
}

export default ChatBot