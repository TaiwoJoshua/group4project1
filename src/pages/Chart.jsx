import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateAverage, filterByCurrMonthOrWeek, filterByRecentTime, getMaximumArrayValue, sortProperties } from '../AppManager';
import sun from '../images/sun.png';
import snow from '../images/snow.png';


export default function Chart({ readings }) {
    const [data, setData] = React.useState({ temperature: [], humidity: [], timestamp: [] });
    const [range, setRange] = React.useState(1);
    const [flip, setFlip] = React.useState(false);
    const [week, setWeek] = React.useState({ temperature: 0, humidity: 0 });
    const [month, setMonth] = React.useState({ temperature: 0, humidity: 0 });
    
    React.useEffect(() => {
        if(flip){
            setRange(24);
        }else{
            setRange(1);
        }
    }, [flip]);

    function handleFlip(event){
        const { checked } = event.target;
        setFlip(checked);
    }

    React.useEffect(() => {
        const reads = filterByRecentTime(readings, range);
        let newData = sortProperties(reads);
        let temps = newData.temperature;
        const maxTemp = getMaximumArrayValue(temps);
        let maxTempFound = false;
        temps = temps.map(temp => {
            if(temp === maxTemp && !maxTempFound){
                maxTempFound = true;
                return {
                    y: temp,
                    marker: {
                        symbol: `url(${sun})`
                    },
                    accessibility: {
                        description: 'This is the warmest point.'
                    }
                }
            }
            return temp;
        });
        let humds = newData.humidity;
        const maxHumd = getMaximumArrayValue(humds);
        let maxHumdFound = false;
        humds = humds.map(humd => {
            if(humd === maxHumd && !maxHumdFound){
                maxHumdFound = true;
                return {
                    y: humd,
                    marker: {
                        symbol: `url(${snow})`
                    },
                    accessibility: {
                        description: 'This is the warmest point.'
                    }
                }
            }
            return humd;
        });
        setData({ temperature: temps, humidity: humds, timestamp: newData.timestamp });
    }, [readings, range]);

    React.useEffect(() => {
        if(data.temperature.length !== 0){
            const monthData = filterByCurrMonthOrWeek(readings);
            const separated = sortProperties(monthData);
            const temperatureAverage = calculateAverage(separated.temperature);
            const humidityAverage = calculateAverage(separated.humidity);
            setMonth({ temperature: temperatureAverage, humidity: humidityAverage });
        }
    }, [readings, data]);

    React.useEffect(() => {
        if(data.temperature.length !== 0){
            const weekData = filterByCurrMonthOrWeek(readings, "w");
            const separated = sortProperties(weekData);
            const temperatureAverage = calculateAverage(separated.temperature);
            const humidityAverage = calculateAverage(separated.humidity);
            setWeek({ temperature: temperatureAverage, humidity: humidityAverage });
        }
    }, [readings, data]);

    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Temperature Humidity Chart'
        },
        subtitle: {
            text: 'Group 4 Project 1'
        },
        xAxis: {
            categories: data.timestamp,
            accessibility: {
                description: 'Months of the year'
            },
            labels: {
                formatter: function () {
                    return "";
                }
            }
        },
        yAxis: {
            title: {
                text: 'Readings'
            },
            labels: {
                format: '{value}'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Temperature °C',
            marker: {
                symbol: 'square'
            },
            data: data.temperature
    
        }, {
            name: 'Humidity %',
            marker: {
                symbol: 'diamond'
            },
            data: data.humidity
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                // Make the labels less space demanding on mobile
                chartOptions: {
                    xAxis: {
                        labels: {
                            formatter: function () {
                                return "";
                                // return this.value.charAt(0);
                            }
                        }
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -2
                        },
                        title: {
                            text: ''
                        }
                    }
                }
            }]
        }
    };

    return (
        <div className='chart'>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <span>
                <input type="checkbox" name="flip" id='flip' onChange={handleFlip} checked={flip} />
                <label htmlFor="flip">Flip</label>
                <span>Month Average: Temperature - {month.temperature} Humidity - {month.humidity}</span>
                <span>Week Average: Temperature - {week.temperature} Humidity - {week.humidity}</span>
            </span>
        </div>
    )
}