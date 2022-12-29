export interface WorksTableRow {
    work_id: number;
    work_date: string;
    start_time: string;
    end_time: string;
    fixed_start_time: string;
    fixed_end_time: string;
    breakings: {
        breaking_id: number;
        start_time: string;
        end_time: string;
        fixed_start_time: string;
        fixed_end_time: string;
    }[];
    comment: string;
}

export interface Works {
    work_id: number;
    day: number;
    date: string;
    works: string;
    breakings: { breaking_id: number; start_time: string; end_time: string; }[];
    workSum: string;
    comment: string;
}