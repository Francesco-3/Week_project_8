import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import NotFound from './components/NotFound.jsx'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:city" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
)