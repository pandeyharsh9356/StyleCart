import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Backgound({ heroCount }) {
  const backgrounds = [back2, back1, back3, back4];

  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden'>
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-out ${
            heroCount === index ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
        >
          <img 
            src={bg} 
            alt={`Hero BG ${index}`} 
            className='w-full h-full object-cover object-right pointer-events-none' 
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[#081b29] via-[#081b29]/40 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-t from-[#081b29] via-transparent to-transparent opacity-60' />
        </div>
      ))}
    </div>
  )
}

export default Backgound
