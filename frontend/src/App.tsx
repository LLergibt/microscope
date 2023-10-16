import { createSignal } from 'solid-js'
import Counter from './components/base'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div class="w-screen my-20 flex justify-center text-xl">
        <Counter/>
      </div>
    </>
  )
}

export default App
