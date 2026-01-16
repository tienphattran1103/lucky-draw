import { useEffect, useState } from "react";

import TextLoop from "react-text-loop";
import MovingComponent from "react-moving-text";
import { list as data } from "../../data/list";
import "./index.css";
import Stack from "@mui/material/Stack";
import CustomDialog from "../CustomDialog";
import Confetti from "react-dom-confetti";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
const defaultList1 = [0, 1, 2, 3, 4, 9];
const defaultList2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const defaultList = [
  defaultList1,
  ...Array.from({ length: 5 }, (_) => defaultList2),
];

function SpecialPrize(props) {
  const [stop1, setStop1] = useState(false);
  const [stop2, setStop2] = useState(false);
  const [stop3, setStop3] = useState(false);
  const [stop4, setStop4] = useState(false);
  const [stop5, setStop5] = useState(false);
  const [stop6, setStop6] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState([0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState({});
  const [interval1, setInterval1] = useState(0);
  const [interval2, setInterval2] = useState(0);
  const [interval3, setInterval3] = useState(0);
  const [interval4, setInterval4] = useState(0);
  const [interval5, setInterval5] = useState(0);
  const [interval6, setInterval6] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const timeout = 2000;
  const [data, setData] = useState(JSON.parse(localStorage.getItem("list")));
  const [audio, setAudio] = useState(
    new Audio("https://luckydraw.live/audio/v1/sm-roller-loop.mp3")
  );
  const [winAudio, setWinAudio] = useState(
    new Audio("https://luckydraw.live/audio/v1/sm-spin.mp3")
  );

  const { currentStep } = props;

  useEffect(() => {
    if (stop1 && stop2 && stop3 && stop4 && stop5 && stop6) {
      setIsOpen(true);
      winAudio.play();
    }
  }, [stop1, stop2, stop3, stop4, stop5, stop6]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('list')))
  }, [(JSON.parse(localStorage.getItem('list'))).length])

  const priceImageSelections = {
    1: "https://luckydraw.live/images/temp/bronze-prize.svg",
    2: "https://luckydraw.live/images/temp/silver-prize.svg",
    3: "https://luckydraw.live/images/temp/gold-prize.svg",
    4: "https://luckydraw.live/images/temp/diamond-prize.svg",
  };

  return (
    <div className="">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "442px",
            margin: "0 auto",
            display: "none",
          }}
        >
          {priceImageSelections[currentStep] && (
            <img
              src={priceImageSelections[currentStep]}
              height="120px"
              width="120px"
              alt="#"
            />
          )}
        </div>
        <span
          style={{
            fontSize: "60px",
            letterSpacing: "2px",
            // textShadow: "0 0 6px hsla(0,0%,100%,.7)",
            padding: "0 20px",
            color: "#fff",
            marginTop: "1rem",
            display: "inline-block",
            minWidth: "100px",
            height: "90px",
          }}
          id="winner"
        >
          {`${winner?.Name ? `${winner?.id} - ${winner?.Name}` : ""}`}
        </span>
      </div>

      <div className="flex">
        <Confetti active={isOpen} />

        <div className="w-full pb-10">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              background: "#393264",
              border: "3px solid #f5db79",
              padding: "0 16px",
            }}
          >
            {!stop1 && (
              <TextLoop
                mask={true}
                interval={interval1}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[0].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop1 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={"100ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[0]}</div>
              </MovingComponent>
            )}
            {!stop2 && (
              <TextLoop
                mask={true}
                interval={interval2}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[1].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop2 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={100 + 1 * 500 + "ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[1]}</div>
              </MovingComponent>
            )}
            {!stop3 && (
              <TextLoop
                mask={true}
                interval={interval3}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[1].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop3 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={100 + 1 * 500 + "ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[2]}</div>
              </MovingComponent>
            )}
            {!stop4 && (
              <TextLoop
                mask={true}
                interval={interval4}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[1].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop4 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={100 + 1 * 500 + "ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[3]}</div>
              </MovingComponent>
            )}
            {!stop5 && (
              <TextLoop
                mask={true}
                interval={interval5}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[1].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop5 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={100 + 1 * 500 + "ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[4]}</div>
              </MovingComponent>
            )}
            {!stop6 && (
              <TextLoop
                mask={true}
                interval={interval6}
                delay={0}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                {defaultList[1].map((l) => (
                  <div className="box text-white" style={{ width: 171 }}>
                    {l}
                  </div>
                ))}
              </TextLoop>
            )}
            {stop6 && (
              <MovingComponent
                type={"slideInFromTop"}
                duration={100 + 1 * 500 + "ms"}
                delay={"0ms"}
                timing="linear"
                fillMode="forwards"
                iteration={1}
                className="text-center"
              >
                <div className="box text-white">{winnerNumber[5]}</div>
              </MovingComponent>
            )}
          </Stack>
        </div>
        <Confetti active={isOpen} />
      </div>
      <div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {winnerNumber.map((w, i) => (
            <div className="btn-action">
              <button
                onClick={() => {
                  audio.loop = true;
                  audio.play();

                  if (
                    Object.keys(winner).length === 0 &&
                    winner.constructor === Object
                  ) {
                    const winner =
                      data[Math.floor(Math.random() * data.length)];
                    const winnerNumber = winner.id.split("");
                    setWinnerNumber(winnerNumber);
                    setWinner(winner);
                    setData(data.filter((e) => e.id !== winner.id));
                    let prevList = JSON.parse(localStorage.getItem(4)) || [];
                    prevList.push(winner);
                    localStorage.setItem(4, JSON.stringify(prevList));
                  }
                  switch (i) {
                    case 0: {
                      setStop1(false);
                      setInterval1(100);
                      setTimeout(() => {
                        setStop1(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    case 1: {
                      setStop2(false);
                      setInterval2(100);
                      setTimeout(() => {
                        setStop2(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    case 2: {
                      setStop3(false);
                      setInterval3(100);
                      setTimeout(() => {
                        setStop3(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    case 3: {
                      setStop4(false);
                      setInterval4(100);
                      setTimeout(() => {
                        setStop4(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    case 4: {
                      setStop5(false);
                      setInterval5(100);
                      setTimeout(() => {
                        setStop5(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    case 5: {
                      setStop6(false);
                      setInterval6(100);
                      setTimeout(() => {
                        setStop6(true);
                        audio.pause();
                        setAudio(audio);
                      }, timeout);
                      break;
                    }
                    default:
                      break;
                  }
                }}
                class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Quay số
              </button>
            </div>
          ))}
        </Stack>
      
        <CustomDialog
          isOpen={isOpen}
          value={winner}
          handleClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default SpecialPrize;
