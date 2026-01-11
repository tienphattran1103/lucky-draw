import { useEffect, useState, useRef } from "react";

import TextLoop from "react-text-loop";
import MovingComponent from "react-moving-text";
import { list as data, list } from "../../data/list";
import "./index.css";
import Stack from "@mui/material/Stack";
import CustomDialog from "../CustomDialog";
import Confetti from "react-dom-confetti";
import Test from "../Audio/Au.mp3";

const defaultList1 = [0, 1, 2, 3, 4, 9];
const defaultList2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const defaultList = [
  defaultList1,
  ...Array.from({ length: 5 }, (_) => defaultList2),
];
localStorage.setItem("list", JSON.stringify(data));
function LuckyDraw(props) {
  const { prizeType, currentStep } = props;
  const [stop, setStop] = useState(false);
  const [stopObj, setStopObj] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [currentNumber, setCurrentNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState([0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState({});
  const [hiddenWinner, setHiddenWinner] = useState({});
  const [interval, setInterval] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const timeout = 3100;
  const [data, setData] = useState(JSON.parse(localStorage.getItem("list")));
  const [audio, setAudio] = useState(new Audio(Test));
  const [winAudio, setWinAudio] = useState(
    new Audio("https://luckydraw.live/audio/v1/sm-spin.mp3")
  );
  const winnerTimeoutRef = useRef(null);
  useEffect(() => {
    setWinnerNumber([0, 0, 0, 0, 0, 0]);
  }, [prizeType]);

  useEffect(() => {
    const slotsElements = document.querySelectorAll(".box");
    if (slotsElements.length > 0) {
      slotsElements.forEach((el) => {
        el.classList.add("boxStartFlip");
        setTimeout(() => {
          el.classList.remove("boxStartFlip");
        }, 2500);
      });
    }
  }, [prizeType]);

  useEffect(() => {
    const winnerElements = document.querySelector("#winner");
    if (winnerElements) {
      winnerElements.classList.add("labelWinner");
      setTimeout(() => {
        winnerElements.classList.remove("labelWinner");
      }, 1500);
    }
  }, [JSON.stringify(winner)]);

  const priceImageSelections = {
    1: "https://luckydraw.live/images/temp/bronze-prize.svg",
    2: "https://luckydraw.live/images/temp/silver-prize.svg",
    3: "https://luckydraw.live/images/temp/gold-prize.svg",
    4: "https://luckydraw.live/images/temp/diamond-prize.svg",
  };

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("list")));
  }, [JSON.parse(localStorage.getItem("list")).length]);

  useEffect(() => {
    setHiddenWinner({});
    setWinner({});
    // Clear any pending timeout when step changes
    if (winnerTimeoutRef.current) {
      clearTimeout(winnerTimeoutRef.current);
      winnerTimeoutRef.current = null;
    }
  }, [currentStep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (winnerTimeoutRef.current) {
        clearTimeout(winnerTimeoutRef.current);
      }
    };
  }, []);

  console.log({
    stopObj,
    currentNumber,
  });

  const customer = [
    "900011",
    "900012",
    "900013",
    "900014",
    "900015",
    "900016",
    "900017",
    "900018",
    "900019",
    "900020",
    "900021",
    "900022",
    "900023",
    "900024",
    "900025",
    "900026",
    "900027",
    "900028",
    "900029",
    "900030",
  ];

  const getWinnerInfo = () => {
    console.log('winner', winner)
    if (winner) {
      if (winner.Type) {
        return winner.Type === "SVTT"
          ? "Thực tập sinh - " + winner.Name
          : winner.id + " - " + winner.Name;
      } else {
        return winner.Name;
      }
    } else {
      return "";
    }
  };

  const winnerInfo = getWinnerInfo();

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
        <div
          style={{
            fontSize:
              customer.includes(winner.id) &&
              !["900011", "900012"].includes(winner.id)
                ? "40px"
                : "60px",
            letterSpacing: "2px",
            padding: "0 20px",
            stroke: "#f8fafc",
            strokeWidth: 2,
            color: "#070e41",
            fontWeight: "bold",
            marginTop: "1rem",
            display: "block",
            minWidth: "100px",
            height: "150px",
            textAlign: customer.includes(winner.id) ? "center" : "left",
          }}
          id="winner"
        >
          {/* {`${winner?.Name ? `${winner?.id} - ${winner?.Name}` : ""}`} */}
          {customer.includes(winner.id) ? (
            winnerInfo.includes("-") ? (
              winner.id === "900028" ? (
                winnerInfo
              ) : (
                <>
                  {winnerInfo.split("-").map((winner) => (
                    <div>{winner}</div>
                  ))}
                </>
              )
            ) : (
              winnerInfo
            )
          ) : (
            winnerInfo
          )}
        </div>
      </div>
      <div className="flex pb-10">
        <Confetti active={isOpen} />

        <div className="w-full ">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              background: "#2A254F",
              padding: "0 16px",
              boxShadow: "0 0 0 11px #393264, 0 0 0 14px #f5db79",
              borderRadius: "10px",
            }}
          >
            {defaultList.map((l, i) => {
              if (stopObj[i]) {
                return (
                  <MovingComponent
                    type={"slideInFromBottom"}
                    duration={100 + i * 500 + "ms"}
                    delay={"0ms"}
                    timing="linear"
                    fillMode="none"
                    iteration={1}
                    className="text-center"
                    presences="object"
                  >
                    <div className="box text-white">{winnerNumber[i]}</div>
                  </MovingComponent>
                );
              }
              return (
                <TextLoop
                  mask={true}
                  interval={interval}
                  delay={0}
                  springConfig={{ stiffness: 180, damping: 8 }}
                >
                  {l.map((l) => (
                    <div className={`box text-white ${spinning && "boxBlur"}`}>
                      {l}
                    </div>
                  ))}
                </TextLoop>
              );
            })}
          </Stack>
        </div>

        {/* {stop && (
          <>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                background: "#2A254F",
                padding: "0 16px",
                boxShadow: "0 0 0 11px #393264, 0 0 0 14px #f5db79",
                borderRadius: "10px",
                overflow: "hidden",
                height: "16rem",
              }}
            >
              {winnerNumber.map((w, i) => (
                <MovingComponent
                  type={"slideInFromBottom"}
                  duration={100 + i * 500 + "ms"}
                  delay={"0ms"}
                  timing="linear"
                  fillMode="none"
                  iteration={1}
                  className="text-center"
                  presences="object"
                >
                  <div className="box text-white">{winnerNumber[i]}</div>
                </MovingComponent>
              ))}
            </Stack>
          </>
        )} */}

        <Confetti active={isOpen} />
      </div>
      <div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {!spinning ? (
            <button
              onClick={() => {
                // Clear any pending winner timeout from previous spin
                if (winnerTimeoutRef.current) {
                  clearTimeout(winnerTimeoutRef.current);
                  winnerTimeoutRef.current = null;
                }
                // Always clear winner immediately when starting new spin
                setWinner({});
                setStop(false);
                setStopObj({
                  0: false,
                  1: false,
                  2: false,
                  3: false,
                  4: false,
                  5: false,
                });
                setSpinning(true);
                audio.play();
                audio.loop = true;
                // playAudio = setInterval(() => audio.play(), 1000);
                setInterval(100);
                if (currentNumber > 5) {
                  setCurrentNumber(0);
                }
              }}
              style={{
                // color: "rgb(106, 76, 8)",
                // boxShadow: "rgb(254, 242, 105) 0px -5px inset",
                // background:
                //   "url(https://luckydraw.live/images/btn-yellow-bg.jpg)",
                // display: "inline-block",
                // verticalAlign: "middle",
                // textAlign: "center",
                // cursor: "pointer",
                // fontSize: "26px",
                // fontWeight: "700",
                // textTransform: "uppercase",
                // borderRadius: "5px",
                // border: "none",
                // minWidth: "288px",
                // padding: "0px",
                // transition: "all 0.3s ease 0s",
                // height: "62px",
                // lineHeight: "62px",
                // appearance: "none",
                // outline: "none",
                color: "rgb(106, 76, 8)",
                boxShadow: "rgb(254, 242, 105) 0px -5px inset",
                background:
                  "url(https://luckydraw.live/images/btn-yellow-bg.jpg)",
                display: "inline-block",
                verticalAlign: "middle",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "26px",
                fontWeight: "700",
                textTransform: "uppercase",
                borderRadius: "5px",
                border: "none",
                minWidth: "288px",
                padding: "0px",
                transition: "all 0.3s ease 0s",
                height: "62px",
                lineHeight: "62px",
                appearance: "none",
                outline: "none",
              }}
            >
              Quay số
            </button>
          ) : (
            <button
              onClick={() => {
                const winner = data[Math.floor(Math.random() * data.length)];
                const winnerNumber = winner.id.split("");
                if (currentStep === 4) {
                  console.log('current step 4: ', currentStep)

                  setStopObj({
                    ...stopObj,
                    [currentNumber]: true,
                  });

                  if (currentNumber === 0) {
                    // first spin
                    setHiddenWinner(winner);
                    setWinnerNumber(winnerNumber);
                    const filterData = data.filter((e) => e.id !== winner.id);
                    setData(filterData);
                    localStorage.setItem("list", JSON.stringify(filterData));
                    let prevList =
                      JSON.parse(localStorage.getItem(prizeType)) || [];
                    prevList.push(winner);
                    localStorage.setItem(prizeType, JSON.stringify(prevList));
                  }
                  if (currentNumber === 5) {
                    // last spin
                    setSpinning(false);
                    // Clear any existing timeout
                    if (winnerTimeoutRef.current) {
                      clearTimeout(winnerTimeoutRef.current);
                    }
                    winnerTimeoutRef.current = setTimeout(() => {
                      setWinner(hiddenWinner);
                      winnerTimeoutRef.current = null;
                    }, 3200);
                    setTimeout(() => {
                      // setIsOpen(true);
                      winAudio.play();
                    }, timeout);
                    audio.pause();
                    setAudio(audio);
                  }
                  setCurrentNumber((prev) => prev + 1);
                } else {
                  console.log('current step', currentStep)
                  setStopObj({
                    0: true,
                    1: true,
                    2: true,
                    3: true,
                    4: true,
                    5: true,
                  });
                  // Clear any existing timeout
                  if (winnerTimeoutRef.current) {
                    clearTimeout(winnerTimeoutRef.current);
                  }
                  winnerTimeoutRef.current = setTimeout(() => {
                    setWinner(winner);
                    winnerTimeoutRef.current = null;
                  }, 3200);
                  setSpinning(false);
                  setWinnerNumber(winnerNumber);
                  setData(data.filter((e) => e.id !== winner.id));
                  let prevList =
                    JSON.parse(localStorage.getItem(prizeType)) || [];
                  prevList.push(winner);
                  localStorage.setItem(prizeType, JSON.stringify(prevList));
                  setTimeout(() => {
                    // setIsOpen(true);
                    winAudio.play();
                  }, timeout);
                  audio.pause();
                  setAudio(audio);
                }
                //   setWinnerNumber(winnerNumber);
                setStop(true);

                // setTimeout(() => {
                //   setWinner(winner);
                // }, 3200);
                // setData(data.filter((e) => e.id !== winner.id));
                // let prevList =
                //   JSON.parse(localStorage.getItem(prizeType)) || [];
                // prevList.push(winner);
                // localStorage.setItem(prizeType, JSON.stringify(prevList));
                // setTimeout(() => {
                //   // setIsOpen(true);
                //   winAudio.play();
                // }, timeout);
                // audio.pause();
                // setAudio(audio);
              }}
              style={{
                color: "rgb(106, 76, 8)",
                boxShadow: "rgb(254, 242, 105) 0px -5px inset",
                background:
                  "url(https://luckydraw.live/images/btn-yellow-bg.jpg)",
                display: "inline-block",
                verticalAlign: "middle",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "26px",
                fontWeight: "700",
                textTransform: "uppercase",
                borderRadius: "5px",
                border: "none",
                minWidth: "288px",
                padding: "0px",
                transition: "all 0.3s ease 0s",
                height: "62px",
                lineHeight: "62px",
                appearance: "none",
                outline: "none",
              }}
            >
              Chốt
            </button>
          )}
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

export default LuckyDraw;
