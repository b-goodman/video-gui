/**
 * convert seconds to an hours/minutes/seconds format.
 */
export const convertTime = (time = 0) => {
    return {
        hours: Math.floor(time/3600),
        minutes: Math.floor((time%3600)/60),
        seconds: time%60
    };
}

export const printTime = (time = 0) => {
    const timeObj = convertTime(time);
    return Object.entries(timeObj)
        .filter( (arr) => { return arr[1] > 0})
        .reduce( (acc: string[], cur) => { return [...acc, cur[1]+cur[0][0] ] }, [])
        .join(" ")
}
