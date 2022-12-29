import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import format from 'date-fns/format';
import { ja } from 'date-fns/locale';

const createDefaultMonthData = (month: string) =>
  Array.from(
    new Array(lastDayOfMonth(new Date(`${month}-01`)).getDate()),
    (_, i) => ({
      date: format(new Date(`${month}-${i + 1}`), 'dd (EE)', { locale: ja }),
      works: '00:00 - 00:00',
      breakings:
        i % 2 === 0
          ? ['00:00 - 00:00']
          : ['00:00 - 00:00', '00:00 - 00:00'].join(' '),
      breakingSum: '00:00',
      workSum: '00:00',
      comment: 'any comment' + (i + 1),
    })
  );

export const Works = () => {
  const monthData = createDefaultMonthData(format(new Date(), 'yyyy-MM'));

  return (
    <el-main>
      <el-table
        data={monthData}
        style="height: 80vh;"
        header-cell-class-name="table-header-cell"
      >
        <el-table-column
          fixed
          label="日付"
          prop="date"
          width="100px"
        ></el-table-column>
        <el-table-column label="勤務時間" prop="works" />
        <el-table-column
          label="休憩時間"
          prop="breakings"
          width={130}
        ></el-table-column>
        <el-table-column label="休憩時間合計" prop="breakingSum" />
        <el-table-column label="勤務時間合計" prop="workSum" />
        <el-table-column label="コメント" prop="comment" />
        <el-table-column fixed="right" width="100px"></el-table-column>
      </el-table>
    </el-main>
  );
};
