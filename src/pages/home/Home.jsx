import { useEffect, useLayoutEffect, useState } from "react";
import SiteWrapper from "../../SiteWrapper";
import { useTheme } from "@mui/material/styles";
import { list as data } from "../../data/list";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stepper, Grid } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./Home.css";
import Stack from "@mui/material/Stack";
import LuckyDraw from "../../components/LuckyDraw";
import { steps } from "../../components/Step";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Carousel from "react-bootstrap/Carousel";
import kkPrize from "../../img/chuot_logitech.png";
import Prize3 from "../../img/camera_ai.png";
import Prize2 from "../../img/may_anh_instax.png";
import Prize1 from "../../img/robot_hut_bui_xiaomi.png";
import PrizeSpecial from "../../img/may_loc_khong_khi_dyson.webp";
import CustomDialog from "../../components/CustomDialog";
import CustomizedDialogs from "../../components/WinnerList/Dialog";
import BasicTabs from "../../components/WinnerList";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openResult, setOpenResult] = useState(false);
  const [openPrize, setOpenPrize] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const maxSteps = steps.length;
  const theme = useTheme();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    localStorage.setItem("list", JSON.stringify(data));
    for (let i = 0; i < 5; i++) {
      localStorage.removeItem(i);
    }
  };

  return (
    <SiteWrapper>
      <div className="text-center text-[#FFD212] font-bold text-6xl pb-4">
        Year End Party 2025
      </div>

      {openPrize ? (
        <>
          <Carousel
            activeIndex={index}
            interval={null}
            prevLabel={""}
            nextLabel={""}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl stroke-1 stroke-slate-200 font-bold text-white dark:text-white">
                    Giải khuyến khích
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-white dark:text-white mt-[20px]">
                    Chuột và dây sạc high-tech
                  </h5>
                </div>
                <div>
                  <img className="w-[40rem]"  src={kkPrize} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-white dark:text-white">
                    Giải ba
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-white dark:text-white mt-[20px]">
                    Camera AI
                  </h5>
                </div>
                <div>
                  <img className="w-[36rem] mt-[40px]"  src={Prize3} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item className='mt-[40px]'>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-white dark:text-white">
                    Giải nhì
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-white dark:text-white mt-[20px]">
                    Máy ảnh instax in liền
                  </h5>
                </div>
                <div>
                  <img className="w-[50rem]"  src={Prize2} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-white dark:text-white">
                    Giải nhất
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-white dark:text-white mt-[20px]">
                    Robot hút bụi lau nhà Xiaomi
                  </h5>
                </div>
                <div>
                  <img className="w-[40rem]"  src={Prize1} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-white dark:text-white">
                    Giải đặc biệt
                  </span>
                  <h5 class="text-3xl stroke-slate-700 font-semibold tracking-tight text-white dark:text-white mt-[20px]">
                    Máy lọc không khí Dyson
                  </h5>
                </div>
                <div>
                  <img
                    className="w-[40rem]" 
                    src={PrizeSpecial}
                    alt="product image"
                  />
                </div>
              </Stack>
            </Carousel.Item>
          </Carousel>
        </>
      ) : (
        <Box sx={{ width: "100%", flexGrow: 1 }}>
          <Box sx={{ width: "100%", p: 2 }}>
            <LuckyDraw
              prizeType={steps[activeStep].id}
              currentStep={activeStep}
            />
          </Box>
          <Stepper
            // variant="text"
            steps={maxSteps}
            position="static"
            sx={{
              border: "3px solid #f5db79",
              background: "#393264",
              borderRadius: "0",
              fontSize: "20px",
              letterSpacing: "1px",
              color: "#ffda56",
              textTransform: "uppercase",
              height: "48px",
              lineHeight: "42px",
              width: "30%",
              margin: "0 auto",
            }}
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  outline: "none!important",
                  border: "none!important",
                }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  outline: "none!important",
                  border: "none!important",
                }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          >
            <div
              style={{
                borderRadius: "0",
                fontSize: "20px",
                letterSpacing: "1px",
                color: "#ffda56",
                textTransform: "uppercase",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  margin: "0 8px",
                  padding: "0 12px",
                  fontSize: "18px",
                  lineHeight: "42px",
                  display: "inline-flex",
                  height: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                <ChevronLeftIcon
                  htmlColor={`${activeStep === 0 ? "gray" : "#ffda56"}`}
                  fontSize="large"
                />
              </button>
              <Typography variant="body1" color="inherit">
                {steps[activeStep].label}
              </Typography>
              <button
                style={{
                  margin: "0 8px",
                  padding: "0 12px",
                  fontSize: "18px",
                  lineHeight: "42px",
                  display: "inline-flex",
                  height: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                }}
                disabled={activeStep === maxSteps - 1}
                onClick={handleNext}
              >
                <ChevronRightIcon
                  htmlColor={`${
                    activeStep === maxSteps - 1 ? "gray" : "#ffda56"
                  }`}
                  fontSize="large"
                />
              </button>
            </div>
          </Stepper>
        </Box>
      )}
      <div className="py-10">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",

              "&:hover": {
                color: "#fbce3d",
              },
            }}
            onClick={() => setOpenResult(true)}
          >
            <FilterListIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>Kết quả</span>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "& :hover": {
                color: "#fbce3d",
              },
            }}
            onClick={() => setOpenPrize(!openPrize)}
          >
            <CardGiftcardIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>
              {openPrize ? "Quay số" : "Thông tin Giải"}
            </span>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "& :hover": {
                color: "#fbce3d",
              },
            }}
            onClick={handleReset}
          >
            <RestartAltIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>Reset</span>
          </Box>
          <CustomizedDialogs
          isOpen={openResult}
          handleClose={() => setOpenResult(false)}
          content={<BasicTabs type="result" />}
          title={<div>Kết quả</div>}
        />
        </Stack>
      </div>
    </SiteWrapper>
  );
}

export default Home;
