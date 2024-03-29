import { forwardRef } from "react";
import Link from "next/link";
import { useTheme } from "../core/settings/useTheme";

export const PageLink = forwardRef<typeof Link, any>(
  ({ children, href, as, ...rest }, ref) => {
    const { colors } = useTheme();
    return (
      <>
        <Link href={href} as={as} legacyBehavior>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Link>
        <style jsx>{`
          a:focus-visible {
            outline: 1px auto ${colors.focusOutline};
          }
        `}</style>
      </>
    );
  }
);
