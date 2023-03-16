import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function TweetGenerator() {
    const [topicInput, setTopicInput] = React.useState('')
    const [toneInput, setToneInput] = React.useState('')
    const [lengthInput, setLengthInput] = React.useState('')
    const [keywords, setKeywords] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [generatedTweets, setGeneratedTweets] = React.useState([])
    const [resultGenerated, setResultGenerated] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)

    const handleToneChange = (e) => {
        setToneInput(e.target.value)
    }

    const handleTopicChange = (e) => {
        setTopicInput(e.target.value)
    }

    const handleLengthChange = (e) => {
        setLengthInput(e.target.value)
    }

    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value)
    }

    const copyTweet = (tweet) => {
        navigator.clipboard.writeText(tweet)
        toast.success('Copied')
    }

    const onClickMore = async () => {
        setShowInputSection(false)
        setBtnLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `(Add -1 after end of each tweet).
            Generate 2-3 tweets about ${topicInput} with tone ${toneInput} and length ${lengthInput} and keywords ${keywords}. Please alway keep length of tweets less than 280 characters. but equal to or more than ${lengthInput} characters.`,
            temperature: 0.4,
            max_tokens: 1200,
            top_p: 0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setBtnLoading(false)
        let result_ = response.data.choices[0].text.split('-1')
        result_.pop()
        // remove tweet count like 1., 2., from start of each tweet
        result_ = result_.map((tweet) => {
            return tweet.slice(tweet.indexOf('.') + 1)
        })
        console.log(result_)
        // keep old tweets and add new tweets
        setGeneratedTweets([...generatedTweets, ...result_])
    }

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `(Add -1 after end of each tweet). Generate 2-3 tweets about ${topicInput} with tone ${toneInput} and length ${lengthInput} and keywords ${keywords}. Please alway keep length of tweets less than 280 characters. but equal to or more than ${lengthInput} characters.`,
            temperature: 0.4,
            max_tokens: 1200,
            top_p: 0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        let result_ = response.data.choices[0].text.split('-1')
        result_.pop()
        result_ = result_.map((tweet) => {
            return tweet.slice(tweet.indexOf('.') + 1)
        })
        setGeneratedTweets(result_)
        console.log(result_)
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
                        <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Tweet Generator 🐦</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 lg:px-0 lg:w-2/6 mt-12">
                        <p className='text-md md:text-lg text-center font-normal text-primary font-body px-5'>Use our curated Tweet Generator Tool to get the best tweets ready to be published in matter of seconds with just few clicks</p>
                    </div>
                    {showInputSection ? <div className="flex flex-col items-start justify-center w-full px-4 lg:px-0 lg:w-2/6 mt-12 mb-12">
                        <h1 className='text-lg text-primary font-body mb-1'>Enter your tweet topic</h1>
                        <input onChange={handleTopicChange} className='placeholder:text-primary/50 transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20' type="text" placeholder='Health, Tech' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Select your tone</h1>
                        <select onChange={handleToneChange} className='placeholder:text-primary/50 transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20'>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                            <option value="neutral">Neutral</option>
                            <option value="humorous">Humorous</option>
                        </select>
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your tweet length</h1>
                        <input onChange={handleLengthChange} className='placeholder:text-primary/50 transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20' type="text" placeholder='150, 250 etc' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your keywords</h1>
                        <input onChange={handleKeywordsChange} className='placeholder:text-primary/50 transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20' type="text" placeholder='2021 Data, US Example, Simple, Realistic' />
                        <button className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent' onClick={onClick}>Generate 🚀 </button>
                    </div> : null}
                    {resultGenerated ? <div className='flex flex-col items-center justify-center w-full lg:px-0 lg:w-2/6 mt-12 px-6 mb-12'>
                        <h1 className='text-xl text-primary font-body font-bold mb-1'>Generated Tweets</h1>
                        <p className='text-sm lg:text-md text-primary font-body mb-1 text-center'>Click on any tweet to copy it to your clipboard</p>
                        {generatedTweets.map((tweet, index) => {
                            return (
                                <div onClick={() => copyTweet(tweet)} className='flex flex-row items-center justify-between w-full px-4 py-4 mt-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg hover:bg-primary/5 hover:cursor-pointer'>
                                    <p>{tweet}</p>
                                </div>
                            )
                        })
                        }
                        {/* generate more button */}
                        <button onClick={onClickMore} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>{!btnLoading ? 'Generate More' : 'Generating'} </button>
                        <button onClick={() => { setShowInputSection(true); setResultGenerated(false) }} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-primary font-body border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div> : null}
                    {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Digging for gold tweets... Standby. 😃</p> : null}
                </div>
            </div>
        </>
    )
}

export default TweetGenerator