"use client";

const RequestButton = () => {
  const handleClick = async () => {
    const res = await fetch("/api/sheets", {
      method: "GET", // or POST if your route expects POST
    });

    if (!res.ok) {
      console.error("Failed to load sheet");
      return;
    }

    const data = await res.json();
    console.log(data);
  };

  return <button onClick={handleClick}>Load sheet</button>;
};

export default RequestButton;
