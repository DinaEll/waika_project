import { getReasonMessage } from './getReasonMessage';
import { isError } from './isError';
import { logError } from './logError';
import { showMessage } from './showMessage';

export function showErrorMessage(error: unknown) {
  logError(error);

  const reasonMessage = getReasonMessage(error);
  const defaultMessage = isError(error)
    ? error.message
    : 'Something went wrong. Please try again later.';

  const content = reasonMessage ?? defaultMessage;

  showMessage({
    title: 'An error occurred',
    content,
    type: 'error',
  });
}
