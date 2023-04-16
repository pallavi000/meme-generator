import React, { useState } from "react";
import Image from "next/legacy/image";

function MemeModal({ visible, onClose, currentMeme }) {
  const [text, setText] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [newImg, setNewImg] = useState("");

  if (!visible) {
    return null;
  }
  const handleClose = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const layers = Object.values(text);
    let newImg = `https://api.memegen.link/images/${currentMeme.id}/`;
    layers.forEach((value, i) => {
      const isLast = layers.length - 1 === i;
      if (isLast) {
        newImg += encodeURIComponent(`${value}.png`);
        return;
      }
      newImg += encodeURIComponent(`${value}/`);
    });

    setNewImg(newImg);
  };

  const handleChange = (e) => {
    const currentInput = e.target.attributes.getNamedItem("data-index")?.value;

    if (currentInput) {
      setText((prev) => ({
        ...prev,
        [currentInput]: e.target.value,
      }));
    }
  };

  const arrayOfLines = Array.from(Array(currentMeme.lines).keys());
  console.log(arrayOfLines);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div
      id="container"
      onClick={(e) => handleClose(e)}
      className="text-white bg-black fixed bg-opacity-50 inset-0 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-gray-900 h-fit w-96 text-white flex justify-end items-center rounded-sm">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center items-center gap-3 mt-8"
        >
          {arrayOfLines.map((line, i) => {
            return (
              <input
                className="bg-white w-1/2 rounded p-1 text-black "
                placeholder="Add text"
                data-index={i}
                key={i}
                onChange={handleChange}
              />
            );
          })}

          <button type="submit" className="text-orange-300 font-serif">
            Generate
          </button>
          {isLoading && (
            <strong className="loading-statement primary-gradient">
              Please wait, Generating new text...
            </strong>
          )}

          <div className=" h-64 w-96 object-cover relative ">
            <Image
              src={newImg || currentMeme.blank}
              alt="Example Image"
              layout="fill"
              className=" object-cover h-full w-full"
              style={{ objectPosition: "center top" }}
              onLoad={handleImageLoaded}
            />
          </div>
          <button
            type="button"
            onClick={() => onClose()}
            className="rounded-full py-2 px-3 my-8 bg-orange-300 text-black font-serif font-bold capitalize"
          >
            Change template
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemeModal;
