import React, { useContext, useEffect, useRef, useState } from "react";
import NoPfp from "../images/svg/NoPfp";
import {
  useChangeInfoMutation,
  useChangePfpMutation,
  useMeQuery,
} from "../generated/graphql";
import { AuthContext } from "../context/Auth";
import TextInput from "./TextInput";

const My = () => {
  const [{}, changePfp] = useChangePfpMutation();
  const [{}, changeInfo] = useChangeInfoMutation();
  const [{ data, fetching, error }] = useMeQuery({
    requestPolicy: "network-only",
  });
  const { user, setUser } = useContext(AuthContext);

  const _firstRender = useRef(true);

  useEffect(() => {
    _firstRender.current = false;
  }, []);

  const [base64, setBase64] = useState<string | null>(null);
  const [pfp, setPfp] = useState("");

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

  useEffect(() => {
    if (data.me.profilePicture && pfp !== data.me.profilePicture) {
      setPfp(data.me.profilePicture);
    }
  }, [data]);

  useEffect(() => {
    const handle = async () => {
      const result = await changePfp({ pfp: base64 });

      if (result.data.changePfp) {
        setPfp(result.data.changePfp);
        setUser({ ...user, profilePicture: result.data.changePfp });
      }
    };

    if (!_firstRender.current) {
      handle();
    }
  }, [base64]);

  const [email, setEmail] = useState(data.me.email);
  const [username, setUsername] = useState(data.me.username);
  const [editing, setEditing] = useState(false);

  const handleSaveEdit = async () => {
    const result = await changeInfo({ email, username });

    if (result.data.changeInfo) {
      setEditing(false);
      setUser({ ...user, username });
    }
  };

  if (fetching || !data.me) {
    return null;
  }

  return (
    <div className="home_content">
      {editing ? (
        <>
          <form>
            <TextInput
              Icon={""}
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />
            <TextInput
              Icon={""}
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />
          </form>
          <div className="save_edit" onClick={handleSaveEdit}>
            Save
          </div>
        </>
      ) : (
        <div className="my_container">
          <div className="my_pfp">
            <form
              onSubmit={(e) => onFileSubmit(e)}
              onChange={(e) => onChange(e)}
            >
              <input
                id="my"
                type="file"
                name="avatar"
                accept=".jpef, .png, .jpg"
                onChange={photoUpload}
              />
            </form>
            {pfp ? (
              <img
                draggable={false}
                src={`data:image/jpeg;base64,${pfp}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <NoPfp width={100} height={100} fill="black" />
            )}
          </div>
          <div className="info">
            <div className="email">Email: {email}</div>
            <div className="username">Username: {username}</div>
          </div>
          <div
            className="edit_btn"
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </div>
        </div>
      )}
    </div>
  );
};

export default My;
