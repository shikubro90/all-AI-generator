import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function MoodDetector() {
    const [input, setInput] = React.useState('')
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [showResult, setShowResult] = React.useState(false)

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Detect the mood of the following text and also explain how you detected the mood :\n\n${input}\n\nMood:
            1. Happy, 2. Sad, 3. Angry, 4. Neutral, 5. Excited, 6. Bored, 7. Anxious, 8. Confused, 9. Disgusted, 10. Fearful, 11. Surprised, 12. Other\n\n`,
            temperature: 0,
            max_tokens: 1500,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        let result_ = response.data.choices[0].text.split('\n')
        setResult(result_)
        setShowResult(true)
    }

    const copyMoodText = () => {
        navigator.clipboard.writeText(result[0])
        toast.success('Copied to clipboard')
    }

    return (
        <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
            <div className='flex flex-col w-full justify-center items-center gap-y-6 py-6 mt-5'>
                <div className='flex flex-row items-center justify-center w-full h-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Mood Detector 😀</h1>
                </div>
                {/* display results */}
                {/* input box at end of screen */}
                <p className='text-lg md:text-xl text-center text-primary font-body mt-6 px-6'>Want to know your mood ? <br/> We'll detect your mood using your recent text messages</p>
                {showInputSection ? <div className="flex flex-col gap-y-5 items-center justify-center mt-16 w-full md:w-6/12 px-4">
                    <p className="text-xl text-center font-bold text-primary font-body w-full">Enter your recent messages (3-4)</p>
                    <textarea rows={5} onChange={(e) => { setInput(e.target.value) }} className="transition w-full p-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none placeholder:text-primary/50 focus:ring-4 focus:ring-primary/20" type="text" placeholder="Enter your text here" />
                    <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Detect Mood 😄</button>
                </div> : null}
                {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Loading happiness, Please Wait 😊</p> : null}
                {showResult ? <div className='flex flex-col h-full font-body mt-12 px-5 text-primary item-start w-full lg:w-2/3'>
                    <p className='text-lg font-bold'>Result :</p>
                    {result.map((item) => (
                        <p className='text-lg text-primary mt-1'>{item}</p>
                    ))}
                    <div className='mt-6 flex flex-col items-center justify-center w-full h-auto'>
                        <div><Toaster position="bottom-center"
                            reverseOrder={false} /></div>
                        {/* copy button */}
                        <button onClick={() => copyMoodText()} className='transition w-1/2 px-4 py-4 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border'>Copy</button>
                        <button onClick={() => { setShowInputSection(true); setShowResult(false) }} className='transition w-1/2 px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div>
                </div> : null}
                {/* button to go back */}
            </div>
        </div>
    )
}

export default MoodDetector