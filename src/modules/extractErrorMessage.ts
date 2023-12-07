export function extractErrorMessage (error: any) {
  try {
    return (
      error?.response?.data?.message ??
      error?.message ??
      String(error)
    ) as string
  } catch (err) {
  }
}
