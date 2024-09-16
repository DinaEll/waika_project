import { CanvasLayer } from '@/entities/canvas';
import { Canvas } from '../model/Canvas';

describe('Canvas', () => {
  let canvasInstance: Canvas;

  beforeEach(() => {
    const canvasElement = document.createElement('canvas');
    const mockContext = {
      clearRect: jest.fn(),
      scale: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    jest.spyOn(canvasElement, 'getContext').mockReturnValue(mockContext);

    canvasInstance = new Canvas(canvasElement);
  });

  describe('addLayer', () => {
    it('should add a new layer to the layers array', () => {
      const layer = new CanvasLayer({} as CanvasRenderingContext2D);

      expect(canvasInstance.layers).toHaveLength(0);

      canvasInstance.addLayer(layer);

      expect(canvasInstance.layers).toHaveLength(1);

      expect(canvasInstance.layers[0]).toBe(layer);
    });
  });
});
