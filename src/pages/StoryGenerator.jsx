import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function StoryGenerator() {
    const [genre, setGenre] = React.useState('')
    const [theme, setTheme] = React.useState('')
    const [character, setCharacter] = React.useState('')
    const [words, setWords] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [result, setResult] = React.useState('')
    const [resultGenerated, setResultGenerated] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)

    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }
    const handleThemeChange = (e) => {
        setTheme(e.target.value)
    }
    const handleCharacterChange = (e) => {
        setCharacter(e.target.value)
    }
    const handleWordsChange = (e) => {
        setWords(e.target.value)
    }

    const copyToClip = () => {
        navigator.clipboard.writeText(result)
        toast.success("Copied to clipboard")
    }

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "I want to write a story about " + genre + " with a theme of " + theme + " and a character named " + character + " and I want it to be " + words + " words long"}]
        })
        setResult(response.data.choices[0].message.content)
        setLoading(false)
        setResultGenerated(true)
    }

    return (
        <>
            <div><Toaster
                position="bottom-center"
                reverseOrder={false} />
            </div>
            <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
                <div className='flex flex-col w-full justify-center items-center gap-y-6 py-6 mt-5'>
                    <div className='flex flex-row items-center justify-center w-full h-auto'>
                        <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Story Generator 📙</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 lg:px-0 lg:w-2/6 mt-12">
                        <p className='text-md md:text-lg text-center font-normal text-primary font-body'>Use our story generator tool to write a short stories quickly and more precisely</p>
                    </div>
                    {showInputSection ? <div className="flex flex-col items-start justify-center w-full px-4 lg:px-0 lg:w-2/6 mt-12 mb-12">
                        <h1 className='text-lg text-primary font-body mb-1'>Enter Story Genre</h1>
                        <input onChange={handleGenreChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Fantasy, Crime, Drama' />

                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your story theme</h1>
                        <textarea rows={3} onChange={handleThemeChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='A naughty boy alway doing things wrong but one day he became successful' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Describe your character</h1>
                        <input onChange={handleCharacterChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='A boy with naughty traits' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>
                            Enter the number of words
                        </h1>
                        <input onChange={handleWordsChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='500, 750 etc' />

                        <button className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent' onClick={onClick}>Generate 🚀 </button>
                    </div> : null}
                    {resultGenerated ? <div className='flex flex-col items-center justify-center w-full lg:px-0 lg:w-3/6 mt-12 px-6 mb-12'>
                        <h1 className='text-xl text-primary font-body font-bold mb-1'>Generated Story</h1>
                        <p className='text-sm lg:text-md text-primary font-body mb-1 text-center'>Click on story to copy it to your clipboard</p>
                        <div onClick={copyToClip} className='flex flex-row items-center justify-between w-full px-4 py-4 mt-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg hover:bg-primary/5 hover:cursor-pointer'>
                            {result}
                        </div>
                        {/* generate more button */}
                        <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>{!btnLoading ? 'Generate More' : 'Generating'} </button>
                        <button onClick={() => { setShowInputSection(true); setResultGenerated(false) }} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-primary font-body border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div> : null}
                    {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Writing a perfect story for you. Hold on ❗</p> : null}
                </div>
            </div>
        </>
    )
}

export default StoryGenerator