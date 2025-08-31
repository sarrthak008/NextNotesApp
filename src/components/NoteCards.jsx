import React from 'react'
import SVG1 from "../assets/arraow1.svg"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const NoteCards = ({ data, i, arr ,funcLoad}) => {

  const deleteCard =(i)=>{
     try {
       let notes =   JSON.parse(localStorage.getItem("notes")) || []
       notes.splice(i,1)
       localStorage.setItem("notes",JSON.stringify(notes))
       funcLoad()
     } catch (error) {
      
     }
  }


  return (
    <div className={`box${i} w-[80%] flex  ${i % 2 == 0 ? 'justify-start' : 'justify-end'} mx-auto relative z-30`} onDoubleClick={()=>{deleteCard(i)}}>
      <div className={`h-[280px] w-[250px] ${i % 2 == 0 ? 'rotate-12' : '-rotate-12'} bg-gray-100 rounded-2xl shadow-2xl shadow-gray-500 m-2`}>
        <div className='pin h-[35px] w-[36px] mx-auto bg-red-300 rounded-full relative border-b-5 border-b-orange-500 shadow-md shadow-gray-400'>
          <div className='h-[25px] w-[26px] bg-red-400  border-b-4 border-b-red-500   rounded-full absolute top-[-10%] left-[10%] shadow-md shadow-gray-400'></div>
        </div>

        <div
          className="w-[90%] p-[10px] h-[200px] mx-auto mt-[25px] rounded-2xl shadow bg-gradient-to-tl overflow-hidden"
          style={{ background: `linear-gradient(to top left, white, ${data?.color})` }}
        >
          <span className="indian-flower text-4xl text-orange-300">{i + 1}</span>
          <h3 className="noraml-font text-xl">{data.title}</h3>
          <p className="noraml-font text-md text-gray-600">{data.description}</p>
        </div>
        {
          i % 2 == 0 && i < arr.length - 1 ?

            <div className='hidden md:block  z-[-3] relative h-full translate-y-[-40%] top-0 w-full translate-x-[100%]'><img src={SVG1} className='rotate-[-30deg] relative ' /></div> :

            i % 2 == 1   && i < arr.length - 1 ?

              <div className='hidden md:block z-[-3] relative h-full translate-y-[-40%] top-0 w-full translate-x-[-100%]'><img src={SVG1} className='rotate-[-60deg] relative ' /></div> :

              null
        }
      </div>
    </div>
  )
}

export default NoteCards