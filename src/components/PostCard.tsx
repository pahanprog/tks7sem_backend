import React, { useState } from "react";
import { useUnlikePostMutation } from "../generated/graphql";
import { useLikePostMutation } from "../generated/graphql";
import Like from "../images/svg/Like";
import NoPfp from "../images/svg/NoPfp";

interface PostCardProps {
  id: number;
  timestamp: string;
  creator: {
    id: number;
    username: string;
    profilePicture?: string;
  };
  title: string;
  body: string;
  picture?: string;
  isLiked: boolean;
  likeCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  creator,
  timestamp,
  title,
  body,
  picture,
  isLiked,
  likeCount,
}) => {
  const [{}, like] = useLikePostMutation();
  const [{}, unlike] = useUnlikePostMutation();

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);

  const handleLikePress = async () => {
    if (liked) {
      const result = await unlike({ id });

      if (result.data) {
        setLiked(false);
        setLikes((oldValue) => oldValue - 1);
      }
    } else {
      const result = await like({ id });

      if (result.data) {
        setLiked(true);
        setLikes((oldValue) => oldValue + 1);
      }
    }
  };

  return (
    <div className="card">
      <div className="card_header">
        <div className="card_pfp">
          {creator.profilePicture ? (
            <img
              src={`data:image/jpeg;base64,${creator.profilePicture}`}
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
        <div>
          <div className="card_username">{creator.username}</div>
          <div className="card_timestamp">
            {new Date(timestamp).toLocaleDateString() +
              " " +
              new Date(timestamp).getHours() +
              ":" +
              new Date(timestamp).getMinutes()}
          </div>
        </div>
      </div>
      <div className="card_main">
        <div className="title">{title}</div>
        <div className="image">
          {picture && (
            <img draggable={false} src={`data:image/jpeg;base64,${picture}`} />
          )}
        </div>
        <div className="card_body">{body}</div>
      </div>
      <div className="card_footer">
        <div className="card_likes" onClick={handleLikePress}>
          <div className="heart">
            <Like width={24} height={24} fill={liked ? "red" : "none"} />
          </div>
          {likes}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
