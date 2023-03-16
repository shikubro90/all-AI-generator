import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import jsPDF from 'jspdf';
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function TripPlanner() {
    const [destination, setDestination] = React.useState('')
    const [totalDays, setTotalDays] = React.useState('')
    const [interests, setInterests] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [generatedPlan, setGeneratedPlan] = React.useState([[]])
    const [resultGenerated, setResultGenerated] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)

    const handleDestinationChange = (e) => {
        setDestination(e.target.value)
    }
    const handleTotalDaysChange = (e) => {
        setTotalDays(e.target.value)
    }
    const handleInterestsChange = (e) => {
        setInterests(e.target.value)
    }

    const savePlan = () => {
        const doc = new jsPDF();

        doc.text(`Trip Plan for ${destination}`, 10, 10);
        doc.internal.pageSize.width = 500
        let plan_ = []
        generatedPlan.forEach((plan, index) => {
            if(plan.split(" ").length > 30){
                let plan__ = plan.split(" ")
                let plan___ = []
                for(let i = 0; i < plan__.length; i++){
                    if(i % 30 === 0 && i !== 0){
                        plan___.push(plan__.slice(i-30, i).join(" "))
                    }
                }
                plan___.push(plan__.slice(plan__.length-30, plan__.length).join(" "))
                plan_ = [...plan_, ...plan___]
            }
            else{
                plan_.push(plan)
            }
        })
        doc.text(plan_, 10, 20);
        doc.save('trip-plan.pdf');
    }

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Add -1 at the end of each day to indicate end of nth number of day and Dont make list or add any line count. Generate a trip plan for a person who is visiting ${destination} for ${totalDays} days and his/her interests are as follows : ${interests}. Only generate plan and dont add anything else.`,
            temperature: 0.2,
            max_tokens: 2000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        const plan = response.data.choices[0].text.split("-1")
        plan.pop()
        setGeneratedPlan(plan)
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
                        <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Trip Planner 🌄</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 lg:px-0 lg:w-2/6 mt-12">
                        <p className='text-md md:text-lg text-center font-normal text-primary font-body'>You're visiting somewhere first time ? <br />We'll create a plan for you.</p>
                    </div>
                    {showInputSection ? <div className="flex flex-col items-start justify-center w-full px-4 lg:px-0 md:w-3/6 lg:w-2/6 mt-12 mb-12">
                        <h1 className='text-lg text-primary font-body mb-1'>Enter your Destination</h1>
                        <input onChange={handleDestinationChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Lahore, Istanbul, Dubai etc' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter your Interests</h1>
                        <input onChange={handleInterestsChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Art, Culture, Food etc' />
                        <h1 className='text-lg text-primary font-body mt-4 mb-1'>Enter total days</h1>
                        <input onChange={handleTotalDaysChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='5, 10, 15 etc' />
                        <button className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent' onClick={onClick}>Generate 🚀 </button>
                    </div> : null}
                    {resultGenerated ? <div className='flex flex-col items-center justify-center w-full lg:px-0 lg:w-2/6 md:w-5/6 mt-12 px-6 mb-12'>
                        <h1 className='text-xl text-primary font-body font-bold mb-1'>Generated Plan</h1>
                        {generatedPlan.map((idea) => {
                            return (
                                <div className='flex flex-row items-center justify-between w-full px-4 py-4 mt-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg hover:bg-primary/5 hover:cursor-pointer'>
                                    <p>{idea}</p>
                                </div>
                            )
                        })
                        }

                        <button onClick={savePlan} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Save Plan 📄 </button>
                        <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>{!btnLoading ? 'Generate More' : 'Generating'} </button>
                        <button onClick={() => { setShowInputSection(true); setResultGenerated(false) }} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-primary font-body border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div> : null}
                    {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>We're sorting your days. Hold Tight ☕</p> : null}
                </div>
            </div>
        </>
    )
}

export default TripPlanner