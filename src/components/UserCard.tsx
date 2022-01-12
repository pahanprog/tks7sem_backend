import React, { useState } from "react";
import {
  useSendFriendRequestMutation,
  useSendFriendResponseMutation,
} from "../generated/graphql";
import NoPfp from "../images/svg/NoPfp";

interface UserCardProps {
  id: number;
  username: string;
  profilePicture?: string;
  canRespond?: boolean;
  canRequest?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  username,
  profilePicture,
  canRespond,
  canRequest,
}) => {
  const [{}, sendResponse] = useSendFriendResponseMutation();
  const [{}, sendRequest] = useSendFriendRequestMutation();
  const [visible, setVisible] = useState(true);

  const handleAdd = async () => {
    const result = await sendResponse({ id });

    if (result.data.sendFriendResponse) {
      setVisible(false);
    }
  };

  const handleRequest = async () => {
    const result = await sendRequest({ id });

    if (result.data.sendFriendRequest) {
      setVisible(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="user_card">
      <div className="user_pfp">
        {profilePicture ? (
          <img
            draggable={false}
            src={`data:image/jpeg;base64,${profilePicture}`}
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
        ) : (
          <NoPfp width={40} height={40} fill="lightgray" />
        )}
      </div>
      <div className="user_username">{username}</div>
      {canRespond && (
        <div className="user_response" onClick={handleAdd}>
          Add to friends
        </div>
      )}
      {canRequest && (
        <div className="user_response" onClick={handleRequest}>
          Send request
        </div>
      )}
    </div>
  );
};

UserCard.defaultProps = {
  canRespond: false,
};

export default UserCard;
