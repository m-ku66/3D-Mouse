import React from "react";
import Image from "next/image";

const UserInterface = () => {
  return (
    <>
      <h1 className="fadeIn1 absolute top-5 left-5 z-10 text-[3rem] font-bold italic">
        Box Grid
      </h1>
      <Image
        className="absolute bottom-5 left-5 z-10"
        src="/copyright.svg"
        alt="Marc Miango"
        width={150}
        height={150}
      />
      <div className="absolute bottom-5 right-5 z-10 w-[100px] h-[100px] bg-gray-700"></div>
    </>
  );
};

export default UserInterface;
