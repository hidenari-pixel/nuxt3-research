const Spacer = () => <span style="color: #ccc;">|</span>;

interface Props {
  email: string;
  password: string;
}

export const Login = ({ email, password }: Props) => {
  return (
    <el-main style={mainStyle}>
      <el-card style={cardStyle}>
        <el-space style={innerWrapperStyle} direction="vertical" size={20}>
          <div style="font-weight: 600;">勤怠管理システム</div>
          <el-space
            style={formWrapperStyle}
            direction="vertical"
            alignment="start"
          >
            <el-space style={inputWrapperStyle} spacer={<Spacer />}>
              <div>Email</div>
              <el-input value={email} style={inputStyle}></el-input>
            </el-space>
            <el-space spacer={<Spacer />}>
              <div>Password</div>
              <el-input value={password} style={inputStyle}></el-input>
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
