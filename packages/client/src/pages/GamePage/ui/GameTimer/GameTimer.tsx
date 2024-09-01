import { type FC, useState, useRef, useEffect } from 'react'
import { formatTime } from '@/shared/utils'

type Props = {
  isRunning: boolean
}

export const GameTimer: FC<Props> = ({ isRunning }) => {
  const [time, setTime] = useState(0)
  const timerIdRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1000)
      }, 1000)
    } else {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
      }
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [isRunning])

  const timeFormatted = formatTime(time)

  return <span>{timeFormatted}</span>
}
