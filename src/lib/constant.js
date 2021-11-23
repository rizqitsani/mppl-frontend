export const defaultToastMessage = {
  loading: 'Loading...',
  success: 'Berhasil',
  error: (err) =>
    err?.response?.data?.message ?? 'Terjadi kesalahan, mohon coba lagi',
};
