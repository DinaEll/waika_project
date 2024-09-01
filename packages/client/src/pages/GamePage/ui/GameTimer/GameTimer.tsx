import { type FC, useState, useRef, useEffect } from 'react'
import { formatTime, getDurationTime } from '@/shared/utils'

type Props = {
  startTime?: string
  finishTime?: string
}

export const GameTimer: FC<Props> = ({ startTime, finishTime }) => {
  const [time, setTime] = useState(() => formatTime(0))
  const timerIdRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (startTime) {
      timerIdRef.current = setInterval(() => {
        const formattedTime = formatTime(
          getDurationTime(
            new Date(startTime),
            finishTime ? new Date(finishTime) : new Date()
          )
        )
        setTime(formattedTime)
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
  }, [startTime, finishTime])

  return <span>{time}</span>
}
