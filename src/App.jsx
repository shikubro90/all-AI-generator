import { useState } from 'react'
import React from 'react'
import './App.css'
const  AlgorithmDesignTool = React.lazy(() => import('./pages/AlgorithmDesignTool'))
const BusinessIdeaGenerator = React.lazy(() => import('./pages/BusinessIdeaGenerator'))
const ChatBot = React.lazy(() => import('./pages/ChatBot'))
const ImageGenerator = React.lazy(() => import('./pages/ImageGenerator'))
const MoodDetector = React.lazy(() => import('./pages/MoodDetector'))
import Sidebar from './pages/Sidebar'
const TextSummariser = React.lazy(() => import('./pages/TextSummariser'))
const TripPlanner = React.lazy(() => import('./pages/TripPlanner'))
const TweetClassifier = React.lazy(() => import('./pages/TweetClassifier'))
const TweetGenerator = React.lazy(() => import('./pages/TweetGenerator'))
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MathSolver from './pages/MathSolver'
import StoryGenerator from './pages/StoryGenerator'
const Error = React.lazy(() => import('./pages/Error'))
const Landing = React.lazy(() => import('./pages/Landing'))

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chatbot">
          <Sidebar children={<ChatBot />} activeItem={1} />
        </Route>
        <Route path="/img-generator">
          <Sidebar children={<ImageGenerator />} activeItem={2} />
        </Route>
        <Route path="/tweet-classifier">
          <Sidebar children={<TweetClassifier />} activeItem={3} />
        </Route>
        <Route path="/algo-generator">
          <Sidebar children={<AlgorithmDesignTool />} activeItem={5}/>
        </Route>
        <Route path="/text-summarizer">
          <Sidebar children={<TextSummariser />} activeItem={6}/>
        </Route>
        <Route path="/mood-detector">
          <Sidebar children={<MoodDetector />} activeItem={7}/>
        </Route>
        <Route path="/idea-generator">
          <Sidebar children={<BusinessIdeaGenerator />} activeItem={8}/>
        </Route>
        <Route path="/tweets-gen">
          <Sidebar children={<TweetGenerator />} activeItem={9}/>
        </Route>
        <Route path="/trip-planner">
          <Sidebar children={<TripPlanner />} activeItem={10}/>
        </Route>
        <Route path="/math-solver">
          <Sidebar children={<MathSolver />} activeItem={4}/>
        </Route>
        <Route path="/story-gen">
          <Sidebar children={<StoryGenerator />} activeItem={11}/>
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
