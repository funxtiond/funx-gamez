import { Settings2Icon, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

export const SettingsModal = ({
  colorNum,
  setColorNum,
}: {
  colorNum: number;
  setColorNum: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactElement => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  return (
    <>
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
              placeholder="Default is 3"
              max={10}
              value={colorNum}
              className="border border-gray-400 p-1"
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setColorNum(val > 10 ? 10 : val);
              }}
            />
          </div>
          {/* <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={() => {
              setShowSettingsModal(false);
            }}
          >
            Save
          </button> */}

          <button
            className="absolute top-[8px] right-[8px] cursor-pointer"
            onClick={() => setShowSettingsModal(false)}
          >
            <X />
          </button>
        </div>
      )}
    </>
  );
};

export default function ColorQuiz() {
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [colorNum, setColorNum] = useState(4);

  const generateRandomColors = useCallback(() => {
    return Array.from({ length: colorNum || 3 }, () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    });
  }, [colorNum]);

  useEffect(() => {
    if (colorNum && colorNum !== generatedColors.length) {
      setGeneratedColors(generateRandomColors());
    }
  }, [generatedColors, generateRandomColors, colorNum]);

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
    <div className="m-0 flex place-items-center min-w-[320px] min-h-[100vh]">
      <h1>Color Quiz</h1>
      <SettingsModal colorNum={colorNum} setColorNum={setColorNum} />
      <div className="flex flex-wrap gap-[16px] my-[48px] justify-center max-w-[600px]">
        {generatedColors?.map((color, index) => (
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
