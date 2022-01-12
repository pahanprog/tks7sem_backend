import React, { useState } from "react";
import { useGetAllUsersQuery } from "../generated/graphql";
import UserCard from "./UserCard";

const New = () => {
  const [{ data, fetching, error }] = useGetAllUsersQuery({
    requestPolicy: "network-only",
  });

  if (fetching) {
    return null;
  }

  return (
    <div>
      {data.getAllUsers.map((u, i) => {
        return (
          <UserCard
            id={u.id}
            username={u.username}
            profilePicture={u.profilePicture}
            key={i}
            canRequest
          />
        );
      })}
    </div>
  );
};

export default New;
