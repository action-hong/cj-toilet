import './App.css'
import LampConfig from './components/LampConfig'
import ModelConfig from './components/ModelConfig'
import UIConfig from './components/UIConfig'
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <div className='p-4'>
      <ModelConfig />
      <UIConfig />       
      <LampConfig />
      <Toaster />
    </div>
  )

}

export default App
