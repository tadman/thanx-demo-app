import React from "react";

export default function Fault({ error }) {
  return <div className="border-red-500 border-2 p-4 rounded-md">
    {error.toString()}
  </div>;
}
