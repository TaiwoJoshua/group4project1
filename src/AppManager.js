export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}‑${month}‑${day} ${hours}:${minutes}:${seconds}`;
}

export function getMaximumArrayValue(data) {
    let max = 0;
    for (let p = 0; p < data.length; p++) {
        const dat = data[p];
        if (dat > max) {
          max = dat;
        }
    }
    return max;
}

export function getMaximumTimestamp(data) {
    let maxTimestamp = 0;
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if (key > maxTimestamp && key !== "Current") {
              maxTimestamp = key;
            }
        }
    }
    return maxTimestamp;
}

export function filterByRecentTime(data, timeThresholdInHours = 1) {
    const currentTimestamp = data.Current ? data.Current.Timestamp : 0;
    // const currentTimestamp = getMaximumTimestamp(data);
    const thresholdTimestamp = currentTimestamp - timeThresholdInHours * 60 * 60 * 1000;
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key >= thresholdTimestamp)
    );
    return filteredData;
}

function getDateWeek(date = 0) {
	const currentDate = date !== 0 ? date : new Date();
	const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
	const daysToNextMonday = (januaryFirst.getDay() === 1) ? 0 : (7 - januaryFirst.getDay()) % 7;
	const nextMonday = new Date(currentDate.getFullYear(), 0, januaryFirst.getDate() + daysToNextMonday);
	return (currentDate < nextMonday) ? 52 : (currentDate > nextMonday ? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

export function filterByCurrMonthOrWeek(data, type = "m") {
    const currentTimestamp = new Date();
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== "Current" && (type === "w" ? getDateWeek(new Date(parseInt(key))) === getDateWeek() : new Date(parseInt(key))?.getMonth() === currentTimestamp.getMonth()))
    );
    return filteredData;
}

export function calculateAverage(array) {
    return array?.length !== 0 ? (array.reduce((sum, current) => sum + current) / array.length).toFixed(2) : 0;
}

export function sortProperties(data){
    let newData = { Temperature: [], Humidity: [], Pressure: [], Timestamp: [] };
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const read = data[key];
            if(read && read.Humidity && read.Temperature  && read.Pressure && read.Timestamp){
                newData = { ...newData, Temperature: [...newData.Temperature, read.Temperature], Humidity: [...newData.Humidity, read.Humidity], Pressure: [...newData.Pressure, read.Pressure], Timestamp: [...newData.Timestamp, formatTimestamp(read.Timestamp)] };
            }
        }
    }
    return newData;
}

export function generateUniqueNumbers(min, max, x) {
    if (min >= max || x > (max - min + 1)) {
      throw new Error("Invalid input: Minimum must be less than maximum, and x cannot be greater than the range size.");
    }
    let uniqueNumbers = [];
    while (uniqueNumbers.length < x - 2) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!uniqueNumbers.includes(randomNumber) && randomNumber !== max && randomNumber !== min) {
        uniqueNumbers.push(randomNumber);
      }
    }
    uniqueNumbers.sort()
    uniqueNumbers.unshift(min);
    uniqueNumbers.push(max);
    return uniqueNumbers;
}

export function fakeSortProperties(data){
    let newData = { Temperature: [], Humidity: [], Pressure: [], Timestamp: [] };
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const read = data[key];
            if(read && read.Humidity && read.Temperature  && read.Pressure && read.Timestamp){
                newData = { ...newData, Temperature: [...newData.Temperature, read.Temperature], Humidity: [...newData.Humidity, read.Humidity], Pressure: [...newData.Pressure, read.Pressure], Timestamp: [...newData.Timestamp, read.Timestamp] };
            }
        }
    }
    return newData;
}

export function selectLatests(data){
    const sorted = fakeSortProperties(data);
    const max = sorted.Temperature.length - 1;
    const min = max - 30;
    const rand = generateUniqueNumbers(min, max, 15);
    const selected = { };
    for (let p = 0; p < rand.length; p++) {
        const index = rand[p];
        selected[sorted.Timestamp[index]] = {};
        selected[sorted.Timestamp[index]].Temperature = sorted.Temperature[index];
        selected[sorted.Timestamp[index]].Humidity = sorted.Humidity[index];
        selected[sorted.Timestamp[index]].Pressure = sorted.Pressure[index];
        selected[sorted.Timestamp[index]].Timestamp = sorted.Timestamp[index];
    }
    return selected;
}


  