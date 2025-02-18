import 'bootstrap/dist/css/bootstrap.min.css';
import './GetStart.css';
import { useLayoutEffect } from 'react';
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

function App() {
  useLayoutEffect(() => {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.body.setAttribute('data-bs-theme', mode);
    (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
  }, []);

  const steps = [
    { title: "下載並安裝 Node.js", video: "step1.mp4", subtitle: "請先下載並安裝 Node.js。" },
    { title: "安裝 VSCode", video: "step2.mp4", subtitle: "下載並安裝 Visual Studio Code。" },
    { title: "安裝 React", video: "step3.mp4", subtitle: "使用 npm 安裝 React 環境。" },
    { title: "完成！", video: "", subtitle: "恭喜，你已成功安裝所有環境！" }
  ];

  const [stepIndex, setStepIndex] = useState(() => {
    return parseInt(localStorage.getItem("stepIndex") || "0", 10);
  });

  useEffect(() => {
    localStorage.setItem("stepIndex", stepIndex.toString());
  }, [stepIndex]);

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{steps[stepIndex].title}</h1>
      {steps[stepIndex].video ? (
        <video className="w-full max-w-lg mb-4" controls autoPlay loop>
          <source src={steps[stepIndex].video} type="video/mp4" />
        </video>
      ) : (
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      )}
      <p className="mb-4">{steps[stepIndex].subtitle}</p>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={prevStep}
          disabled={stepIndex === 0}
        >
          <FaArrowLeft />
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={nextStep}
          disabled={stepIndex === steps.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default App;
