import { connectDatabase } from './connectDatabase';
import { createDatabaseClient } from './createDatabaseClient';

jest.mock('./createDatabaseClient');

describe('connectDatabase', () => {
  let mockSync: jest.Mock;
  let mockConsoleLog: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    mockSync = jest.fn();
    (createDatabaseClient as jest.Mock).mockReturnValue({ sync: mockSync });
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully connect to the database', async () => {
    mockSync.mockResolvedValue(undefined);

    await connectDatabase();

    expect(createDatabaseClient).toHaveBeenCalled();
    expect(mockSync).toHaveBeenCalledWith({ force: false });
    expect(mockConsoleLog).toHaveBeenCalledWith(
      '  ➜ 🎸 Connected to the database and synchronized models.',
    );
    expect(mockConsoleError).not.toHaveBeenCalled();
  });

  it('should handle database connection error', async () => {
    const error = new Error('Connection failed');
    mockSync.mockRejectedValue(error);

    await connectDatabase();

    expect(createDatabaseClient).toHaveBeenCalled();
    expect(mockSync).toHaveBeenCalledWith({ force: false });
    expect(mockConsoleLog).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Unable to connect to the database:',
      error,
    );
  });
});
