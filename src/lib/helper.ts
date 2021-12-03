import { format, parseISO } from 'date-fns';
import idLocale from 'date-fns/locale/id';

export function getAvatarUrl(name: string) {
  const splittedName = name?.split(' ').join('+');
  return `https://ui-avatars.com/api/?name=${splittedName}&bold=true&background=FEF3C7`;
}

export function formatRupiah(number: number) {
  return Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
}

export function formatDate(date: string) {
  return format(parseISO(date), 'dd MMMM yyyy', {
    locale: idLocale,
  });
}
