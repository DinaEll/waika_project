import { CanvasElement } from './CanvasElement'

export class CanvasLayer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private _elements: CanvasElement[] = []
  ) {}

  public draw() {
    this._elements.forEach(element => element.draw())
  }

  public onClick(x: number, y: number) {
    this._elements.forEach(element => element.onClick(x, y))
  }

  public addElement(element: typeof this._elements[number]) {
    this._elements.push(element)
  }

  public setElements(elements: typeof this._elements) {
    this._elements = elements
  }
}
