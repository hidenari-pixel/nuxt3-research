export const useWorkEdit = () => {
    const supabase = useSupabaseClient<any>()

    const updateWorks = async (work_id: number, user_id: string | undefined, work_date: string, fixed_start_time: string, fixed_end_time: string, updateFunc: () => Promise<void>) => {
        if (work_id === 0) {
            await supabase.from("works").insert({ user_id, work_date, start_time: fixed_start_time, end_time: fixed_end_time }).then(async () => await updateFunc())
            return
        }
        await supabase.from("works").update({ fixed_start_time, fixed_end_time }).match({ work_id }).then(async () => await updateFunc());
    }

    const updateBreakings = async (breaking_id: number, fixed_start_time: string, fixed_end_time: string | null, updateFunc: () => Promise<void>) => {
        await supabase.from("breakings").update({ fixed_start_time, fixed_end_time }).match({ breaking_id }).then(async () => await updateFunc());
    } 

    const insertBreaking = async (work_id: number, user_id: string | undefined, start_time: string, end_time: string, updateFunc: () => Promise<void>) => {
        await  supabase.from("breakings").insert({ work_id, user_id, start_time, end_time }).then(async () => await updateFunc())
    }

    const updateComment = async  (work_id: number, comment: string, updateFunc: () => Promise<void>) => {
        if (work_id === 0) {
            alert("勤務がないためコメントできません")
            return
        }
        await supabase.from("works").update({ comment }).match({ work_id }).then(async () => await updateFunc())
    }

    return {
        updateWorks,
        updateBreakings,
        insertBreaking,
        updateComment,
    }
}