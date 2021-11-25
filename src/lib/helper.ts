export function getAvatarUrl(name) {
  const splittedName = name?.split(' ').join('+');
  return `https://ui-avatars.com/api/?name=${splittedName}&bold=true&background=FEF3C7`;
}
