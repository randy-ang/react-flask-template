import React, { useState } from "react";

export default function HomeView() {
  const [rand, setRand] = useState(0);
  const getRand = () => {
    fetch("/api/v1/rand")
      .then((d) => d.text())
      .then(setRand);
  };
  return (
    <>
      <h1>Your number is {rand}!</h1>
      <button onClick={getRand}>Get a random number</button>
    </>
  );
}
