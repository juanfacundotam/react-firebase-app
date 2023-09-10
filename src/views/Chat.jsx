import React from "react";
import { Link } from "react-router-dom";
export default function Chat() {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <Link to="/">Home</Link>
      <h1>Chat</h1>
    </div>
  );
}
