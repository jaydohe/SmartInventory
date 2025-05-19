import { Button, Typography } from 'antd';
import { DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

const DeleteAccount = ({
  isLogin,
  handleDeleteAccount,
  handleCancel,
}: {
  isLogin: boolean | undefined;
  handleDeleteAccount: () => void;
  handleCancel: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <Typography.Paragraph>'Bạn có chắc chắn muốn Xoá tài khoản này không?'</Typography.Paragraph>
      <div className="self-end">
        <Button
          onClick={handleDeleteAccount}
          variant="text"
          color="danger"
          icon={<DeleteOutlined />}
        >
          Xoá tài khoản
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
