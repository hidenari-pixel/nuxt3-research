export const Main = () => {
  return (
    <el-main style={mainStyle}>
      <el-space style={cardWrapperStyle}>
        <el-card style={cardStyle}>
          <el-space direction="vertical" alignment="center">
            <div style="width: 100%;font-weight: 600;border-bottom: 1px solid #ccc;">
              現在の状態
            </div>
            <el-space direction="vertical">
              <el-space alignment="center">
                <el-button type="success">出勤</el-button>
                <el-button type="warning">退勤</el-button>
              </el-space>
              <el-space direction="vertical">
                <el-space>
                  <el-button type="success">休憩</el-button>
                  <el-button type="warning">終了</el-button>
                </el-space>
              </el-space>
            </el-space>
          </el-space>
        </el-card>
        <el-card style={cardStyle}>
          <el-space direction="vertical" alignment="center">
            <div style="font-weight: 600; border-bottom: 1px solid #ccc;">
              本日の出勤
            </div>
            <el-space direction="vertical" alignment="start">
              <el-space spacer=":">
                <div style="font-weight: 600;">勤務時間</div>
                <div>00:00 - 00:00</div>
              </el-space>
              <el-space spacer=":">
                <div style="font-weight: 600;">休憩時間1</div>
                <div>00:00 - 00:00</div>
              </el-space>
              <el-space spacer=":">
                <div style="font-weight: 600;">休憩時間2</div>
                <div>00:00 - 00:00</div>
              </el-space>
              <el-space spacer=":">
                <div style="font-weight: 600;">休憩時間合計</div>
                <div>00:00</div>
              </el-space>
              <el-space spacer=":">
                <div style="font-weight: 600;">勤務時間合計</div>
                <div>00:00</div>
              </el-space>
              <el-space spacer=":">
                <div style="font-weight: 600;">コメント</div>
                <div></div>
              </el-space>
            </el-space>
          </el-space>
        </el-card>
      </el-space>
    </el-main>
  );
};

const mainStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardWrapperStyle = {
  padding: '30px',
  alignItems: 'stretch',
};

const cardStyle = {
  padding: '30px',
  paddingTop: '10px',
};
