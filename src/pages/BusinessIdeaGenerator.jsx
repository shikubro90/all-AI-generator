import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function BusinessIdeaGenerator() {
    const [interestInput, setInterestInput] = React.useState('')
    const [skillsInput, setSkillsInput] = React.useState('')
    const [targetInput, setTargetInput] = React.useState('')
    const [marketResearch, setMarketResearch] = React.useState('')
    const [budget, setBudget] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [generatedIdeas, setGeneratedIdeas] = React.useState([])
    const [resultGenerated, setResultGenerated] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)

    const handleInterestChange = (e) => {
        setInterestInput(e.target.value)
    }
    const handleSkillsChange = (e) => {
        setSkillsInput(e.target.value)
    }
    const handleTargetChange = (e) => {
        setTargetInput(e.target.value)
    }
    const handleMarketResearchChange = (e) => {
        setMarketResearch(e.target.value)
    }
    const handleBudgetChange = (e) => {
        setBudget(e.target.value)
    }

    const copyIdea = (idea) => {
        navigator.clipboard.writeText(idea)
        toast.success('Copied to clipboard')
    }

    const onClickMore = async() => {
        setShowInputSection(false)
        setBtnLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Add -1 at the end of each idea. Generate 5 business ideas along with little explaination for ${interestInput} with skills ${skillsInput} and target ${targetInput} and market research ${marketResearch} and keep business idea within budget ${budget}`,
            temperature: 0.2,
            max_tokens: 2000,
            top_p: 1.0,
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
        setGeneratedIdeas([...generatedIdeas, ...result_])
    }

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Add -1 at the end of each idea. Generate 5 business ideas for ${interestInput} with skills ${skillsInput} and target ${targetInput} and market research ${marketResearch} and keep business idea within budget ${budget}`,
            temperature: 0.4,
            max_tokens: 1200,
            top_p: 0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        let result_ = response.data.choices[0].text.split('-1')
        result_.pop()
        // remove tweet count like 1., 2., from start of each idea
        result_ = result_.map((idea) => {
            return idea.slice(idea.indexOf('.') + 1)
        })
        setGeneratedIdeas(result_)
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
                        <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Business Ideas Generator ⭐</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 lg:px-0 lg:w-2/6 mt-12">
                        <p className='text-md md:text-lg text-center font-normal text-primary font-body px-5'>Use our business Generator to generates business ideas ready to be deployed within few seconds</p>
                    </div>
                    {showInputSection ? <div className="flex flex-col items-start justify-center w-full px-4 lg:px-0 lg:w-2/6 mt-12 mb-12">
                        <h1 className='text-lg text-primary font-body mb-1'>Enter your Interest or Passion</h1>
                        <input onChange={handleInterestChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Traveling, Photography, Hiking etc' />

                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your skills</h1>
                        <input onChange={handleSkillsChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Graphic design, Web development, Public speaking etc' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Your Target Audience</h1>
                        <input onChange={handleTargetChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='College students, Fitness enthusiasts, Working professionals etc' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your Budget</h1>
                        <input onChange={handleBudgetChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Willing to invest up to $20,000 in the first year of the business' />

                        <button className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent' onClick={onClick}>Generate 🚀 </button>
                    </div> : null}
                    {resultGenerated ? <div className='flex flex-col items-center justify-center w-full lg:px-0 lg:w-2/6 mt-12 px-6 mb-12'>
                        <h1 className='text-xl text-primary font-body font-bold mb-1'>Generated Tweets</h1>
                        <p className='text-sm lg:text-md text-primary font-body mb-1 text-center'>Click on any tweet to copy it to your clipboard</p>
                        {generatedIdeas.map((idea) => {
                            return (
                                <div onClick={() => copyIdea(idea)} className='flex flex-row items-center justify-between w-full px-4 py-4 mt-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg hover:bg-primary/5 hover:cursor-pointer'>
                                    <p>{idea}</p>
                                </div>
                            )
                        })
                        }
                        {/* generate more button */}
                        <button onClick={onClickMore} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>{!btnLoading ? 'Generate More' : 'Generating'} </button>
                        <button onClick={() => { setShowInputSection(true); setResultGenerated(false) }} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-primary font-body border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div> : null}
                    {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Finding Ideas for you... Standby 😌</p> : null}
                </div>
            </div>
        </>
    )
}

export default BusinessIdeaGenerator