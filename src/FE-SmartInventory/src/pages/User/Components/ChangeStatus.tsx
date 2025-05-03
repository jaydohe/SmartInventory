import { Button, Typography } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

const ChangeStatus = ({
  isLogin,
  handleChangeStatus,
  handleCancel,
}: {
  isLogin: boolean | undefined;
  handleChangeStatus: () => void;
  handleCancel: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <Typography.Paragraph>
        {isLogin
          ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
          : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'}
      </Typography.Paragraph>
      <div className="self-end">
        <Button
          onClick={handleChangeStatus}
          variant="text"
          color={isLogin ? 'danger' : 'primary'}
          icon={!isLogin ? <UnlockOutlined /> : <LockOutlined />}
        >
          {isLogin ? 'Khóa' : 'Mở Khóa'}
        </Button>
      </div>
    </div>
  );
};

export default ChangeStatus;
