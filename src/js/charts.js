'use strict';
import 'chartist/dist/index.css';
import { LineChart } from 'chartist';
import { BarChart } from 'chartist';

const progressSelect = document.getElementById('progress-selectID');
const progressSelectBars = document.getElementById('progress-select-bars');
const timeSelectIDFirst = document.getElementById('time-selectID-first');
const timeSelectIDSecond = document.getElementById('time-selectID-second');
const thisWeekSeriesWaveChart = [
  [41, 51, 25, 50, 30, 50, 20],
  [53, 25, 50, 25, 55, 30, 50],
];
const lastWeekSeriesWaveChart = [
  [10, 51, 23, 50, 30, 55, 20],
  [8, 20, 50, 30, 55, 25, 50],
];
const thisWeekSeriesBarChart = [50, 20, 60, 50, 55, 60, 65];
const lastWeekSeriesBarChart = [35, 20, 55, 50, 55, 30, 65];
let labelsLineChart = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let seriesLineChart = [15, 10, 15, 8, 14, 9, 14];
const barChartOptions = {
  distributeSeries: true,
  height: 200,
};
const waveChartOptions = {
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
const lineChartOptions = {
  fullWidth: true,
  height: 200,
  low: 5,
  high: 20,
  chartPadding: {
    right: 30,
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
  new LineChart('#wave', chartData('wave'), waveChartOptions);
  new BarChart('#bars', chartData('bars'), barChartOptions).on(
    'draw',
    function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      }
    }
  );
  new LineChart('#line-chart', chartData('line'), lineChartOptions);
});

function redrawChartContainer(elemId) {
  const parent = document.getElementById(elemId).closest('.progress__box');
  document.getElementById(elemId).remove();
  const elem = document.createElement('div');
  elem.id = elemId;
  elem.className = 'ct-chart';
  parent.append(elem);
}

function chartData(chartType) {
  let data = {};
  let seriesWaveChart = [];
  let seriesBarsChart = [];
  let labels = [];
  let newLabelsLineChart = [];
  let newSeriesLineChart = [];
  if (progressSelect.value === 'this week') {
    labels = getThisWeekLabelsData();
    seriesWaveChart = thisWeekSeriesWaveChart;
  } else {
    labels = getLastWeekLabelsData();
    seriesWaveChart = lastWeekSeriesWaveChart;
  }
  if (progressSelectBars.value === 'this week') {
    labels = getThisWeekLabelsData();
    seriesBarsChart = thisWeekSeriesBarChart;
  } else {
    labels = getLastWeekLabelsData();
    seriesBarsChart = lastWeekSeriesBarChart;
  }
  let newLabels;
  let newSeriesBarsChart;
  switch (timeSelectIDFirst.value) {
    case '7 days':
      newSeriesBarsChart = seriesBarsChart;
      newLabels = labels;
      break;
    case '6 days':
      newSeriesBarsChart = seriesBarsChart.slice(1, 7);
      newLabels = labels.slice(1, 7);
      break;
    case '5 days':
      newSeriesBarsChart = seriesBarsChart.slice(2, 7);
      newLabels = labels.slice(2, 7);
      break;
    default:
      newSeriesBarsChart = seriesBarsChart;
      newLabels = labels;
  }
  switch (timeSelectIDSecond.value) {
    case '7 days':
      newSeriesLineChart = seriesLineChart;
      newLabelsLineChart = labelsLineChart;
      break;
    case '6 days':
      newSeriesLineChart = seriesLineChart.slice(1, 7);
      newLabelsLineChart = labelsLineChart.slice(1, 7);
      break;
    case '5 days':
      newSeriesLineChart = seriesLineChart.slice(2, 7);
      newLabelsLineChart = labelsLineChart.slice(2, 7);
      break;
    default:
      newSeriesLineChart = seriesLineChart;
      newLabelsLineChart = labelsLineChart;
  }

  switch (chartType) {
    case 'wave':
      return (data = {
        series: seriesWaveChart,
        labels: labels,
      });
      break;
    case 'bars':
      return (data = {
        series: newSeriesBarsChart,
        labels: newLabels,
      });
      break;
    case 'line':
      return (data = {
        series: [newSeriesLineChart],
        labels: newLabelsLineChart,
      });
      break;
  }
}

progressSelect.addEventListener('change', () => {
  chartData('wave');
  redrawChartContainer('wave');
  new LineChart('#wave', chartData('wave'), waveChartOptions);
});

progressSelectBars.addEventListener('change', () => {
  chartData('bars');
  redrawChartContainer('bars');
  new BarChart('#bars', chartData('bars'), barChartOptions).on(
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

timeSelectIDFirst.addEventListener('change', () => {
  chartData('bars');
  redrawChartContainer('bars');
  new BarChart('#bars', chartData('bars'), barChartOptions).on(
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

timeSelectIDSecond.addEventListener('change', () => {
  chartData('line');
  redrawChartContainer('line-chart');
  new LineChart('#line-chart', chartData('line'), lineChartOptions);
});
