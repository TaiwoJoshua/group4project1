import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateAverage, filterByCurrMonthOrWeek, filterByRecentTime, getMaximumArrayValue, selectLatests, sortProperties } from '../AppManager';
import sun from '../images/sun.png';
import snow from '../images/snow.png';
import guage from '../images/guage.png';


export default function Chart({ readings, fetched }) {
    const [data, setData] = React.useState({ Temperature: [], Humidity: [], Pressure: [], Timestamp: [] });
    const [range, setRange] = React.useState(0);
    const [flip, setFlip] = React.useState(false);
    const [week, setWeek] = React.useState({ Temperature: 0, Humidity: 0, Pressure: 0 });
    const [month, setMonth] = React.useState({ Temperature: 0, Humidity: 0, Pressure: 0 });
    
    React.useEffect(() => {
        if(flip){
            setRange(24);
        }else{
            setRange(0);
        }
    }, [flip]);

    function handleFlip(event){
        const { checked } = event.target;
        setFlip(checked);
    }

    React.useEffect(() => {
        try {
            if(fetched){
                const reads = range === 0 ? selectLatests(readings) : filterByRecentTime(readings, range);
                let newData = sortProperties(reads);
                let temps = newData.Temperature;
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
                let humds = newData.Humidity;
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
                let Pressures = newData.Pressure;
                const maxPressure = getMaximumArrayValue(Pressures);
                let maxPressureFound = false;
                Pressures = Pressures.map(pressure => {
                    if(pressure === maxPressure && !maxPressureFound){
                        maxPressureFound = true;
                        return {
                            y: pressure,
                            marker: {
                                symbol: `url(${guage})`
                            },
                            accessibility: {
                                description: 'This is the highest point.'
                            }
                        }
                    }
                    return pressure;
                });
                setData({ Temperature: temps, Humidity: humds, Pressure: Pressures, Timestamp: newData.Timestamp });
            }
        } catch (error) {
            console.log(error);
        }
    }, [readings, range, fetched]);

    React.useEffect(() => {
        if(fetched){
            const monthData = filterByCurrMonthOrWeek(readings);
            const separated = sortProperties(monthData);
            const temperatureAverage = calculateAverage(separated.Temperature);
            const humidityAverage = calculateAverage(separated.Humidity);
            const pressureAverage = calculateAverage(separated.Pressure);
            setMonth({ Temperature: temperatureAverage, Humidity: humidityAverage, Pressure: pressureAverage });
        }
    }, [readings, data, fetched]);

    React.useEffect(() => {
        if(fetched){
            const weekData = filterByCurrMonthOrWeek(readings, "w");
            const separated = sortProperties(weekData);
            const temperatureAverage = calculateAverage(separated.Temperature);
            const humidityAverage = calculateAverage(separated.Humidity);
            const pressureAverage = calculateAverage(separated.Pressure);
            setWeek({ Temperature: temperatureAverage, Humidity: humidityAverage, Pressure: pressureAverage });
        }
    }, [readings, data, fetched]);

    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Temperature, Humidity and Pressure Chart'
        },
        subtitle: {
            text: ''
            // text: 'Group 4 Project 1'
        },
        xAxis: {
            categories: data.Timestamp,
            accessibility: {
                description: 'Timestamp'
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
        series: [
        {
            name: 'Temperature °C',
            marker: {
                symbol: 'square'
            },
            data: data.Temperature
    
        }, 
        {
            name: 'Humidity %',
            marker: {
                symbol: 'diamond'
            },
            data: data.Humidity
        },
        {
            name: 'Pressure HPa',
            marker: {
                symbol: 'circle'
            },
            data: data.Pressure
        }
        ],
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
                <span>Month Average: Temperature - {month.Temperature} Humidity - {month.Humidity}  Pressure - {month.Pressure}</span>
                <span>Week Average: Temperature - {week.Temperature} Humidity - {week.Humidity}  Pressure - {week.Pressure}</span>
            </span>
            <div className='select-style'>
                <div class="select" tabindex="1">
                    <input className="selectopt" name="test" type="radio" id="opt1" checked />
                    <label for="opt1" class="option">Latest</label>
                    <input className="selectopt" name="test" type="radio" id="opt2" />
                    <label for="opt2" class="option">1 Hour</label>
                    <input className="selectopt" name="test" type="radio" id="opt3" />
                    <label for="opt3" class="option">1 Day</label>
                </div>
            </div>
        </div>
    )
}