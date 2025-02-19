import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import '../../Root.css';
import { setColorScheme } from '../../Root';

function App() {
  setColorScheme();

  const steps = [
    { video: "/videos/jdk/!jdk.mkv", subtitle: "請點<a href='https://learn.microsoft.com/en-us/java/openjdk/download' target='_blank'>這裡</a>下載" },
    { video: "/videos/jdk/!open_instiller.mkv", subtitle: "請打開剛剛下載的檔案" },
    { video: "/videos/jdk/1.mkv", subtitle: "請點擊右下角的<u>Next</u>" },
    { video: "/videos/jdk/2.mkv", subtitle: "請詳細閱讀並接受使用者條款後於左下方方框打勾，並點擊右下角的<u>Next</u>" },
    { video: "/videos/jdk/3.mkv", subtitle: "請點擊右下角的<u>Next</u>" },
    { video: "/videos/jdk/4.mkv", subtitle: "請按照影片操作，操作完成後，點擊右下角的<u>Next</u>" },
    { video: "/videos/jdk/5.mkv", subtitle: "請點擊右下角的<u>Next</u>，安裝完成後請按<u>Finish</u>關閉安裝程式" },
    { video: "/videos/jdk/jdk_check/win+r.mp4", subtitle: "請同時按下鍵盤上的Windows按鍵以及R鍵" },
    { video: "/videos/jdk/jdk_check/win+r_cmd.mp4", subtitle: "請輸入cmd於彈出的輸入框" },
    { video: "/videos/jdk/jdk_check/win+r_enter.mp4", subtitle: "請按下Enter鍵" },
    { video: "/videos/jdk/jdk_check/cmd_java-version.mp4", subtitle: "請輸入<u>java -version</u>於彈出的視窗" },
    { video: "/videos/jdk/jdk_check/cmd_enter.mp4", subtitle: "請按下Enter鍵，若出現任何錯誤，請依照前面的步驟重新安裝" },
    { video: "/videos/idea+fabric/!!!!github_download.mkv", subtitle: "請點<a href='https://github.com/FabricMC/fabric-example-mod' target='_blank'>這裡</a>下載" },
    { video: "/videos/idea+fabric/!!!fabric_rezip.mkv", subtitle: "請找到剛才下載的檔案，並解壓縮" },
    { video: "/videos/idea+fabric/!!idea_download.mkv", subtitle: "請點<a href='https://www.jetbrains.com/idea/download/?section=windows' target='_blank'>這裡</a>下載" },
    { video: "/videos/idea+fabric/!open_idea_installer.mkv", subtitle: "請打開剛剛下載的檔案" },
    { video: "/videos/idea+fabric/1.mkv", subtitle: "請點擊右下角的<u>Next</u>" },
    { video: "/videos/idea+fabric/2.mkv", subtitle: "請點擊右下角的<u>Next</u>" },
    { video: "/videos/idea+fabric/3.mkv", subtitle: "請按照影片操作，操作完成後，點擊右下角的<u>Next</u>" },
    { video: "/videos/idea+fabric/4.mp4", subtitle: "請點擊右下角的<u>Install</u>" },
    { video: "/videos/idea+fabric/5.mkv", subtitle: "請做好重新啟動的準備，並按照影片操作，操作完成後，點擊右下角的<u>Finish</u>，您的電腦將重新啟動" },
    { video: "/videos/idea+fabric/z_move.mp4", subtitle: "請打開剛剛解壓縮好的資料夾，把內層第一個資料夾拖到外層" },
    { video: "/videos/idea/1.mkv", subtitle: "請打開IDEA" },
    { video: "/videos/idea/2.mkv", subtitle: "請詳細閱讀並接受使用者條款後於左下方方框打勾，並點擊右下角的<u>Continue</u>" },
    { video: "/videos/idea/3.mkv", subtitle: "請點擊右下角的<u>Don't Send</u>" },
    { video: "/videos/idea/3-.mkv", subtitle: "請點擊右下角的<u>X</u>" },
    { video: "/videos/idea/4.mp4", subtitle: "請點擊右上角的<u>□</u>" },
    { video: "/videos/idea/5.mp4", subtitle: "請點擊左方的<u>Plugins</u>" },
    { video: "/videos/idea/6.mp4", subtitle: "請在左方的搜尋框內輸入<u>minecraft</u>" },
    { video: "/videos/idea/7.mp4", subtitle: "請點擊中間的<u>Install</u>" },
    { video: "/videos/idea/8.mp4", subtitle: "請點擊彈出視窗的<u>Accept</u>" },
    { video: "/videos/idea/9.mp4", subtitle: "請刪除左方的搜尋框內的文字，並輸入<u>trans</u>" },
    { video: "/videos/idea/10.mp4", subtitle: "請點擊中間偏右的<u>Install</u>" },
    { video: "/videos/idea/11.mp4", subtitle: "請點擊上方的<u>Installed</u>標籤" },
    { video: "/videos/idea/12.mkv", subtitle: "請刪除左方的搜尋框內的文字" },
    { video: "/videos/idea/13.mp4", subtitle: "等待兩個插件都安裝好，都出現<u>Restart IDE</u>時，請點擊其中一個<u>Restart IDE</u>" },
    { video: "/videos/idea/14.mkv", subtitle: "請點擊彈出視窗的<u>Restart</u>" },
    { video: "/videos/idea/15.mp4", subtitle: "重新打開後，請確保兩個插件都安裝完成" },
    // { video: "/videos/1.mkv", subtitle: "" },
    // { video: "/videos/2.mkv", subtitle: "" },
  ];

  const [stepIndex, setStepIndex] = useState(() => {
    return parseInt(localStorage.getItem("stepIndex") || "0", 10);
  });

  useEffect(() => {
    localStorage.setItem("stepIndex", stepIndex.toString());
  }, [stepIndex]);

  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  };

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

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, stepIndex]);

  return (
    <div className="d-flex vh-100 flex-column align-items-center justify-content-center">
      {steps[stepIndex].video ? (
        <video
          ref={videoRef}
          key={steps[stepIndex].video}
          autoPlay={isPlaying}
          onEnded={handleVideoEnd}
          muted>
          <source src={steps[stepIndex].video} type="video/mp4" />
        </video>
      ) : (
        <FaCheckCircle size={100} className="mb-4 text-success" />
      )}
      <div className='fixed-bottom d-flex flex-column align-items-center mb-4'>
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
