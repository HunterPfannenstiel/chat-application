import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Links.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface LinksProps {}

const Links: FunctionComponent<LinksProps> = ({}) => {
  const [evalu, setEvalu] = useState(false);
  const { asPath } = useRouter();
  useEffect(() => {
    setEvalu(true);
  }, [asPath]);
  return (
    <ul className={classes.links}>
      {links.map((link) => {
        const bold = evalu && link.href === asPath;
        return (
          <li key={link.href} className={`${bold ? classes.bold : ""}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const links = [
  { label: "Following", href: "/" },
  { label: "Global", href: "/?feed=global", value: "global" },
];

export default Links;
