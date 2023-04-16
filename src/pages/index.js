import axios from "axios";
import React, { useEffect, useState } from "react";
import Meme from "../../components/Meme";
import MemeModal from "../../components/MemeModal";

function index({ data }) {
  const [memes, setMemes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentMeme, setCurrentMeme] = useState({
    id: "",
    name: "",
    blank: "",
    lines: "",
  });

  console.log(currentMeme, "................");

  useEffect(() => {
    if (data.length) {
      setMemes(data);
    }
  }, [data]);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className=" w-full bg-black p-8">
      <div className="flex flex-col gap-4 py-8 mb-8">
        <div className="font-bold text-2xl text-orange-300 self-center">
          MEME GENERATOR
        </div>
        <div className="text-white font-medium text-sm self-center text-red-950">
          Choose a template and customize the text to your likings
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {memes.map((mem) => {
          return (
            <Meme
              mem={mem}
              key={mem.id}
              visible={visible}
              setVisible={setVisible}
              setCurrentMeme={setCurrentMeme}
            />
          );
        })}
      </div>
      {visible && currentMeme.id && (
        <MemeModal
          visible={visible}
          onClose={onClose}
          currentMeme={currentMeme}
        />
      )}
    </div>
  );
}

export default index;

export async function getServerSideProps() {
  const mems = await axios.get("https://api.memegen.link/templates");
  return {
    props: {
      data: mems.data,
    },
  };
}
