import { createSignal } from 'solid-js'
import Translater from './components/Translater'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div class="w-screen my-20 flex justify-center text-xl">
        <Translater/>
      </div>
    </>
  )
}

export default App
