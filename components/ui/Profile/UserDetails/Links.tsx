import { FunctionComponent, ReactNode } from "react";
import FollowLink from "./FollowLink";
import classes from "./Links.module.css";
import { LinkProps } from "@_types/profile";

interface LinksProps {
  linkInfo: LinkProps[];
}

const Links: FunctionComponent<LinksProps> = ({ linkInfo }) => {
  return (
    <ul className={classes.links}>
      {linkInfo.map((link, i) => {
        return (
          <FollowLink
            href={link.href}
            count={link.count}
            label={link.label}
            key={i}
          />
        );
      })}
    </ul>
  );
};

export default Links;
