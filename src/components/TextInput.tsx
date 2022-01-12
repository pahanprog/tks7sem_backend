import React from "react";
import Person from "../images/svg/Person";
import "../styles/input.css";

interface TextInputProps {
  Icon: React.ReactNode;
  placeholder: string;
  value: string;
  secure?: boolean;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
  style?: object;
}

const TextInput: React.FC<TextInputProps> = ({
  Icon,
  placeholder,
  secure,
  value,
  type,
  error,
  onChange,
  style,
}) => {
  return (
    <div className="input_container" style={style}>
      <div className="svg">{Icon}</div>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type={secure ? "password" : type}
      />
      {error && <div className="error_container">{error}</div>}
    </div>
  );
};

TextInput.defaultProps = {
  secure: false,
  type: "text",
};

export default TextInput;
