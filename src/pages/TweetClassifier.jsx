import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function TweetClassifier() {
    const [input, setInput] = React.useState('')
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const onClick = async () => {
        setLoading(true)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Classify the sentiment in these tweets: ${input}`,
            temperature: 0,
            max_tokens: 200,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        let result_ = response.data.choices[0].text.split('\n')
        setResult(result_)
        console.log(result)
    }

    return (
        <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
            <div className='flex flex-col w-full justify-center items-center gap-y-6 py-6 mt-5'>
                <div className='flex flex-row items-center justify-center w-full h-auto'>
                    <h1 className='text-4xl font-bold text-primary font-body'>Tweet Classifier 🐦</h1>
                </div>
                <p className='text-lg text-primary font-body mt-6'>Classify the sentiment in these tweets</p>
                <div className="flex flex-col items-center justify-center md:w-9/12 lg:w-6/12 mt-16 w-11/12">
                    <textarea rows={5} onChange={(e) => { setInput(e.target.value) }} className="w-full transition px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20" type="text" placeholder="Enter Tweets Here" />
                    <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Classify 👀</button>
                </div>
                {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Guessing sentiments in your tweets, Please Wait 🚀</p> : null}
                {result.length > 0 ? <div className='flex flex-col h-full font-body mt-12 px-5 text-primary item-start w-full lg:w-2/3'>
                    <p className='text-lg font-bold'>Result :</p>
                    {result.map((item) => (
                        <p className='text-lg text-primary mt-1'>{item}</p>
                    ))}
                </div> : null}
            </div>
        </div>
    )
}

export default TweetClassifier