import { CanvasLayer } from './CanvasLayer';

export class Canvas {
  private _canvas: HTMLCanvasElement | undefined;
  protected ctx: CanvasRenderingContext2D;
  public layers: CanvasLayer[] = [];
  protected images: Record<string, CanvasImageSource> = {};
  private requestAnimationFrameId:
    | ReturnType<typeof requestAnimationFrame>
    | undefined;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', this.onCanvasClick);
    this.ctx = this.createContext(canvas);
    this.canvas = canvas;
    this.animationLoop();
  }

  private createContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(canvas.clientWidth * scale);
    canvas.height = Math.floor(canvas.clientHeight * scale);
    const context = canvas.getContext('2d');
    if (context) {
      context.scale(scale, scale);
      return context;
    }

    throw new Error('Create canvas context failed');
  }

  private animationLoop = () => {
    this.clear();
    this.drawLayers();
    this.requestAnimationFrameId = requestAnimationFrame(this.animationLoop);
  };

  public addLayer(layer: CanvasLayer) {
    this.layers.push(layer);
  }

  private drawLayers() {
    this.layers.forEach((layer) => layer.draw());
  }

  onCanvasClick = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.layers.forEach((layer) => layer.onClick(x, y));
  };

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public destroy() {
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = undefined;
    }
    this.canvas.removeEventListener('click', this.onCanvasClick);
    this.canvas = undefined;
  }

  loadImage(src: string, id: string) {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        this.images[id] = img;
        resolve();
      };

      img.onerror = () => {
        reject(new Error(`Error load image: ${src}`));
      };
    });
  }

  get canvas(): Exclude<typeof this._canvas, undefined> {
    if (!this._canvas) {
      throw new Error('Canvas not found');
    }
    return this._canvas;
  }

  set canvas(canvasNode: typeof this._canvas) {
    this._canvas = canvasNode;
  }
}
