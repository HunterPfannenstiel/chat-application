import { UserDetails } from "@_types/user";
import { FunctionComponent } from "react";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import classes from "components/ui/Connections/Connections.module.css";
import FollowButton from "@ui/Resuable/FollowButton/FollowButton";

interface ConnectionsProps {
  users: UserDetails[];
  heading?: string;
}

const Connections: FunctionComponent<ConnectionsProps> = ({
  users,
  heading,
}) => {
  console.log("users", users);
  return (
    <>
      {heading && <h1 className={classes.heading}>{heading}</h1>}
      <ul className={classes.blocks}>
        {users.map((user) => {
          return (
            <UserBlock
              user={user}
              button={
                <FollowButton
                  userId={user.userId || 0}
                  isFollowing={user.isFollowing === undefined ? true : false}
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
