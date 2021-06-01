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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Typography.Title level={3} style={{ marginRight: "1rem" }}>
          {title}
        </Typography.Title>
        <Radio.Group
          onChange={changeMode}
          value={mode}
          options={options}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div style={{ width: "100%", height: "300px", marginBottom: "50px" }}>
        <AutoSizer>
          {({ height, width }) => (
            <>
              <XYPlot
                animation
                height={height}
                width={width}
                margin={{ left: 100, right: 100, top: 10, bottom: 40 }}
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
              >
                {mode === "daily" ? (
                  <LineSeries data={renderData.daily} onNearestXY={showHint} />
                ) : (
                  <LineSeries
                    data={renderData.cumulative}
                    onNearestXY={showHint}
                  />
                )}
                <Borders style={{ all: { fill: "#fff" } }}>
                  <Slider range defaultValue={[0, 100]} />
                </Borders>
                <YAxis />
                <XAxis
                  hideLine
                  tickFormat={(t) => {
                    if (t.getDate() === 1) {
                      return `${monthToString(
                        t.getMonth()
                      )} ${t.getFullYear()}`;
                    } else {
                      return;
                    }
                  }}
                />
                {hintValue && (
                  <Hint value={hintValue} style={{ fontSize: "0.5rem" }}>
                    <Typography.Paragraph>
                      {`Date: ${formatDate(hintValue.x)}`}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      {`Number: ${hintValue.y}`}
                    </Typography.Paragraph>
                  </Hint>
                )}
                <Highlight
                  drag={false}
                  enableY={false}
                  onBrushEnd={onBrushHandler}
                />
              </XYPlot>
              <div
                style={{
                  width: width,
                  display: "flex",
                }}
              >
                <Button
                  onClick={resetPlot}
                  style={{ display: "inline", margin: "0px 15px" }}
                >
                  Reset
                </Button>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
                    paddingRight: "100px",
                  }}
                >
                  <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 100]}
                    value={sliderValue}
                    onChange={onSliderChange}
                  />
                </div>
              </div>
            </>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default LineChart;
