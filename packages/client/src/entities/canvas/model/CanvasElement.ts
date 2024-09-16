export abstract class CanvasElement {
  constructor(protected ctx: CanvasRenderingContext2D) {}
  protected abstract x: number;
  protected abstract y: number;
  public abstract draw(): void;
  public abstract onClick(x: number, y: number): boolean;
}
