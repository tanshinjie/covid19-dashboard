import _ from "lodash";
import html2canvas from "html2canvas";

export function getAllCountryNameByKey(dataSource, key) {
  return _.map(dataSource, key);
}

export function keysToCamel(obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = keysToCamel(obj[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
}

function toCamel(str) {
  return _.camelCase(str);
}

const isObject = function (obj) {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function"
  );
};

export function monthToString(month) {
  return monthToStringMap["short"][month];
}

export function formatDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const monthToStringMap = {
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const exportAsPng = () => {
  var data = document.getElementById("compareTable");
  var newWidth = data.scrollWidth - data.clientWidth;

  var html = document.getElementsByTagName("HTML")[0];
  var body = document.getElementsByTagName("BODY")[0];
  var htmlWidth = html.clientWidth;
  var bodyWidth = body.clientWidth;

  if (newWidth > data.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  html2canvas(data)
    .then((canvas) => {
      var image = canvas.toDataURL("image/png", 1.0);
      return image;
    })
    .then((image) => {
      saveAs(image, "covid19-comparison-table.png");
      html.style.width = null;
      body.style.width = null;
    });
};

const saveAs = (blob, fileName) => {
  var elem = window.document.createElement("a");
  elem.href = blob;
  elem.download = fileName;
  elem.style = "display:none;";
  (document.body || document.documentElement).appendChild(elem);
  if (typeof elem.click === "function") {
    elem.click();
  } else {
    elem.target = "_blank";
    elem.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }
  URL.revokeObjectURL(elem.href);
  elem.remove();
};
