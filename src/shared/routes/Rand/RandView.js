import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function RandView() {
  const [rand, setRand] = useState(0);
  const getRand = () => {
    fetch("/api/v1/rand")
      .then((d) => d.text())
      .then(setRand);
  };
  return (
    <>
      <Helmet>Rand App</Helmet>
      <h1>Your number is {rand}!</h1>
      <button onClick={getRand}>Get a random number</button>
    </>
  );
}
