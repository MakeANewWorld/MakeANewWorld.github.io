import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import '../../Root.css';
import { preload } from '../../Root';
import { Video } from '../../weights/Video';
import { getItem, setItem } from '../user/User';

function App() {
  preload();

  const steps = [
    { video: "/videos/download.mkv", subtitle: "我們需要先下載一個檔案，請點<a href='/install.bat' download>這裡</a>下載。" },
    { video: "/videos/open_file.mkv", subtitle: "請打開剛剛下載的檔案，並點選<u>是</u>。" },
    { video: "/videos/accept.mkv", subtitle: "請等待腳本<b>執行完成</b>，出現此畫面後請點選<u>Accept</u>。" },
    { video: "/videos/pre_setting.mkv", subtitle: "請按照影片操作。" },
    { video: "/videos/trust_project.mkv", subtitle: "請點選<u>Trust Project</u>。" },
    { video: "/videos/cancel.mkv", subtitle: "請點選<u>Cancel</u>。" },
    { video: "/videos/exclude_folders.mkv", subtitle: "請點選<u>Exclude Folders</u>。" },
    { video: "/videos/close_pop.mkv", subtitle: "請按照影片關閉提示。" },
    { video: "/videos/close_pop_2.mkv", subtitle: "請按照影片關閉提示。" },
    { video: "/videos/gradle_setting.mkv", subtitle: "請按照影片操作。" },
    { video: "/videos/gradle_setting_ing.mkv", subtitle: "請按照影片操作。" },
    { video: "/videos/skip_ok.mkv", subtitle: "請依序點擊<u>Skip</u>、<u>OK</u>" },
    { video: "/videos/rerun.mkv", subtitle: "請點擊🔄" },
    { video: "/videos/install_process.mp4", subtitle: "安裝完整過程(10倍速)，依據網路速度可能有差異。" },
    { video: "/videos/finish.mkv", subtitle: "若出現此畫面(請務必檢查<b>右下角藍色長條跑完</b>)代表安裝成功，請點選右上角的☐放大視窗。" },
    { video: "/videos/end.mkv", subtitle: "請切換到腳本視窗並點選✖以關閉腳本。" },
    { video: "", subtitle: "所有東西都已設定，請點<a href='/play'>這裡</a>遊玩" }
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
      setItem("stepIndex", stepIndex.toString());
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      changeBar(stepIndex - 1);
      setItem("stepIndex", stepIndex.toString());
    }
  };

  return (
    <div className="d-flex vh-100 flex-column align-items-center justify-content-center">
      {steps[stepIndex].video ? (
        <Video second={2} src={steps[stepIndex].video} keey={steps[stepIndex].video} ></Video>
      ) : (
        <FaCheckCircle size={100} className="mb-4 text-success" />
      )}
      <div id="b-br" className='fixed-bottom d-flex flex-column align-items-center mb-4'>
        <h2 className="m-4 noto text p-2" dangerouslySetInnerHTML={{ __html: steps[stepIndex].subtitle }}></h2>
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
}

export default App;
