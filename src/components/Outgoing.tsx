import React from "react";
import { useGetOutgoingRequestsQuery } from "../generated/graphql";
import UserCard from "./UserCard";

const Outgoing = () => {
  const [{ data, fetching, error }] = useGetOutgoingRequestsQuery({
    requestPolicy: "network-only",
  });

  if (fetching) {
    return null;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div>
      {data.getOutgoingRequests.map((u, i) => {
        const user = u.recipient;
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

export default Outgoing;
