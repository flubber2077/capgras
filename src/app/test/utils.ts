/* eslint-disable prefer-spread */
import React from 'react'

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: -1, y: -1 })

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

interface WindowDimensions {
  width: number | undefined
  height: number | undefined
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] =
    React.useState<WindowDimensions>({
      width: undefined,
      height: undefined
    })

  React.useEffect(() => {
    const calculatorElement = document.createElement('div')
    calculatorElement.style.fontSize = '1rem'

    document.body.appendChild(calculatorElement)

    const fontSize = parseFloat(
      window.getComputedStyle(calculatorElement).fontSize
    )

    const ratio = 16 / fontSize

    setWindowDimensions({
      width: window.innerWidth * ratio,
      height: window.innerHeight * ratio
    })

    const handleResize = throttle(() => {
      setWindowDimensions({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio
      })
    }, 250)

    window.addEventListener('resize', handleResize)

    return () => {
      // Hm so weirdly, sometimes the `calculatorElement` is already removed from the DOM by the time this cleanup function runs. So we wrap this in a try/catch to prevent errors.
      try {
        document.body.removeChild(calculatorElement)
        window.removeEventListener('resize', handleResize)
      } catch (err) {}
    }
  }, [])

  return windowDimensions
}
type Timeout = ReturnType<typeof setTimeout>
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const throttle = (func: Function, limit: number) => {
  let lastFunc: Timeout
  let lastRan: number
  return function (...args: any) {
    if (!lastRan) {
      func.apply(null, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan)
      )
    }
  }
}

const useRequestAnimationFrameLoop = <T>(
  callback: () => T,
  isRunning: boolean = true
) => {
  const animationFrameId = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    if (!isRunning) {
      return;
    }

    const tick = () => {
      if (typeof savedCallback.current !== 'function') {
        return;
      }

      savedCallback.current();
      animationFrameId.current = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (typeof animationFrameId.current === 'number') {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning]);

  return animationFrameId.current;
};

export { useMousePosition, useWindowDimensions, useRequestAnimationFrameLoop }
