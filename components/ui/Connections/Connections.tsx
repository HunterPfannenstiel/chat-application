import { UserDetails } from "@_types/user";
import { FunctionComponent, RefObject } from "react";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import classes from "components/ui/Connections/Connections.module.css";
import FollowButton from "@ui/Resuable/FollowButton/FollowButton";
import { SetScrollEvent } from "@hooks/page-fetch/types";

interface ConnectionsProps {
  users: UserDetails[];
  heading?: string;
  className?: string;
  setScrollEvent?: SetScrollEvent;
  updateFollowerCount: (amount: number, userIndex?: number) => void;
}

const Connections: FunctionComponent<ConnectionsProps> = ({
  users,
  heading,
  className,
  setScrollEvent,
  updateFollowerCount,
}) => {
  return (
    <>
      {heading && <h1 className={classes.heading}>{heading}</h1>}
      <ul
        className={`${classes.blocks} ${className ? className : ""}`}
        ref={setScrollEvent}
      >
        {users.map((user, i) => {
          return (
            <UserBlock
              key={user.userHandle}
              user={user}
              button={
                <FollowButton
                  handle={user.userHandle}
                  updateFollowerCount={updateFollowerCount}
                  index={i}
                  userId={user.userId || 0}
                  isFollowing={!!user.isFollowing}
                />
              }
            />
          );
        })}
      </ul>
    </>
  );
};

export default Connections;
