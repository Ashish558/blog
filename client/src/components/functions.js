
import { useState, useEffect } from 'react'

export const checkIfpostsEnded = async (postsRef, cb) => {
    // console.log(postsRef)
    if (postsRef.current) {
        const postsElement = document.getElementById('posts')
        if (postsElement.scrollHeight - window.innerHeight <= window.pageYOffset) {
            const posY = window.scrollY
            cb()
            setTimeout(() => {
                window.scrollTo(0, posY)
            }, 200)
            window.removeEventListener('scroll', checkIfpostsEnded)
        }

    }
}


function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return windowDimensions
}

