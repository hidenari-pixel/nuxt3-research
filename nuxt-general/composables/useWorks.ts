import { format, lastDayOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import { parseTime } from "~~/utils/time";
import { WorksTableRow } from "~~/types/works";

export const useMonthWorks = () => {
    const { currentUser } = useAuth()

    const createMonthData = async (month: string) => {
        const lastDay = lastDayOfMonth(new Date(`${month}-01`));
        const supabase = useSupabaseClient()
        const { data } = await supabase
        .from('works')
        .select<"*, breakings(*)", WorksTableRow>('*, breakings(*)')
        .gte('work_date', `${month}-01`)
        .lte('work_date', format(lastDay, 'yyyy-MM-dd'))
        .match({ user_id: currentUser.value?.id })
        .order('work_date')
        return Array.from(new Array(lastDay.getDate()), (_, i) => {
            const targetData = data && data?.find((item) => item.work_date === `${month}-${String(i).padStart(2, '0')}`)
            const day = i + 1;
            const date = format(new Date(lastDay.getFullYear(), lastDay.getMonth(), i+1), "dd (EE)", { locale: ja })
            if (targetData) {
                const breakings = targetData?.breakings?.map((b) => ({
                    breaking_id: b.breaking_id,
                    start_time: parseTime(b.fixed_start_time || b.start_time),
                    end_time: parseTime(b.fixed_end_time || b.end_time || ''),
                })) || []
                const breakingSum = breakings.reduce((s, b) => {
                    const [ih, im] = calcDiffTime(b.start_time, b.end_time).split(":").map((t) => Number(t))
                    const [sh, sm] = s.split(":").map((t) => Number(t))
                    return `${String(ih+sh).padStart(2, "0")}:${String(im+sm).padStart(2, "0")}`
                }, '00:00')
                const workSum = calcDiffTime(breakingSum, calcDiffTime(targetData.start_time || '00:00', targetData.end_time || '00:00'))
                return {
                    work_id: targetData.work_id,
                    day,
                    date,
                    works: `${parseTime(targetData.fixed_start_time || targetData.start_time)} - ${parseTime(targetData.fixed_end_time || targetData.end_time || '')}`,
                    breakings,
                    breakingSum,
                    workSum,
                    comment: targetData.comment,
                }
            }
            return {
                work_id: 0,
                day,
                date,
                works: "00:00 - 00:00",
                breakings: [],
                breakingSum: "00:00",
                workSum: "00:00",
                comment: "",
            }
        })
    }

    return { createMonthData }
}