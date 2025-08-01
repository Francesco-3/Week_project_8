import Footer from './components/Footer'
import Home from './pages/Home'
import './App.css'

const App = function() {
  return (
    <div className="bg-black text-white">
      <Home />
      <Footer />
    </div>
  )
}

export default App