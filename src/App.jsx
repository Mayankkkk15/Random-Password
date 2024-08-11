import React, { useCallback, useEffect, useState ,useRef} from 'react'


function App() {
  const [length,setLength] = useState(8)
  const  [numberAllowed,setNumberAllowed] = useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState(" ")

  const passwordGenrator = useCallback(()=>{
    let pass ="";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '@#$%&*(){}?/'

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
passwordGenrator();
  },[length,numberAllowed,charAllowed,passwordGenrator])

const passwordRef = useRef();

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
},[password])
  
  return (
   <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      placeholder='password'
      value={password}
      readOnly
      className="outline-none w-full py-1 px-3" 
      ref={passwordRef}/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        className='cursor-pointer'
        min={6}
        max={100} 
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label > length : {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox" 
      defaultChecked = {charAllowed}
      onChange={() => 
      { setCharAllowed((prev) => !prev)}} />
      <label>Characters</label>
      </div>

      <div className="flex items-center gap-x-1">
      <input type="checkbox" 
      defaultChecked = {numberAllowed}
      onChange={()=>{ setNumberAllowed((prev) => !prev)}} />
      <label>Numbers</label>
      </div>
      </div>
      
      
      </div>
   </>
  )
}

export default App