import Image from "next/legacy/image";
import React from "react";
import MemeModal from "./MemeModal";
import axios from "axios";

function Meme({ mem, visible, setVisible, setCurrentMeme }) {
  const memeGenerate = (e, id) => {
    setVisible(true);
    console.log(id);
    setCurrentMeme({
      id: mem.id,
      name: mem.name,
      blank: mem.blank,
      lines: mem.lines,
    });
  };

  return (
    <div className="flex flex-col bg-gray-900  h-fit justify-center items-center">
      <div className=" h-64 w-60 object-cover relative ">
        <Image
          src={mem.blank}
          alt="Example Image"
          layout="fill"
          className=" object-cover h-full w-full"
          style={{ objectPosition: "center top" }}
        />
      </div>
      <div className="text-sm text-white self-center font-semibold mt-2 max-w-[200px] truncate ">
        {mem.name}
      </div>
      <button
        onClick={(e) => memeGenerate(e, mem)}
        className="bg-orange-300 font-sans font-bold text-gray-900 text-sm rounded-full  my-6 py-2 px-4 "
      >
        Generate
      </button>
    </div>
  );
}

export default Meme;
