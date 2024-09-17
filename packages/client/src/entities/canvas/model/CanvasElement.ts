export abstract class CanvasElement {
  constructor(protected ctx: CanvasRenderingContext2D) {}
  public abstract x: number;
  public abstract y: number;
  public abstract draw(): void;
  public abstract onClick(x: number, y: number): boolean;
}
