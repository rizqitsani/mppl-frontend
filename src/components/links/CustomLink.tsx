import clsx from 'clsx';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'inline-flex items-center font-bold hover:text-teal-400 animated-underline',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
