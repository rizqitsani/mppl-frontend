export function getAvatarUrl(name) {
  const splittedName = name?.split(' ').join('+');
  return `https://ui-avatars.com/api/?name=${splittedName}&bold=true&background=FEF3C7`;
}

export function formatRupiah(number) {
  return Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
}
