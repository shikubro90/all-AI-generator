import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function ImageGenerator() {
    const [input, setInput] = React.useState('')
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [showResult, setShowResult] = React.useState(false)

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createImage({
            prompt: input,
            n: 4,
            size: "1024x1024"
        });
        setLoading(false)
        for (let i = 0; i < response.data.data.length; i++) {
            result[i] = response.data.data[i].url
        }
        setResult(result)
        setShowResult(true)
    }

    return (
        <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
            <div className='flex flex-col w-full justify-center items-center gap-y-6 py-6 mt-5'>
                <div className='flex flex-row items-center justify-center w-full h-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Image Generator 📷</h1>
                </div>
                {/* display results */}
                {/* input box at end of screen */}
                <p className='text-lg md:text-xl text-center text-primary font-body mt-6 px-5'>You have picture in your mind ? <br/>Write your idea and we'll generate image for you</p>
                {showInputSection ? <div className="flex flex-col gap-y-5 items-center justify-center mt-16 w-full md:w-8/12 px-4">
                    <p className="text-xl text-center font-bold text-primary font-body w-full">Explain your idea here</p>
                    <input rows={5} onChange={(e) => { setInput(e.target.value) }} className="placeholder:text-primary/50 transition w-full p-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20" type="text" placeholder="3D render of a cute tropical fish in an aquarium on a dark blue background, digital art" />
                    <button onClick={onClick} className='transition w-1/2 px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Create 🚀</button>
                </div> : null}
                {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>We are cooking your pictures, Hold tight 🧑</p> : null}
                {showResult ? <p className='text-md text-primary/70 font-body'>Tap on image to download it</p> : null}
                {showResult ? <div className='flex flex-row flex-wrap h-full font-body mt-12 px-5 text-primary item-start w-full lg:w-7/12 gap-3'>
                    {result.map((item) => (
                        <a href={item} rel="noreferrer" download>
                            <img src={item} alt="image" className='w-96 h-auto cursor-pointer rounded-md'/>
                        </a>
                    ))}
                    <div className='mt-6 flex flex-col items-center justify-center w-full h-auto'>
                    </div>
                </div> : null}
                {/* button to go back */}
                {showResult ? <button onClick={onClick} className='transition w-52 px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Generate more 🛸</button> : null}
            </div>
        </div>
    )
}

export default ImageGenerator