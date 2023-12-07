export function extractErrorMessage (error: any) {
  try {
    return (
      error?.response?.data?.message ?? error?.message
    ) as string | undefined
  } catch (err) {
  }
}
