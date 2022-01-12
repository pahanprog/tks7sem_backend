import React from "react";
import { useGetIncomingRequestsQuery } from "../generated/graphql";
import UserCard from "./UserCard";

const Incoming = () => {
  const [{ data, fetching, error }] = useGetIncomingRequestsQuery({
    requestPolicy: "network-only",
  });

  if (fetching) {
    return null;
  }

  return (
    <div>
      {data.getIncomingRequests.map((u, i) => {
        const user = u.sender;
        return (
          <UserCard
            id={user.id}
            username={user.username}
            profilePicture={user.profilePicture}
            key={i}
            canRespond
          />
        );
      })}
    </div>
  );
};

export default Incoming;
