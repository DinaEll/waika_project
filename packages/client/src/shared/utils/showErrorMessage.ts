import { isError } from './isError';
import { logError } from './logError';
import { showMessage } from './showMessage';

export function showErrorMessage(error: unknown) {
  logError(error);
  showMessage({
    title: 'An error occurred',
    content: isError(error)
      ? error.message
      : 'Something went wrong. Please try again later.',
    type: 'error',
  });
}
