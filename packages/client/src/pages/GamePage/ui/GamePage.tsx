import { type FC, useEffect, useRef, useState } from 'react'
import { Button, Flex } from 'antd'
import { formatTime, getDurationTime } from '@/shared/utils'
import { Mahjong } from '@/entities/mahjong'
import { GameTimer } from './GameTimer/GameTimer'
import cls from './GamePage.module.scss'

export const GamePage: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mahjongRef = useRef<Mahjong>()
  const [startTime, setStartTime] = useState<Date>()
  const [finishTime, setFinishTime] = useState<Date>()

  const onStartCallback = (startTime?: Date) => {
    setStartTime(startTime)
    setFinishTime(undefined)
    console.log(`start game at ${startTime}`)
  }

  const onWinCallback = (startTime?: Date, finishTime?: Date) => {
    if (startTime && finishTime) {
      alert(`You Won! ${formatTime(getDurationTime(startTime, finishTime))}`)
    }
    setFinishTime(finishTime)
  }

  const onLoseCallback = () => {
    alert('You Lose!')
  }

  const destroyGame = () => {
    if (mahjongRef.current) {
      mahjongRef.current.finish()
      mahjongRef.current.destroy()
      mahjongRef.current = undefined
    }
  }

  const createGame = () => {
    if (!canvasRef.current) {
      throw new Error('Canvas not found')
    }

    const mahjongOptions = {
      columns: 4,
      rows: 4,
      shuffleCount: 3,
      tileSize: 50,
      onStartCallback,
      onWinCallback,
      onLoseCallback,
    }
    mahjongRef.current = new Mahjong(canvasRef.current, mahjongOptions)
    mahjongRef.current.start()
  }

  useEffect(() => {
    createGame()

    return () => {
      destroyGame()
    }
  }, [])

  const onRestartClick = () => {
    destroyGame()
    createGame()
  }

  const onShuffleClick = () => {
    mahjongRef.current?.handleShuffle()
  }

  return (
    <div className={cls.gamePage}>
      <Flex gap={8} align="center">
        <Button onClick={onShuffleClick}>Shuffle</Button>
        <Button onClick={onRestartClick}>Restart</Button>
        <GameTimer
          startTime={startTime?.toISOString()}
          finishTime={finishTime?.toISOString()}
        />
      </Flex>
      <canvas ref={canvasRef} className={cls.gameField} />
    </div>
  )
}
