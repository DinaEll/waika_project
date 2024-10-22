import { connectDatabase } from '@waika_project/database';
import { SERVER_PORT } from '../env';
import { createServer } from './createServer';
import { runServer } from './runServer';

jest.mock('@waika_project/database', () => ({
  connectDatabase: jest.fn(),
}));
jest.mock('./createServer');

describe('runServer', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
    (connectDatabase as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully start the server', async () => {
    const mockServer = {
      listen: jest.fn((_, callback: () => void) => callback()),
    };
    (createServer as jest.Mock).mockReturnValue(mockServer);

    await runServer();

    expect(connectDatabase).toHaveBeenCalled();
    expect(createServer).toHaveBeenCalled();
    expect(mockServer.listen).toHaveBeenCalledWith(
      SERVER_PORT,
      expect.any(Function),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `  ➜ 🎸 Server is listening on: http://localhost:${SERVER_PORT}`,
    );
  });

  it('should handle database connection error', async () => {
    const error = new Error('Database connection failed');
    (connectDatabase as jest.Mock).mockRejectedValue(error);

    await runServer();

    expect(connectDatabase).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('should handle server creation error', async () => {
    const error = new Error('Server creation failed');
    (createServer as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await runServer();

    expect(connectDatabase).toHaveBeenCalled();
    expect(createServer).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
