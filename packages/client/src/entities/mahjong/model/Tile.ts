import { CanvasElement } from '../../canvas/model/CanvasElement';
import type { MahjongFieldCell } from '../types';

interface TileProps {
  number: NonNullable<MahjongFieldCell>;
  fill: string;
  width: number;
  height: number;
  onClick: (tile: Tile) => void;
  isVisible: boolean;
  isSelected: boolean;
  positionOnField: { z: number; y: number; x: number };
}

export class Tile extends CanvasElement {
  public x: number;
  public y: number;
  public props: TileProps;
  private selectedColor = 'red';

  constructor(
    ctx: CanvasRenderingContext2D,
    coords: { x: number; y: number },
    props: TileProps,
  ) {
    super(ctx);
    this.x = coords.x;
    this.y = coords.y;
    this.props = props;
  }

  public draw() {
    if (!this.isVisible) return;

    const { ctx, props, x, y } = this;
    const { number, fill, height, isSelected, width, positionOnField } = props;

    ctx.fillStyle = isSelected ? this.selectedColor : fill;
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, width, height);

    if (positionOnField.z === 0) {
      ctx.fillStyle = 'white';
    } else if (positionOnField.z === 1) {
      ctx.fillStyle = 'blue';
    } else {
      ctx.fillStyle = 'black';
    }

    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(number), x + width / 2, y + height / 2);
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

  public showUnavailability() {
    setTimeout(() => {
      this.isSelected = true;
      setTimeout(() => {
        this.isSelected = false;
      }, 400);
    }, 400);
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
