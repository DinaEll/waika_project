export function getReasonMessage(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const err = error as { response?: { data?: { reason?: string } } };
    return err.response?.data?.reason;
  }
  return undefined;
}
