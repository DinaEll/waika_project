import { animate } from '@/shared/lib';
import { isDefined } from '@/shared/utils';
import { CanvasLayer } from '../../canvas/model/CanvasLayer';
import { Game } from '../../game/model/Game';
import {
  createFieldPattern,
  createUniqueNumbers,
  fillField,
  findAvailableTiles,
  getAvailablePairs,
  getFlattenField,
  shufflePairs,
} from '../lib';
import { Tile } from './Tile';
import type { MahjongField, MahjongFieldCell } from '../types';

type Options = {
  tileSize: number;
  columns: number;
  rows: number;
  levels: number;
  shuffleCount: number;
  onShuffleChange: (count: number) => void;
  onAvailablePairsChange: (pairsCount: number) => void;
  onRemainingTilesChange: (tilesCount: number) => void;
} & Pick<Game, 'onStartCallback' | 'onWinCallback' | 'onLoseCallback'>;

export class Mahjong extends Game {
  private tiles: Tile[] = [];
  private _remainingTiles = 0;
  private _remainingShuffles = 3;
  private _availablePairs = 0;
  private selectedTiles: Tile[] = [];
  private field: MahjongField;
  private pairs: NonNullable<MahjongFieldCell>[];
  private tileSize: number;

  private fieldLayer: CanvasLayer;
  private animationLayer: CanvasLayer;

  private onShuffleChange: (count: typeof this._remainingShuffles) => void;
  private onRemainingTilesChange: (count: typeof this._remainingTiles) => void;
  private onAvailablePairsChange: (count: number) => void;

  constructor(canvas: HTMLCanvasElement, options: Options) {
    super(canvas);
    const {
      columns,
      rows,
      levels,
      tileSize,
      shuffleCount,
      onLoseCallback,
      onStartCallback,
      onWinCallback,
      onRemainingTilesChange,
      onAvailablePairsChange,
      onShuffleChange,
    } = options;
    this.onLoseCallback = onLoseCallback;
    this.onStartCallback = onStartCallback;
    this.onWinCallback = onWinCallback;

    this.onAvailablePairsChange = onAvailablePairsChange;
    this.onRemainingTilesChange = onRemainingTilesChange;
    this.onShuffleChange = onShuffleChange;

    this.tileSize = tileSize;
    this.remainingShuffles = shuffleCount;

    const { field, countCells } = createFieldPattern(columns, rows, levels);
    this.field = field;
    this.remainingTiles = countCells;

    const uniqueNumbers = createUniqueNumbers(countCells / 2);

    this.pairs = shufflePairs([...uniqueNumbers, ...uniqueNumbers]);
    this.field = fillField(this.field, this.pairs);

    this.fieldLayer = new CanvasLayer(this.ctx);
    this.addLayer(this.fieldLayer);

    this.animationLayer = new CanvasLayer(this.ctx);
    this.addLayer(this.animationLayer);

    //TODO Add indicator loading or add to field on loading
    this.loadAllImages(uniqueNumbers)
      .then(() => {
        this.createTiles();

        if (!this.checkAvailablePairs()) {
          this.shuffle();
        }
      })
      .catch((err: Error) => {
        console.error('Error loading images:', err.message);
      });
  }

  loadAllImages(uniqueNumbers: number[]) {
    const promises = uniqueNumbers.map((number) =>
      this.loadImage(
        `/src/shared/assets/game-tiles/MJ1-${number}.svg`,
        String(number),
      ),
    );

    return Promise.all(promises);
  }

  private onShuffleSuccess() {
    this.createTiles();
    this.checkGameOver();
  }

  private onShuffleFailure() {
    this.createTiles();
    this.checkGameOver();
  }

  private checkAvailablePairs() {
    const availablePairs = getAvailablePairs(this.field);
    console.log(...availablePairs);
    this.availablePairs = availablePairs.length;

    return availablePairs.length > 0;
  }

  private shuffle(useAttempts = true, force = true): void {
    let countAttempts = useAttempts ? 3000 : 10;
    while (countAttempts > 0 && (force || !this.checkAvailablePairs())) {
      const flattenField = getFlattenField(this.field);
      this.pairs = shufflePairs(flattenField.filter(isDefined));
      this.field = fillField(this.field, this.pairs);
      countAttempts -= 1;
    }

    if (this.checkAvailablePairs()) {
      this.onShuffleSuccess();
    } else {
      this.onShuffleFailure();
    }
  }

  public handleShuffle = () => {
    if (!this.checkAvailableShuffles()) {
      this.checkGameOver();
      return;
    }

    this.shuffle(true, true);
    this.remainingShuffles -= 1;
  };

  private checkAvailableShuffles() {
    return this.remainingShuffles > 0;
  }

  private checkGameOver(): void {
    if (this.remainingTiles === 0) {
      this.onWin();

      return;
    }

    const isPairsAvailable = this.checkAvailablePairs();
    const isShufflesAvailable = this.checkAvailableShuffles();
    if (!isPairsAvailable && !isShufflesAvailable) {
      this.onLose();
    }
  }

  private createTiles() {
    this.tiles = [];
    this.fieldLayer.clear();
    this.field.forEach((levels, z) => {
      levels.forEach((rows, y) => {
        rows.forEach((number, x) => {
          if (isDefined(number)) {
            const imgSrc = this.images[number];
            const tile = this.createTile(number, imgSrc, { z, y, x });
            this.tiles.push(tile);
            this.fieldLayer.addElement(tile);
            this.onTileAdd(tile);
          }
        });
      });
    });
  }

  protected createTile(
    number: NonNullable<MahjongFieldCell>,
    img: (typeof this.images)[number] | undefined,
    position: { z: number; y: number; x: number },
  ): Tile {
    const width = this.tileSize;
    const height = this.tileSize;

    return new Tile(
      this.ctx,
      {
        y: position.y * (position.y + height),
        x: position.x * (position.x + width),
      },
      {
        number,
        width,
        height,
        img,
        isVisible: isDefined(number),
        isSelected: false,
        positionOnField: position,
        onClick: this.onTileClick,
      },
    );
  }

  private isTileAvailable(
    number: Tile['props']['number'],
    position: Tile['props']['positionOnField'],
  ): boolean {
    const availableTiles = findAvailableTiles(this.field);

    const isAvailable = availableTiles.find(
      ({ number: tileNumber, z, y, x }) =>
        tileNumber === number &&
        z === position.z &&
        y === position.y &&
        x === position.x,
    );

    return isDefined(isAvailable);
  }

  private onTileClick = (tile: (typeof this.tiles)[number]) => {
    if (!this.isRunning) {
      return;
    }

    if (!this.isTileAvailable(tile.props.number, tile.props.positionOnField)) {
      return;
    }

    const selectedTilesCount = this.selectedTiles.length;
    if (selectedTilesCount === 0) {
      this.selectedTiles.push(tile);
      tile.isSelected = true;
    } else if (selectedTilesCount === 1) {
      const foundIndex = this.selectedTiles.indexOf(tile);
      if (foundIndex > -1) {
        this.selectedTiles.splice(foundIndex, 1);
        tile.isSelected = false;
        return;
      } else {
        const selectedTile = this.selectedTiles[0];
        tile.isSelected = true;
        if (selectedTile?.sameNumber(tile)) {
          this.selectedTiles.push(tile);

          setTimeout(() => {
            this.selectedTiles.forEach((selectedTile) => {
              this.fieldLayer.removeElement(selectedTile);
              this.animationLayer.addElement(selectedTile);
              this.onTileRemove(selectedTile);
              const { x, y, z } = selectedTile.props.positionOnField;
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.field[z]![y]![x] = null;
            });
            this.selectedTiles = [];
            this.remainingTiles -= 2;
            this.checkGameOver();
          }, 400);
        } else {
          setTimeout(() => {
            tile.isSelected = false;
            tile.showUnavailability();
          }, 300);
        }
      }
    }
  };

  private onTileAdd(tile: (typeof this.tiles)[number]) {
    const endX = tile.x;
    const endY = tile.y;

    const side = Math.floor(Math.random() * 4);

    let startX: number, startY: number;

    switch (side) {
      case 0:
        startX = Math.random() * this.canvas.clientWidth;
        startY = -100;
        break;
      case 1:
        startX = Math.random() * this.canvas.clientWidth;
        startY = this.canvas.clientHeight + 100;
        break;
      case 2:
        startX = -100;
        startY = Math.random() * this.canvas.clientHeight;
        break;
      case 3:
        startX = this.canvas.clientWidth + 100;
        startY = Math.random() * this.canvas.clientHeight;
        break;
    }

    animate({
      duration: 2000,
      timing: (t) => t * (2 - t),
      onUpdate: (progress) => {
        const newX = startX + (endX - startX) * progress;
        const newY = startY + (endY - startY) * progress;

        tile.x = newX;
        tile.y = newY;
      },
      onComplete: () => {
        tile.x = endX;
        tile.y = endY;
      },
    });
  }

  private onTileRemove(tile: (typeof this.tiles)[number]) {
    tile.isSelected = false;
    const startX = tile.x;
    const startY = tile.y;
    const endX = this.canvas.clientWidth;
    const endY = this.canvas.clientHeight;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 200;

    animate({
      duration: 2000,
      timing: (t) => t * (2 - t),
      onUpdate: (progress) => {
        const newX =
          (1 - progress) * (1 - progress) * startX +
          2 * (1 - progress) * progress * controlX +
          progress * progress * endX;

        const newY =
          (1 - progress) * (1 - progress) * startY +
          2 * (1 - progress) * progress * controlY +
          progress * progress * endY;

        tile.x = newX;
        tile.y = newY;
      },
      onComplete: () => {
        tile.isVisible = false;
      },
    });
  }

  private get remainingShuffles() {
    return this._remainingShuffles;
  }

  private set remainingShuffles(count: typeof this._remainingShuffles) {
    this._remainingShuffles = count;
    this.onShuffleChange(count);
  }

  private get availablePairs() {
    return this._availablePairs;
  }

  private set availablePairs(count: typeof this._availablePairs) {
    this._availablePairs = count;
    this.onAvailablePairsChange(count);
  }

  private get remainingTiles() {
    return this._remainingTiles;
  }

  private set remainingTiles(count: typeof this._remainingTiles) {
    this._remainingTiles = count;
    this.onRemainingTilesChange(count);
  }
}
