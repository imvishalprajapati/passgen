import { useState, useCallback, useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = ('')

  const passwordRef= useRef(null)

    const generatePassword= useCallback(()=> {
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str+= "0123456789"
      if(charAllowed) str+="!@#$%^&*()_+"

      for(let i=1; i<length; i++){
        const char=Math.floor(Math.random()*str.length+1)
        pass +=str.charAt(char)
      }
      setPassword(pass)
    },[length,numberAllowed,charAllowed])

    const copyPasswordToClipboard= () =>{
      window.navigator.clipboard.writeText(password)
      passwordRef.current?.select()
    }



    useEffect(()=>{
        generatePassword()
    },[length,numberAllowed,charAllowed])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 
    py-3 my-8 bg-gray-700 text-orange-600'>

        <h1 className='text-white bold-600 text-center my-3'>Password Gen</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

            <input type='text'
                  value={password}
                  className='outline-none w-full py-1 px-3'
                  placeholder='Password'
                  ref={passwordRef}
                  readOnly
            />
            <button onClick={copyPasswordToClipboard} className=' outline-none bg-pink-800 text-white px-3 py-0.5 shrink-0  '>
              copy
            </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={220}
              value={length}
              className='cursor-pointer'
              onClick={(e) => setLength(e.length.value)}
            ></input>
            <label htmlFor='length'>length:{length}</label>
          </div>
           
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={()=> {
                  setNumberAllowed((prev)=>!prev)
              }}
              />
            <label htmlFor='number'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={()=> {
                  setCharAllowed((prev)=>!prev)
              }}
              />
            <label htmlFor='charInput'>Character</label>
          </div>

        </div>

    </div>
  )
}

export default App
