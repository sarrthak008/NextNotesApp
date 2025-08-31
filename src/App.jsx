import React, { useEffect, useState } from 'react'
import "./App.css"
import NotesBg from './components/NotesBg'
import NoteCards from './components/NoteCards'


const App = () => {

  const [notes, setNotes] = useState([])

  const [isNoteaddOpen, setIsNoteAddOpen] = useState(false)

  const [notetitle, setNotetitle] = useState("")
  const [noteDexcription, setNoteDexcription] = useState("")
  const [noteColor, setNoteColor] = useState('pink')


const loadNotes = () => {
  setNotes(JSON.parse(localStorage.getItem("notes")) || [])
}



const handelAddNote=()=>{
   if(!notetitle || !noteDexcription){return}

   const newNote = {
     title : notetitle,
     description : noteDexcription,
     color : noteColor
   }
   let notes =  JSON.parse(localStorage.getItem("notes")) || []
   notes.push(newNote)
   localStorage.setItem("notes",JSON.stringify(notes))
    setTimeout(()=>{
      setIsNoteAddOpen(false)
      setNotetitle("")
      setNoteDexcription("")
      setNoteColor("pink")
      loadNotes()
    },100)
  }

useEffect(()=>{
  loadNotes()
},[])

useEffect(()=>{
  loadNotes()
},[isNoteaddOpen])




  return (
    <div className='min-h-screen w-screen '>
      <NotesBg />
      <div className='h-full w-[70%] absolute top-[50%] left-[50%]  mx-auto translate-x-[-50%] translate-y-[-50%] overflow-y-hidden'>
        <div className='h-full w-full overflow-x-hidden overflow-y-scroll hide-scrollbar'>
          {
            notes?.map((note, index, arr) => {
              return <NoteCards data={note} key={index} i={index} arr={arr} />
            })
          }
        </div>
      </div>
      <div>
        <button className='fixed top-[2%] right-[2%] cursor-pointer text-white bg-purple-500 py-[5px] px-[30px] rounded-md ' onClick={() => { setIsNoteAddOpen(true) }}> <i className="ri-add-line"></i>add note</button>
      </div>

      {
        isNoteaddOpen ?

          <div className='h-screen w-screen  bg-black/12 backdrop-blur-lg fixed top-0 flex items-center justify-center flex-col'>

            <div className='absolute top-[2%] right-[2%] cursor-pointer inline-block' onClick={() => { setIsNoteAddOpen(false) }} ><i className="ri-close-large-line"></i></div>
            <h1 className='text-4xl my-[30px] font-semibold text-center'>“Pin your <span className='text-purple-600'>ideas</span>. <span className='text-red-500'>Anytime</span>. <span className='text-green-500'>Anywhere</span>.”</h1>
            <div className='flex flex-col'>
              <input type='text' className='h-[40px] px-5 bg-white m-5 w-[90vw] md:w-[40vw] border-b-2 border-b-sky-500 outline-none' placeholder='note title..' onChange={(e) => setNotetitle(e.target.value)} value={notetitle} />
              <input type='text' className='h-[40px] px-5 bg-white m-5 w-[90vw] md:w-[40vw] border-b-2 border-b-sky-500 outline-none' placeholder='note description'  onChange={(e) => setNoteDexcription(e.target.value)} value={noteDexcription}/>
              <label className='text-center text-xl cursor-pointer h-[30px] px-5 text-white m-5 w-[90vw] md:w-[40vw] ' htmlFor='clr' style={{ backgroundColor: noteColor }}>click to slecet color</label>
              <input id="clr" type='color' className='hidden' onChange={(e) => setNoteColor(e.target.value)} value={noteColor} />

              <button className=' mt-[60px] cursor-pointer text-white bg-purple-500 h-[40px] px-5 m-5 w-[90vw] md:w-[40vw] rounded-md ' onClick={()=>{handelAddNote()}} > <i className="ri-add-line"></i>add note</button>
            </div>

          </div> : null
      }
    </div>
  )
}

export default App