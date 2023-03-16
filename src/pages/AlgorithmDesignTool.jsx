import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import jsPDF from 'jspdf';
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function AlgorithmDesignTool() {
    const [query, setQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [generatedAlgo, setGeneratedAlgo] = React.useState([[]])
    const [resultGenerated, setResultGenerated] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)

    const handlQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const copyAlgo = () => {
        navigator.clipboard.writeText(generatedAlgo.join("\n"))
        toast.success("Copied to clipboard")
    }

    const onClick = async () => {
        setShowInputSection(false)
        setLoading(true)
        setBtnLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate an algorithm for ${query}. -1(add -1 at end of each step of algorithm)`,
            temperature: 0.2,
            max_tokens: 700,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        console.log(response.data.choices[0].text)
        const algo = response.data.choices[0].text.split("-1")
        algo.pop()
        setBtnLoading(false)
        setGeneratedAlgo(algo)
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
                        <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Algorithm Design Tool 🔮</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 lg:px-0 lg:w-2/6 mt-12">
                        <p className='text-md md:text-lg text-center font-normal text-primary font-body'>Trying to write Algorithm ? <br />We'll create one for you</p>
                    </div>
                    {showInputSection ? <div className="flex flex-col items-start justify-center w-full px-4 lg:px-0 md:w-3/6 lg:w-3/6 mt-12 mb-12">
                        <h1 className='w-full font-bold mb-4 text-xl text-primary text-center font-body'>Describe your Algorithm</h1>
                        <textarea rows={8} onChange={handlQueryChange} className='transition w-full px-4 py-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-primary/50' type="text" placeholder='Write Algorithm for tree traversal' />

                        <button className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent' onClick={onClick}>Generate 🚀 </button>
                    </div> : null}
                    {resultGenerated ? <div className='flex flex-col items-center justify-center w-full lg:px-0 lg:w-2/6 md:w-5/6 mt-12 px-6 mb-12'>
                        <h1 className='text-xl text-primary font-body font-bold mb-1'>Generated Algorithm</h1>
                        <div onClick={copyAlgo} className='flex flex-col items-center w-full px-4 py-4 mt-4 text-lg font-normal text-primary font-body bg-secondary border border-primary/50 rounded-lg hover:bg-primary/5 hover:cursor-pointer'>
                            <h1 className='text-lg text-primary font-body font-bold mb-1'>Algorithm for {query}</h1>
                        {generatedAlgo.map((algo) => {
                            return (
                                
                                    <h1 className='w-full'>{algo}</h1>
                            )
                        })
                        }
                        </div>
                        <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>{!btnLoading ? 'Generate Again' : 'Generating'} </button>
                        <button onClick={() => { setShowInputSection(true); setResultGenerated(false) }} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-primary font-body border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Go Back</button>
                    </div> : null}
                    {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Generating Algoritm. Please wait ⏰</p> : null}
                </div>
            </div>
        </>
    )
}

export default AlgorithmDesignTool