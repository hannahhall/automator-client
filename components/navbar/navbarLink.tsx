import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface NavbarLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
  href: string;
}

const defaultProps = {
  className: 'navbar-item',
};

function NavbarLink({
  href, className, children,
}: NavbarLinkProps) {
  return (
    <Link href={href}>
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  );
}

NavbarLink.defaultProps = defaultProps;

export default NavbarLink;
