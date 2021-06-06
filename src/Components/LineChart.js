import React, { useState } from "react";
import { Typography, Radio, Slider, Button } from "antd";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  Hint,
  Highlight,
  Borders,
} from "react-vis";
import { monthToString, formatDate } from "../Utils/";
import "react-virtualized/styles.css";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { ContentContainer, FlexSpaceBetween } from "../Styles";
import styled from "styled-components";

const { Text } = Typography;

const LineChart = ({ data, title }) => {
  const [sourceData] = useState(data);
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [renderData, setRenderData] = useState(sourceData);
  const [mode, setMode] = useState("daily");
  const [hintValue, setHintValue] = useState(null);
  const [xDomain, setXDomain] = useState(null);
  const changeMode = (e) => {
    setMode(e.target.value);
  };
  const options = [
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Cumulative",
      value: "cumulative",
    },
  ];

  const showHint = (value) => {
    setHintValue(value);
  };

  const removeHint = () => {
    setHintValue(null);
  };

  const onBrushHandler = (area) => {
    if (area) {
      area.left.setHours(8, 0, 0, 0);
      area.right.setHours(8, 0, 0, 0);
      const dates = sourceData.daily.map((d) => d.x);
      const startIndex = dates.findIndex(
        (x) => x.getTime() === area.left.getTime()
      );
      const endIndex = dates.findIndex(
        (x) => x.getTime() === area.right.getTime()
      );
      const sliderLeftValue = Math.floor((startIndex / dates.length) * 100);
      const sliderRightValue = Math.floor((endIndex / dates.length) * 100);
      const newRenderData = { ...sourceData };
      newRenderData.daily = [...newRenderData.daily].splice(
        startIndex,
        endIndex
      );
      newRenderData.cumulative = [...newRenderData.cumulative].splice(
        startIndex,
        endIndex
      );
      setSliderValue([sliderLeftValue, sliderRightValue]);
      setRenderData(newRenderData);
      setXDomain(area);
    }
  };

  const onSliderChange = (value) => {
    const startIndex = Math.floor((value[0] / 100) * sourceData[mode].length);
    const endIndex = Math.ceil((value[1] / 100) * sourceData[mode].length);
    const newRenderData = { ...sourceData };
    newRenderData.daily = [...newRenderData.daily].splice(startIndex, endIndex);
    newRenderData.cumulative = [...newRenderData.cumulative].splice(
      startIndex,
      endIndex
    );
    const leftDomain = newRenderData.daily[0].x;
    const rightDomain = newRenderData.daily[newRenderData.daily.length - 1].x;
    const newXDomain = {
      left: leftDomain,
      right: rightDomain,
    };
    setXDomain(newXDomain);
    setSliderValue(value);
    setRenderData(newRenderData);
  };

  const resetPlot = () => {
    setSliderValue([0, 100]);
    setXDomain(null);
    setRenderData(sourceData);
  };

  const tipFormatter = (value) => {
    let index = Math.floor((value / 100) * sourceData[mode].length);
    if (index === sourceData[mode].length) index -= 1;
    const currentDate = sourceData[mode][index].x;
    return <span>{formatDate(currentDate)}</span>;
  };

  return (
    <ContentContainer marginTop={"4rem"}>
      <FlexSpaceBetween>
        <Typography.Title level={4} style={{ marginRight: "1rem" }}>
          {title}
        </Typography.Title>
        <Radio.Group
          onChange={changeMode}
          value={mode}
          options={options}
          optionType="button"
          buttonStyle="solid"
        />
      </FlexSpaceBetween>
      <ChartContainer>
        <AutoSizer>
          {({ height, width }) => (
            <>
              <XYPlot
                animation
                height={height}
                width={width}
                margin={{ left: 100, right: 100, top: 10, bottom: 50 }}
                onMouseLeave={removeHint}
                xType="time"
                xDomain={
                  xDomain
                    ? [xDomain.left, xDomain.right]
                    : [new Date(sourceData[mode][0].x), Date.now()]
                }
                yDomain={[
                  0,
                  1.1 * Math.max(...renderData[mode].map((d) => d.y)),
                ]}
                style={{ backgroundColor: "#fff" }}
              >
                {mode === "daily" ? (
                  <LineSeries data={renderData.daily} onNearestX={showHint} />
                ) : (
                  <LineSeries
                    data={renderData.cumulative}
                    onNearestX={showHint}
                  />
                )}
                <Borders style={{ all: { fill: "#fff" } }} />
                <YAxis />
                <XAxis
                  hideLine
                  tickFormat={(t) => {
                    if (sliderValue[1] - sliderValue[0] < 50) {
                      return t.toLocaleString("en-GB").split(",")[0];
                    } else {
                      if (t.getDate() === 1) {
                        return `${monthToString(
                          t.getMonth()
                        )} ${t.getFullYear()}`;
                      } else {
                        return;
                      }
                    }
                  }}
                  tickLabelAngle={
                    sliderValue[1] - sliderValue[0] < 50 ? -30 : 0
                  }
                />
                {hintValue && (
                  <Hint value={hintValue} style={hintStyle}>
                    <HintText>{`Date: ${formatDate(hintValue.x)}`}</HintText>
                    <HintText>{`Number: ${hintValue.y}`}</HintText>
                  </Hint>
                )}
                <Highlight
                  drag={false}
                  enableY={false}
                  onBrushEnd={onBrushHandler}
                />
              </XYPlot>
              <ControlContainer width={width}>
                <ResetButton onClick={resetPlot}>Reset</ResetButton>
                <SliderContainer>
                  <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 100]}
                    value={sliderValue}
                    onChange={onSliderChange}
                    tipFormatter={tipFormatter}
                  />
                </SliderContainer>
              </ControlContainer>
            </>
          )}
        </AutoSizer>
      </ChartContainer>
    </ContentContainer>
  );
};

export default LineChart;

const hintStyle = {
  minWidth: "30px",
  minHeight: "32px",
  fontSize: "0.8rem",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  padding: "6px 8px",
  borderRadius: "2px",
  boxShadow:
    "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
};

const ChartContainer = styled.div`
  width: 100%;
  height: 350px;
`;

const ControlContainer = styled.div`
  width: ${(props) => `${props.width}px`};
  margin-top: 1rem;
  display: flex;
`;

const ResetButton = styled(Button)`
  display: inline;
  margin: 0px 15px;
`;

const SliderContainer = styled.div`
  display: inline-block;
  width: 100%;
  padding-right: 100px;
`;

const HintText = styled(Text)`
  display: block;
  color: #fff;
`;
