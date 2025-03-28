import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import '@/Root.css';
import { setAll } from '@/Root';
import { Video } from '@/weights/Video';
import { ItemType, MANAGER } from "../user/ItemHandler";
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Loading } from "@/Loading";
import { useAsyncEffect } from 'use-async-effect';
import { checkAndGetUser } from "../user/User";

interface Step {
  video: string;
  subtitleKey: string;
}

export const GetStart: React.FC<{}> = ({ }) => {
  setAll();

  const { t } = useTranslation();

  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const barRef = useRef<HTMLDivElement>(null);

  const changeBar = (index: number) => {
    if (barRef.current) {
      if (index === 0) {
        barRef.current.classList.remove("bottom-0");
        barRef.current.classList.add("top-0");
      } else {
        barRef.current.classList.add("bottom-0");
        barRef.current.classList.remove("top-0");
      }
    }
  };

  const asyncSetIndex =  (index: number) => {
    setStepIndex(index);
    changeBar(index);
    MANAGER.set(checkAndGetUser(), ItemType.STEP_INDEX, stepIndex);
  };

  useAsyncEffect(async isMounted => {
    const response = await fetch("/videos/step.json");
    if (!isMounted()) return;

    setSteps(await response.json());
    if (!isMounted()) return;

    let storedValue = await MANAGER.get(checkAndGetUser(), ItemType.STEP_INDEX);
    storedValue = storedValue === undefined ? 0 : storedValue;
    if (!isMounted()) return;

    setStepIndex(storedValue);
    changeBar(storedValue);

    setIsLoaded(true);
  }, []);

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      asyncSetIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      asyncSetIndex(stepIndex - 1);
    }
  };

  if (!isLoaded) {
    return <ThemeProvider storageKey="vite-ui-theme">
      <Loading isLoading={!isLoaded} theme={useTheme().theme} />
    </ThemeProvider>;
  }

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center h-screen">
        {steps[stepIndex].video ? (
          <Video second={2} src={steps[stepIndex].video} elementKey={steps[stepIndex].video} />
        ) : (
          <FaCheckCircle size={100} className="mb-4 text-green-500" />
        )}

        <div ref={barRef} className="fixed bottom-0 left-0 w-full flex flex-col items-center mb-4">
          <h2 className="m-4 p-2 text-2xl bg-gray-700 rounded" dangerouslySetInnerHTML={ { __html: `${t(steps[stepIndex].subtitleKey)}`}}></h2>

          <div className="flex gap-4">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-gray-200 shadow-md px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-600"
              onClick={prevStep}
              disabled={stepIndex === 0}>
              <FaArrowLeft />
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-800 text-gray-200 shadow-md px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-600"
              onClick={nextStep}
              disabled={stepIndex === steps.length - 1}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};