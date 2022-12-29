import Input from '../components/vue/Input';

const Spacer = () => <span style="color: #ccc;">|</span>;

const Divider = () => (
  <div style="width: 100%; border-bottom: 1px solid #ccc;"></div>
);

export const Login = () => {
  return (
    <el-main style={mainStyle}>
      <el-card style={cardStyle}>
        <el-space style={innerWrapperStyle} direction="vertical" size={20}>
          <div style="font-weight: 600;">勤怠管理システム</div>
          <Divider />
          <el-space
            style={formWrapperStyle}
            direction="vertical"
            alignment="start"
          >
            <el-space style={inputWrapperStyle} spacer={<Spacer />}>
              <div>Email</div>
              <el-input style={inputStyle}></el-input>
            </el-space>
            <el-space spacer={<Spacer />}>
              <div>Password</div>
              <el-input style={inputStyle}></el-input>
            </el-space>
            <el-button onClick={() => navigateTo('/')} type="primary">
              ログイン
            </el-button>
          </el-space>
        </el-space>
      </el-card>
    </el-main>
  );
};

const mainStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardStyle = {
  width: '50vw',
};

const innerWrapperStyle = {
  width: '100%',
};

const formWrapperStyle = {
  width: '100%',
};

const inputWrapperStyle = {
  width: '100%',
};

const inputStyle = {
  width: '100%',
};
