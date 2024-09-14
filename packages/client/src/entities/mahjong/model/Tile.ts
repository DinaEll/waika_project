import { CanvasElement } from '../../canvas/model/CanvasElement';
import type { FieldCell } from '../types';

interface TileProps {
  number: FieldCell;
  fill: string;
  imgSrc: string;
  width: number;
  height: number;
  onClick: (tile: Tile) => void;
  isVisible: boolean;
  isSelected: boolean;
  positionOnField: [number, number];
}

export class Tile extends CanvasElement {
  protected x: number;
  protected y: number;
  public props: TileProps;
  private selectedColor = 'red';

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    props: TileProps,
  ) {
    super(ctx);
    this.x = x;
    this.y = y;
    this.props = props;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public draw() {
    if (!this.isVisible) return;

    const { ctx, props, x, y } = this;
    // const { number, fill, imgSrc, height, isSelected, width } = props;
    const { fill, imgSrc, height, isSelected, width } = props;
    const img = new Image();
    img.src = imgSrc;
    ctx.drawImage(img, x, y, width, height);

    ctx.fillStyle = isSelected ? this.selectedColor : fill;
    // ctx.fillRect(x, y, width, height);
    //
    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(x, y, width, height);
    //
    // ctx.fillStyle = 'white';
    // ctx.font = '14px Arial';
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.fillText(String(number), x + width / 2, y + height / 2);
  }

  public onClick(pointX: number, pointY: number): boolean {
    if (!this.isVisible) return false;

    const { x, y } = this;
    const { height, width } = this.props;
    if (
      pointX >= x &&
      pointX <= x + width &&
      pointY >= y &&
      pointY <= y + height
    ) {
      console.log(`Tile ${this.props.number}`);
      this.props.onClick(this);
      return true;
    }
    return false;
  }

  public sameNumber(tile: Tile) {
    return this.props.number === tile.props.number;
  }

  get isVisible() {
    return this.props.isVisible;
  }

  set isVisible(state: boolean) {
    this.props.isVisible = state;
  }

  get isSelected() {
    return this.props.isSelected;
  }

  set isSelected(state: boolean) {
    this.props.isSelected = state;
  }
}
