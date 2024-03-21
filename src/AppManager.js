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
    const currentTimestamp = getMaximumTimestamp(data);
    const thresholdTimestamp = currentTimestamp - timeThresholdInHours * 60 * 60 * 1000;
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key >= thresholdTimestamp)
    );
    return filteredData;
}