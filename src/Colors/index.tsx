import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function ColorQuiz() {
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);

  const generateRandomColors = () => {
    return Array.from({ length: 4 }, () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    });
  };

  useEffect(() => {
    if (generatedColors.length === 0) {
      setGeneratedColors(generateRandomColors());
    }
  }, [generatedColors]);

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
        autoClose={500}
        transition={Slide}
      />
    </div>
  );
}
