import { FunctionComponent, ReactNode } from "react";
import FollowLink from "./FollowLink";
import classes from "./Links.module.css";
import { LinkProps } from "@_types/profile";

interface LinksProps {
  linkInfo: LinkProps[];
  asPath?: string;
}

const Links: FunctionComponent<LinksProps> = ({ linkInfo, asPath }) => {
  return (
    <ul className={classes.links}>
      {linkInfo.map((link, i) => {
        return (
          <FollowLink
            href={link.href}
            count={link.count}
            label={link.label}
            key={i}
            asPath={asPath}
          />
        );
      })}
    </ul>
  );
};

export default Links;
