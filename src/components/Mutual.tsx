import React from "react";
import { useGetFriendListQuery } from "../generated/graphql";
import UserCard from "./UserCard";

const Mutual = () => {
  const [{ data, fetching, error }] = useGetFriendListQuery({
    requestPolicy: "network-only",
  });

  if (fetching) {
    return null;
  }

  return (
    <div>
      {data.getFriendList.map((u, i) => {
        const user = u.recipient || u.sender;
        return (
          <UserCard
            id={user.id}
            username={user.username}
            profilePicture={user.profilePicture}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Mutual;
