import React from 'react'

function Error() {
    return (
        <div className="flex flex-col font-body h-screen w-full items-center justify-center">
            <h1 className="text-4xl font-bold text-primary">404</h1>
            <h1 className="text-2xl font-bold text-primary">Page Not Found</h1>
            <a href="/chatbot" className="text-primary mt-24 underline">Go Back</a>
        </div>
    )
}

export default Error