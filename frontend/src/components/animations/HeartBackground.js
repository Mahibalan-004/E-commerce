    import React, { useEffect } from 'react'
import './HeartBackground.css' // 👈 CSS file for heart animation

const HeartBackground = () => {
  useEffect(() => {
    const container = document.querySelector('.heart-background')

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.style.left = `${Math.random() * 100}%`
      heart.style.animationDuration = `${5 + Math.random() * 5}s`
      heart.style.animationDelay = `${Math.random() * 3}s`
      container.appendChild(heart)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div className='heart-background'></div>
}

export default HeartBackground
