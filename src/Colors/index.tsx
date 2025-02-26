import { Settings2Icon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function ColorQuiz() {
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [colorNum, setColorNum] = useState(4);

  const generateRandomColors = () => {
    return Array.from({ length: colorNum }, () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    });
  };

  useEffect(() => {
    if (generatedColors.length === 0 || colorNum !== generatedColors.length) {
      setGeneratedColors(generateRandomColors());
    }
  }, [generatedColors, colorNum]);

  const correctColor =
    generatedColors[Math.floor(Math.random() * generatedColors.length)];

  const handleColorClick = (color: string) => {
    if (color === correctColor) {
      toast.success("Wow, Correct! 🎉");
      setGeneratedColors(generateRandomColors());
    } else {
      toast.error("Oops, Wrong! 😢");
    }
  };

  return (
    <div>
      <h1>Color Quiz</h1>
      <div className="absolute top-[42px] right-[42px] cursor-pointer">
        <Settings2Icon size={32} onClick={() => setShowSettingsModal(true)} />
      </div>
      {showSettingsModal && (
        <div className="absolute top-[52px] right-[100px] border border-gray-400 rounded-lg p-[24px] flex flex-col gap-4">
          <h5>Settings</h5>
          <div className="flex gap-2 items-center">
            <label>Number of colors</label>
            <input
              type="number"
              name="color_num"
              id="color_num"
              className="border border-gray-400 p-1"
              onChange={(e) => setColorNum(parseInt(e.target.value))}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={() => {
              // setGeneratedColors(num);
              setShowSettingsModal(false);
            }}
          >
            Save
          </button>

          <button
            className="absolute top-[8px] right-[8px]"
            onClick={() => setShowSettingsModal(false)}
          >
            <X />
          </button>
        </div>
      )}
      <div className="flex gap-[16px] my-[32px]">
        {generatedColors.map((color, index) => (
          <div
            key={index}
            className={`w-[100px] h-[100px] cursor-pointer rounded-full`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
      <h2>{correctColor}</h2>
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={1000}
        transition={Slide}
      />
    </div>
  );
}
