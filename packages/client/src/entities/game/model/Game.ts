import { Canvas } from '../../canvas/model/Canvas';

export abstract class Game extends Canvas {
  protected isRunning = false;
  protected startTime: Date | undefined;
  protected finishTime: Date | undefined;
  public onStartCallback: ((startTime?: Date) => void) | undefined;
  public onWinCallback:
    | ((startTime?: Date, finishTime?: Date) => void)
    | undefined;
  public onLoseCallback: (() => void) | undefined;

  public start() {
    this.isRunning = true;
    this.startTime = new Date();

    if (this.onStartCallback) {
      this.onStartCallback(this.startTime);
    }
  }

  public finish() {
    this.isRunning = false;
    this.finishTime = new Date();
  }

  protected onWin() {
    this.finish();
    if (this.onWinCallback) {
      this.onWinCallback(this.startTime, this.finishTime);
    }
  }

  protected onLose() {
    this.finish();
    if (this.onLoseCallback) {
      this.onLoseCallback();
    }
  }
}
