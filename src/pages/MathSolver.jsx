import React from 'react'
import MathJax from 'react-mathjax';
import 'katex/dist/katex.min.css';
import { toast, Toaster } from 'react-hot-toast'
import { Configuration, OpenAIApi } from 'openai'
import { MathfieldElement} from 'mathlive';
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
})
const openai = new OpenAIApi(configuration)

function MathSolver() {
    const [input, setInput] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showInputSection, setShowInputSection] = React.useState(true)
    const [result, setResult] = React.useState([])
    const [showResult, setShowResult] = React.useState(false)

    const addFraction = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'a / b'
        setInput(input + 'a / b')
    }
    const addSqrt = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'sqrt(a)'
        setInput(input + 'sqrt()')
    }
    const addSquare = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'a^2'
        setInput(input + 'a^2')
    }
    const addCube = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'a^3'
        setInput(input + 'a^3')
    }
    const addPower = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'a^b'
        setInput(input + 'a^b')
    }
    const addLog = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'log(a)'
        setInput(input + 'log(a)')
    }
    const addLn = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'ln(a)'
        setInput(input + 'ln(a)')
    }
    const addSin = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'sin(a)'
        setInput(input + 'sin(a)')
    }
    const addCos = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'cos(a)'
        setInput(input + 'cos(a)')
    }
    const addTan = () => {
        let mathfield = document.querySelector('textarea');
        mathfield.focus();
        mathfield.value = mathfield.value + 'tan(a)'
        setInput(input + 'tan(a)')
    }
    const onClick = async() => {
        setShowInputSection(false)
        setLoading(true)
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Add -0101 add end of each step. Solve each step in newline. Solve the following math problem: ${input}. Also show steps to solve the problem.`,
            temperature: 0.2,
            max_tokens: 2000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        setLoading(false)
        let result = response.data.choices[0].text.split('-0101')
        result.pop()
        setResult(result)
        setShowResult(true)
    }

    return (
        <div className='flex flex-col items-start justify-between w-full min-h-screen bg-secondary'>
            <div className='flex flex-col w-full justify-center items-center gap-y-6 py-6 mt-5'>
                <div className='flex flex-row items-center justify-center w-full h-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold text-primary font-body'>Math Problem Solver 📈</h1>
                </div>
                <p className='text-lg md:text-xl text-center text-primary font-body mt-6'>Stuck on Math Problem ? <br/> We'll solve your math problem for you</p>
                {showInputSection ? <div className="flex flex-col gap-y-5 items-center justify-center mt-16 w-full md:w-6/12 px-4">
                    <p className="text-xl text-center font-bold text-primary font-body w-full">Enter your Math problem </p>
                    <textarea rows={6} id='mathfield' onChange={(e) => setInput(e.target.value)} className="placeholder:text-primary/50 bg-secondary transition-all w-full px-4 py-2 text-lg font-body text-primary border border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border" placeholder="Enter your Math problem here"></textarea>
                    <div className='flex flex-row gap-2 flex-wrap w-full'>
                        {/* fraction button */}
                        <button onClick={addFraction} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>a / b</button>
                        <button onClick={addSqrt} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Square root</button>
                        <button onClick={addSquare} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>a^2</button>
                        <button onClick={addCube} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>a^3</button>
                        <button onClick={addPower} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>a^b</button>
                        <button onClick={addLog} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>log(a)</button>
                        <button onClick={addLn} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>ln(a)</button>
                        <button onClick={addSin} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>sin(a)</button>
                        <button onClick={addCos} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>cos(a)</button>
                        <button onClick={addTan} className='transition px-4 py-2 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>tan(a)</button>
                    </div>
                    <button onClick={onClick} className='transition w-full px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Solve ✨</button>
                </div> : null}
                {loading ? <p className='text-md md:text-xl text-primary font-body font-bold mb-1 animate-bounce text-center mt-24'>Hold on tight, we're almost there! 🤗</p> : null}
                {showResult ? <div className='flex flex-col h-full font-body mt-12 px-5 text-primary item-start w-full lg:w-2/3'>
                    {result.map((item, index) => {
                        return <div key={index} className='flex flex-row items-start gap-3 justify-start w-full h-auto'>
                            <p className='text-lg font-bold'>{index + 1}.</p>
                            <p className='text-lg'>{item}</p>
                        </div>
                    })
                    }
                    <div className='mt-6 flex flex-col items-center justify-center w-full h-auto'>
                        <div><Toaster position="bottom-center"
                            reverseOrder={false} /></div>
                        {/* copy button */}
                        <button onClick={onClick} className='transition w-1/2 px-4 py-4 mt-4 text-lg font-bold text-white font-body bg-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-transparent'>Generate Again</button>
                        <button onClick={() => { setShowInputSection(true); setShowResult(false) }} className='transition w-1/2 px-4 py-4 mt-4 text-lg font-bold text-primary border border-primary font-body bg-secondary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border'>Go Back</button>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}

export default MathSolver