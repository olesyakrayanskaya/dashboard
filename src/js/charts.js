'use strict';
import 'chartist/dist/index.css';
import { LineChart } from 'chartist';
import { BarChart } from 'chartist';

const progressSelect = document.getElementById('progress-selectID');
const progressSelectBars = document.getElementById('progress-select-bars');
const timeSelectIDFirst = document.getElementById('time-selectID-first');
const timeSelectIDSecond = document.getElementById('time-selectID-second');
const thisWeekSeries = [
  [41, 51, 25, 50, 30, 50, 20],
  [53, 25, 50, 25, 55, 30, 50],
];
const lastWeekSeries = [
  [10, 51, 23, 50, 30, 55, 20],
  [8, 20, 50, 30, 55, 25, 50],
];
const thisWeekSeriesBarChart = [50, 20, 60, 50, 55, 60, 65];
const lastWeekSeriesBarChart = [35, 20, 55, 50, 55, 30, 65];
const barChartOptions = {
  distributeSeries: true,
  height: 200,
};
const options = {
  width: 100 + '%',
  height: 272,
  divisor: 10,
  high: 60,
  low: 0,
  showArea: true,
  showLine: false,
  showPoint: false,
  fullWidth: true,
  showLabel: false,
  showGrid: false,
  axisY: {
    ticks: [0, 10, 20, 30, 40, 50, 60],
    showLabel: true,
    labelInterpolationFnc: function (value, index) {
      return index % 2 === 0 ? value : null;
    },
  },
  axisX: {
    showGrid: false,
  },
  chartPadding: {
    right: 40,
  },
};

function getThisWeekLabelsData() {
  let waveChartLabelsDataThisWeek = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date(Date.now()).getDate() - i;
    let month = new Date(Date.now()).getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let formatDate = `${date}.${month}`;
    waveChartLabelsDataThisWeek.unshift(formatDate);
  }
  return waveChartLabelsDataThisWeek;
}

function getLastWeekLabelsData() {
  let waveChartLabelsDataLastWeek = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date(Date.now()).getDate() - 7 - i;
    let month = new Date(Date.now()).getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let formatDate = `${date}.${month}`;
    waveChartLabelsDataLastWeek.unshift(formatDate);
  }
  return waveChartLabelsDataLastWeek;
}

document.addEventListener('DOMContentLoaded', () => {
  let labelsData = getThisWeekLabelsData();
  const data = {
    labels: labelsData,
    series: thisWeekSeries,
  };
  const barChartData = {
    labels: labelsData,
    series: thisWeekSeriesBarChart,
  };
  new LineChart('#wave', data, options);
  new BarChart('#bars', barChartData, barChartOptions).on(
    'draw',
    function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      }
    }
  );
});

progressSelect.addEventListener('change', () => {
  let waveSeries = [];
  let labelsData = [];
  const waveParent = document.getElementById('wave').closest('.progress__box');
  document.getElementById('wave').remove();
  const wave = document.createElement('div');
  wave.id = 'wave';
  wave.className = 'ct-chart';
  waveParent.append(wave);
  if (progressSelect.value === 'this week') {
    labelsData = getThisWeekLabelsData();
    waveSeries = thisWeekSeries;
  } else {
    labelsData = getLastWeekLabelsData();
    waveSeries = lastWeekSeries;
  }
  const newData = {
    labels: labelsData,
    series: waveSeries,
  };
  new LineChart('#wave', newData, options);
});

progressSelectBars.addEventListener('change', () => {
  let barsSeries = [];
  let labelsData = [];
  const barsParent = document.getElementById('bars').closest('.progress__box');
  document.getElementById('bars').remove();
  const bars = document.createElement('div');
  bars.id = 'bars';
  bars.className = 'ct-chart';
  barsParent.append(bars);
  if (progressSelectBars.value === 'this week') {
    labelsData = getThisWeekLabelsData();
    barsSeries = thisWeekSeriesBarChart;
  } else {
    labelsData = getLastWeekLabelsData();
    barsSeries = lastWeekSeriesBarChart;
  }
  const newBarChartData = {
    labels: labelsData,
    series: barsSeries,
  };
  new BarChart('#bars', newBarChartData, barChartOptions).on(
    'draw',
    function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      }
    }
  );
});

new LineChart(
  '#line-chart',
  {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    series: [[15, 10, 15, 8, 14, 9, 14]],
  },
  {
    fullWidth: true,
    height: 200,
    low: 5,
    high: 20,
    chartPadding: {
      right: 30,
    },
  }
);
