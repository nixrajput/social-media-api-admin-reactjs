export const isSameDate = (date, date2, compareWithToday = false) => {
    date = new Date(date);

    if (date2 !== undefined && date2 !== null && date2 !== '' && date2 !== 'Invalid Date') {
        date2 = new Date(date2);
    }

    if (compareWithToday) {
        const today = new Date();

        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    }

    return date.getFullYear() === date2.getFullYear() &&
        date.getMonth() === date2.getMonth() &&
        date.getDate() === date2.getDate();
};

export const toDateString = function (date, { format = 'dd-MM-yyyy', separator = '-' } = {}) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    let yearString = year.toString();
    let monthString = month < 10 ? '0' + month.toString() : month.toString();
    let dayString = day < 10 ? '0' + day.toString() : day.toString();

    if (format === 'dd-MM-yyyy') {
        return dayString + separator + monthString + separator + yearString;
    }

    return yearString + separator + monthString + separator + dayString;
}

export const toTimeString = function (date, { is24HourFormat = false, showSeconds = false } = {}) {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    let hoursString = hours < 10 ? '0' + hours.toString() : hours.toString();
    let minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    let secondsString = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    let timeString = hoursString + ':' + minutesString;

    if (showSeconds) {
        timeString = timeString + ':' + secondsString;
    }

    if (is24HourFormat === false) {
        if (hours > 12) {
            hoursString = (hours - 12).toString();
        } else if (hours === 0) {
            hoursString = '12';
        }

        let amPmString = hours < 12 ? 'AM' : 'PM';

        if (showSeconds) {
            return hoursString + ':' + minutesString + ':' + secondsString + ' ' + amPmString;
        }

        return hoursString + ':' + minutesString + ' ' + amPmString;
    }

    return timeString;
}

export const toDateTimeString = function (date,
    { format = "dd-mm-yyyy", is24HourFormat = false, showSeconds = false } = {}) {
    return toDateString(date, { format })
        + ' '
        + toTimeString(date, {
            is24HourFormat,
            showSeconds
        });
}

export const toTimeAgo = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now - dateObj) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ' years ago';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months ago';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes ago';
    }

    return Math.floor(seconds) + ' seconds ago';
}
