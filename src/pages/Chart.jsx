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
    const [flip, setFlip] = React.useState("latest");
    const [week, setWeek] = React.useState({ Temperature: 0, Humidity: 0, Pressure: 0 });
    const [month, setMonth] = React.useState({ Temperature: 0, Humidity: 0, Pressure: 0 });
    const [options, setOptions] = React.useState({ });
    React.useEffect(() => {
        if(flip === "hour"){
            setRange(1);
        }else if(flip === "day"){
            setRange(24);
        }else{
            setRange(0);
        }
    }, [flip]);

    function handleFlip(event){
        setFlip(event.target.value);
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
            // console.log(error);
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

    React.useEffect(() => {
        const options = {
            chart: {
              type: 'spline'
            },
            title: {
              text: 'Humidity, Pressure and Temperature Chart'
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
                name: 'Humidity %',
                marker: {
                    symbol: 'diamond'
                },
                data: data.Humidity
            },
            {
                name: 'Pressure mPa',
                marker: {
                    symbol: 'circle'
                },
                data: data.Pressure
            },
            {
                name: 'Temperature °C',
                marker: {
                    symbol: 'square'
                },
                data: data.Temperature
        
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
        setOptions(options);
    }, [data]);

    return (
        <div className='chart'>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div className="select">
                <button className="average-label">Average Readings</button>
                <span className="average-data highcharts-label highcharts-tooltip highcharts-color-0" style={{cursor: "default", pointerEvents: "none", transform: "translate(144,154)"}}>
                    <span style={{color: "rgb(51, 51, 51)", fontSize: "0.8em"}}>
                        <span style={{fontSize: "0.8em"}}>Current Week</span>
                        <span>
                            <span style={{color: "rgb(84, 79, 197)"}}>●</span> Humidity %: <span style={{fontWeight: "bold"}}>{week.Humidity}</span>
                        </span>
                        <span>
                            <span style={{color: "rgb(0, 226, 114)"}}>●</span> Pressure mPa: <span style={{fontWeight: "bold"}}>{week.Pressure}</span>
                        </span>
                        <span>
                            <span style={{color: "rgb(44, 175, 254)"}}>●</span> Temperature °C: <span style={{fontWeight: "bold"}}>{week.Temperature}</span>
                        </span>
                        <br />
                        <span style={{fontSize: "0.8em"}}>Current Month</span>
                        <span>
                            <span style={{color: "rgb(84, 79, 197)"}}>●</span> Humidity %: <span style={{fontWeight: "bold"}}>{month.Humidity}</span>
                        </span>
                        <span>
                            <span style={{color: "rgb(0, 226, 114)"}}>●</span> Pressure mPa: <span style={{fontWeight: "bold"}}>{month.Pressure}</span>
                        </span>
                        <span>
                            <span style={{color: "rgb(44, 175, 254)"}}>●</span> Temperature °C: <span style={{fontWeight: "bold"}}>{month.Temperature}</span>
                        </span>
                    </span>
                </span>
                <div className="hidden-toggles">
                    <input name="flip" type="radio" id="hour" value={"hour"} checked={flip === "hour"} className="hidden-toggles__input" onChange={handleFlip} />
                    <label htmlFor="hour" className="hidden-toggles__label">1 Hour</label>	
				
                    <input name="flip" type="radio" id="latest" value={"latest"} checked={flip === "latest"} className="hidden-toggles__input" onChange={handleFlip} />
                    <label htmlFor="latest" className="hidden-toggles__label">Latest</label>
                    
                    <input name="flip" type="radio" id="day" value={"day"} checked={flip === "day"} className="hidden-toggles__input" onChange={handleFlip} />
                    <label htmlFor="day" className="hidden-toggles__label">1 Day</label>
                </div>
            </div>
        </div>
    )
}