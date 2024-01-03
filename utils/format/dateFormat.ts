import dayjs from "dayjs"
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const formatInputDate: 'YYYY-MM-DD' = 'YYYY-MM-DD'

function setDateFormat(v: string):string{
    // const currentDate = v.split(',').join('')
    // const monthName = currentDate.split(' ')[0]
    // const date = currentDate.split(' ')[1]
    // const years = currentDate.split(' ')[2]

    // return dayjs(`${monthName}-${date}-${years}`).format(formatInputDate)
    return dayjs(v).format(formatInputDate)

}

function resetDateFormat(
    date: string
):string{
    const parse = dayjs(date).format('LL')
    return parse
}

const dateFormat = {
    setDateFormat,
    formatInputDate,
    resetDateFormat
}

export default dateFormat