import React, { useContext, useEffect, useState } from "react";
import NoPfp from "../images/svg/NoPfp";
import { useCreatePostMutation, useGetFeedQuery } from "../generated/graphql";
import Like from "../images/svg/Like";
import PostCard from "./PostCard";
import TextInput from "./TextInput";
import { AuthContext } from "../context/Auth";
import Attach from "../images/svg/Attach";

const Feed = () => {
  const [{}, create] = useCreatePostMutation();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [{ data, fetching, error }] = useGetFeedQuery({
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (data && data.getFeed) {
      setPosts(data.getFeed);
    }

    if (!fetching) {
      setLoading(false);
    }
  }, [fetching]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [base64, setBase64] = useState<string | null>(null);

  const [posts, setPosts] = useState<
    {
      __typename?: "Post";
      id: number;
      createdAt: any;
      updatedAt?: any;
      title: string;
      body: string;
      picture?: string;
      isEdited: boolean;
      likeCount: number;
      isLiked: boolean;
      creator: {
        __typename?: "User";
        id: number;
        username: string;
        profilePicture?: string;
      };
    }[]
  >([]);

  if (loading) {
    return <div>Loading</div>;
  }

  const onChange = (e: any) => {
    console.log("file", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const onFileSubmit = (e: any) => {
    e.preventDefault();
    console.log("BASE 64: ", base64);
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log("reader", reader);
    console.log("file", file);
  };

  const handleCreate = async () => {
    const post = {
      title,
      body,
      picture: base64,
    };

    const result = await create(post);

    if (result.data.createPost.post) {
      const copy = posts;
      const newPosts = [result.data.createPost.post].concat(copy);
      setTitle("");
      setBody("");
      setBase64(null);
      setPosts(newPosts);
    }
  };

  return (
    <div className="home_content">
      <div className="feed_create">
        <div className="create_pfp">
          {user.profilePicture ? (
            <img
              draggable={false}
              src={`data:image/jpeg;base64,${user.profilePicture}`}
              style={{
                width: 28,
                height: 28,
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
          ) : (
            <NoPfp width={28} height={28} fill="black" />
          )}
        </div>
        <div>Whats on your mind?</div>
        <div className="create_form">
          <TextInput
            Icon={""}
            placeholder={"Title of your post"}
            value={title}
            onChange={setTitle}
            style={{ width: "200px", marginBottom: "10px" }}
          />
          <TextInput
            Icon={""}
            placeholder={"Body of your post"}
            value={body}
            onChange={setBody}
            style={{ marginBottom: "0px" }}
          />
        </div>
        <div className="create_attachment">
          <Attach width={28} height={28} />
          <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
            <input
              id="post"
              type="file"
              name="avatar"
              accept=".jpef, .png, .jpg"
              onChange={photoUpload}
            />
          </form>
        </div>
        <div className="create_btn" onClick={handleCreate}>
          Post
        </div>
      </div>
      {posts.length === 0 && <div>No posts</div>}
      {posts.map((p, i) => {
        return (
          <PostCard
            id={p.id}
            timestamp={p.createdAt}
            creator={p.creator}
            title={p.title}
            body={p.body}
            likeCount={p.likeCount}
            isLiked={p.isLiked}
            picture={p.picture}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Feed;
