import { CanvasElement } from './CanvasElement';

export class CanvasLayer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private _elements: CanvasElement[] = [],
  ) {}

  public draw() {
    this._elements.forEach((element) => element.draw());
  }

  public onClick(x: number, y: number) {
    this._elements.forEach((element) => element.onClick(x, y));
  }

  public addElement(element: (typeof this._elements)[number]) {
    this._elements.push(element);
  }

  public removeElement(element: (typeof this._elements)[number]) {
    const newElements = [...this._elements];
    const index = newElements.indexOf(element);
    if (index !== -1) {
      newElements.splice(index, 1);
    }

    this._elements = newElements;
  }

  public setElements(elements: typeof this._elements) {
    this._elements = elements;
  }

  public clear() {
    this._elements = [];
  }
}
