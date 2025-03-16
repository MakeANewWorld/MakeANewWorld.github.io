import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import '@/Root.css';
import { setAll } from '@/Root';
import { Video } from '@/weights/Video';
import { getItem, setItem } from '@/pages/user/User';
import { useTranslation } from 'react-i18next';

export const GetStart: React.FC<{}> = ({ }) => {
  setAll();
  const { t } = useTranslation();
  const steps = [
    { video: "/videos/download.mkv", subtitleKey: "download-file" },
    { video: "/videos/open_file.mkv", subtitleKey: "open-file" },
    { video: "/videos/accept.mkv", subtitleKey: "wait-accept" },
    { video: "/videos/pre_setting.mkv", subtitleKey: "follow-video" },
    { video: "/videos/trust_project.mkv", subtitleKey: "trust-project" },
    { video: "/videos/cancel.mkv", subtitleKey: "click-cancel" },
    { video: "/videos/exclude_folders.mkv", subtitleKey: "exclude-folders" },
    { video: "/videos/close_pop.mkv", subtitleKey: "close-pop" },
    { video: "/videos/close_pop_2.mkv", subtitleKey: "close-pop-2" },
    { video: "/videos/gradle_setting.mkv", subtitleKey: "gradle-setting" },
    { video: "/videos/gradle_setting_ing.mkv", subtitleKey: "gradle-setting-ing" },
    { video: "/videos/skip_ok.mkv", subtitleKey: "skip-ok" },
    { video: "/videos/rerun.mkv", subtitleKey: "click-refresh" },
    { video: "/videos/install_process.mp4", subtitleKey: "install-process" },
    { video: "/videos/finish.mkv", subtitleKey: "install-done" },
    { video: "/videos/end.mkv", subtitleKey: "close-script" },
    { video: "", subtitleKey: "setup-done" }
  ];

  const changeBar = (index: number) => {
    if (index === 0) {
      document.getElementById("b-br")?.classList.remove("fixed-bottom");
      document.getElementById("b-br")?.classList.add("fixed-top");
    } else {
      document.getElementById("b-br")?.classList.add("fixed-bottom");
      document.getElementById("b-br")?.classList.remove("fixed-top");
    }
  };
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const fetchStepIndex = async () => {
      const storedValue = await getItem("stepIndex");
      setStepIndex(parseInt(storedValue || "0", 10));
      changeBar(parseInt(storedValue || "0", 10));
    };
    fetchStepIndex();
  }, []);

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      changeBar(stepIndex + 1);
      setItem("stepIndex", (stepIndex + 1).toString());
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      changeBar(stepIndex - 1);
      setItem("stepIndex", (stepIndex - 1).toString());
    }
  };

  return (
    <div className="d-flex vh-100 flex-column align-items-center justify-content-center">
      {steps[stepIndex].video ? (
        <Video second={2} src={steps[stepIndex].video} elementKey={steps[stepIndex].video} ></Video>
      ) : (
        <FaCheckCircle size={100} className="mb-4 text-success" />
      )}
      <div id="b-br" className='fixed-bottom d-flex flex-column align-items-center mb-4'>
        <h2 className="m-4 noto text p-2" dangerouslySetInnerHTML={{ __html: t(steps[stepIndex].subtitleKey) }}></h2>
        <div className="d-flex gap-4">
          <button
            className="btn btn-disable-border bg-inverse bg-inverse-hover shadow px-4 py-2"
            onClick={prevStep}
            disabled={stepIndex === 0}>
            <FaArrowLeft />
          </button>
          <button
            className="btn btn-disable-border bg-inverse bg-inverse-hover shadow px-4 py-2"
            onClick={nextStep}
            disabled={stepIndex === steps.length - 1}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};