export const parseTime = (time: string) => time.slice(0, time.lastIndexOf(':'))
export const calcDiffTime = (start_time: string, end_time: string) => {
    const hourDiff = Number(end_time.split(':')[0]) - Number(start_time.split(':')[0])
    const minuteDiff = Number(end_time.split(':')[1]) - Number(start_time.split(':')[1])
    return `${String(hourDiff).padStart(2, '0')}:${String(minuteDiff).padStart(2, '0')}`
}