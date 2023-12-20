import React from 'react'
import ReactDOM from 'react-dom/client'
import {HeroesApp as App} from './HeroesApp'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
