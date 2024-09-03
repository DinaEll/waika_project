import type { FieldCell } from '../types'
import { isNull } from '@/shared/utils'
import { MahjongHelper } from './MahjongHelper'
import { Tile } from './Tile'
import { Game } from '../../game/model/Game'
import { CanvasLayer } from '../../canvas/model/CanvasLayer'

type Options = {
  tileSize: number
  columns: number
  rows: number
  shuffleCount: number
} & Pick<Game, 'onStartCallback' | 'onWinCallback' | 'onLoseCallback'>

export class Mahjong extends Game {
  private tiles: Tile[] = []
  private countTiles: number
  private remainingTiles: number
  private remainingShuffles: number
  private selectedTiles: Tile[] = []
  private field: FieldCell[][]
  private pairs: FieldCell[]
  private tileSize: number
  private fieldLayer: CanvasLayer

  constructor(canvas: HTMLCanvasElement, options: Options) {
    super(canvas)
    const {
      columns,
      rows,
      tileSize,
      shuffleCount,
      onLoseCallback,
      onStartCallback,
      onWinCallback,
    } = options
    this.tileSize = tileSize
    this.remainingShuffles = shuffleCount
    this.onLoseCallback = onLoseCallback
    this.onStartCallback = onStartCallback
    this.onWinCallback = onWinCallback

    const countTiles = columns * rows
    this.countTiles = countTiles
    this.remainingTiles = countTiles

    const uniqueRandomArray = MahjongHelper.createUniqueRandomArray(
      countTiles / 2
    )
    this.pairs = MahjongHelper.shuffleRandomPairs([
      ...uniqueRandomArray,
      ...uniqueRandomArray,
    ])
    this.field = MahjongHelper.generateField(countTiles, this.pairs)
    this.fieldLayer = new CanvasLayer(this.ctx)
    this.addLayer(this.fieldLayer)

    this.shuffle()
  }

  private checkGameOver(): void {
    if (this.remainingTiles === 0) {
      this.onWin()

      return
    }

    const arePairsAvailable = MahjongHelper.checkAvailablePairs(this.field)

    if (!this.areShufflesAvailable() && !arePairsAvailable) {
      this.onLose()
    } else if (!arePairsAvailable) {
      alert('No tiles available. Please use shuffle')
    }
  }

  private areShufflesAvailable() {
    return this.remainingShuffles > 0
  }

  private shuffle(useAttempts = true): void {
    let countAttempts = useAttempts ? 1000 : 10
    while (
      useAttempts &&
      countAttempts > 0 &&
      !MahjongHelper.checkAvailablePairs(this.field)
    ) {
      this.pairs = MahjongHelper.shuffleRandomPairs(this.field.flat())
      this.field = MahjongHelper.generateField(this.countTiles, this.pairs)
      countAttempts -= 1
    }

    this.tiles = []
    this.field.forEach((tileIdAr, x) => {
      this.createTileArray(tileIdAr, x)
    })
    this.fieldLayer.setElements(this.tiles)

    this.checkGameOver()
  }

  public handleShuffle = () => {
    if (!this.areShufflesAvailable()) {
      return
    }

    this.shuffle()

    this.remainingShuffles -= 1
  }

  private createTileArray(tileIds: FieldCell[], x: number): void {
    tileIds.forEach((tileId, y) => {
      this.tiles.push(this.createTile(tileId, x, y))
    })
  }

  protected createTile(id: FieldCell, x: number, y: number): Tile {
    return new Tile(this.ctx, x * this.tileSize, y * this.tileSize, {
      number: id,
      width: this.tileSize,
      height: this.tileSize,
      fill: MahjongHelper.getRandomColor(),
      isVisible: !isNull(id),
      isSelected: false,
      positionOnField: [x, y],
      onClick: this.onTileClick,
    })
  }

  private isTileAvailable(
    tileId: Tile['props']['number'],
    position: Tile['props']['positionOnField']
  ) {
    const availableTiles = MahjongHelper.findAvalaibleElements(this.field)

    const isAvailable = availableTiles.find(
      ({ id, positionX, positionY }) =>
        id === tileId && positionX === position[0] && positionY === position[1]
    )

    return isAvailable
  }

  private onTileClick = (tile: Tile) => {
    if (!this.isRunning) {
      return
    }

    if (!this.isTileAvailable(tile.props.number, tile.props.positionOnField)) {
      return
    }

    const selectedTilesCount = this.selectedTiles.length
    if (selectedTilesCount === 0) {
      this.selectedTiles.push(tile)
      tile.isSelected = true
    } else if (selectedTilesCount === 1) {
      const foundIndex = this.selectedTiles.indexOf(tile)
      if (foundIndex > -1) {
        this.selectedTiles.splice(foundIndex, 1)
        tile.isSelected = false
        return
      } else {
        const selectedTile = this.selectedTiles[0]
        if (selectedTile.sameNumber(tile)) {
          this.selectedTiles.push(tile)
          tile.isSelected = true

          setTimeout(() => {
            this.selectedTiles.forEach(selectedTile => {
              selectedTile.isSelected = false
              selectedTile.isVisible = false
              this.field[selectedTile.props.positionOnField[0]][
                selectedTile.props.positionOnField[1]
              ] = null
            })
            this.selectedTiles = []
            this.remainingTiles -= 2
            this.checkGameOver()
          }, 400)
        }
      }
    }
  }
}