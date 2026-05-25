import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = new Audio(open)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    utterance.pitch = 1.2
    utterance.rate = 1.1
    window.speechSynthesis.speak(utterance)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = speechRecognition ? new speechRecognition() : null

  if (!recognition) {
    console.log("Speech recognition not supported")
  }

  if (recognition) {
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      const command = transcript.toLowerCase();

      if (command.includes("search") && command.includes("open") && !showSearch) {
        speak("Opening search interface")
        setShowSearch(true)
        navigate("/collection")
      }
      else if (command.includes("search") && command.includes("close") && showSearch) {
        speak("Closing search interface")
        setShowSearch(false)
      }
      else if (command.includes("collection") || command.includes("product")) {
        speak("Scanning collection repository")
        navigate("/collection")
      }
      else if (command.includes("about")) {
        speak("Accessing origin protocols")
        navigate("/about")
        setShowSearch(false)
      }
      else if (command.includes("home")) {
        speak("Returning to central hub")
        navigate("/")
        setShowSearch(false)
      }
      else if (command.includes("cart")) {
        speak("Opening logistics vault")
        navigate("/cart")
        setShowSearch(false)
      }
      else if (command.includes("contact")) {
        speak("Establishing support uplink")
        navigate("/contact")
        setShowSearch(false)
      }
      else if (command.includes("order")) {
        speak("Retrieving mission records")
        navigate("/order")
        setShowSearch(false)
      }
      else {
        toast.error("Unrecognized Command. Recalibrate.")
      }
    }

    recognition.onend = () => {
      setActiveAi(false)
    }
  }

  return (
    <div className='fixed lg:bottom-[40px] md:bottom-[40px] bottom-[100px] left-[40px] z-[100]' onClick={() => {
      if (recognition) {
        recognition.start();
        openingSound.play().catch(() => console.log("Audio play blocked"));
        setActiveAi(true)
      } else {
        toast.error("Voice Protocol Unavailable")
      }
    }}>
      <div className='relative group cursor-pointer'>
        {/* Holographic Rings */}
        <div className={`absolute inset-[-20px] border-2 border-[#0ef2] rounded-full transition-all duration-1000 ${activeAi ? 'scale-110 opacity-100 animate-[spin_5s_linear_infinite]' : 'scale-0 opacity-0'}`}></div>
        <div className={`absolute inset-[-10px] border border-[#0ef4] rounded-full transition-all duration-700 delay-100 ${activeAi ? 'scale-105 opacity-100 animate-[spin_3s_linear_infinite_reverse]' : 'scale-0 opacity-0'}`}></div>

        {/* Background Glow */}
        <div className={`absolute inset-0 bg-[#0ef] rounded-full blur-2xl transition-opacity duration-500 ${activeAi ? 'opacity-40' : 'opacity-0'}`}></div>

        <img
          src={ai}
          alt="System AI"
          className={`w-16 md:w-20 relative z-10 transition-all duration-700 ${activeAi ? 'scale-110 brightness-125' : 'grayscale-50 brightness-75 hover:grayscale-0 hover:brightness-100'}`}
          style={{
            filter: activeAi ? "drop-shadow(0 0 20px #0ef)" : "drop-shadow(0 0 10px rgba(0,0,0,0.5))"
          }}
        />

        {/* Status Indicator */}
        <div className='absolute -top-4 -right-2 flex items-center gap-2 bg-[#081b29] border border-white/10 px-3 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className={`w-1.5 h-1.5 rounded-full ${activeAi ? 'bg-red-500 animate-pulse' : 'bg-[#0ef]'}`}></div>
          <p className='text-[8px] text-white font-black uppercase tracking-widest'>{activeAi ? 'Listening' : 'Ready'}</p>
        </div>
      </div>
    </div>
  )
}

export default Ai
