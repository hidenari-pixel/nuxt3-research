import { SupabaseClient, User } from "@supabase/supabase-js"
import { format, lastDayOfMonth } from "date-fns"
import { parseTime } from "./time"
import { Ref } from "vue"
import { WorksTableRow } from "~~/types/works"
import { ja } from "date-fns/locale"

export const fetchTodayWorks = async () => {
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase
        .from('works')
        .select<"*, breakings(*)", WorksTableRow>('*, breakings(*)')
        .match({ work_date: format(new Date(), 'yyyy-MM-dd' )})
        .single()
        if (error) {
            throw error
        }
        const start_time = parseTime(data?.fixed_start_time || data?.start_time || '')
        const end_time = parseTime(data?.fixed_end_time || data?.end_time || '')
        const breakings = data?.breakings?.map((b) => ({
            breaking_id: b.breaking_id,
            start_time: b.fixed_start_time || b.start_time,
            end_time: b.fixed_end_time || b.end_time || '',
        })) || []
        const breakSum = breakings.reduce((s, b) => {
            const [ih, im] = calcDiffTime(b.start_time, b.end_time).split(":").map((t) => Number(t))
            const [sh, sm] = s.split(":").map((t) => Number(t))
            return `${String(ih+sh).padStart(2, "0")}:${String(im+sm).padStart(2, "0")}`
        }, '00:00')
        const workSum = (() => {
            if (end_time) {
                return calcDiffTime(breakSum, calcDiffTime(start_time || '00:00', end_time || '00:00'))
            }
            return "00:00"
        })()
        const comment = data?.comment || ''
        return {
            workId: data.work_id,
            start_time,
            end_time,
            breakings,
            breakSum,
            workSum,
            comment
        }
    } catch (error) {
        console.log(error)
        return {
            workId: 0,
            start_time: null,
            end_time : null,
            breakings: [],
            breakSum: "00:00",
            workSum: "00:00",
            comment: ""
        }
    }
}

export const createMonthData = async (month: string, currentUser: Ref<User | null>) => {
    const supabase = useSupabaseClient()
    const lastDay = lastDayOfMonth(new Date(`${month}-01`));
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