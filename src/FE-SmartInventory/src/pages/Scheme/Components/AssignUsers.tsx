import React, { useState } from 'react';
import { Card, Select, Button, Popover, Table, Typography, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { TUser } from '@/interface/TUser';
import { ColumnType } from 'antd/es/table/interface';
import RoleTag from '@/pages/User/Components/RoleTag';

const { Title, Text } = Typography;
const { Option } = Select;

interface AssignUsersProps {
  users: TUser[];
  selectedUsers: string[];
  setSelectedUsers: (value: string[]) => void;
  handleAssignUser: () => void;
  processes: any[];
  processColumns: ColumnType<any>[];
}

const AssignUsers: React.FC<AssignUsersProps> = ({
  users,
  selectedUsers,
  setSelectedUsers,
  handleAssignUser,
  processes,
  processColumns,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleAssignUser();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Card
      title={<Title level={4} className='mb-0'>Danh sách Phân công</Title>}
      extra={
        <Button type="primary" className='text-base font-semibold' onClick={showModal} icon={<UserAddOutlined />}>
          Phân công
        </Button>
      }
    >
      <Modal
        centered
        title="Phân công"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          mode="multiple"
          className="w-full"
          placeholder="Chọn người dùng"
          value={selectedUsers}
          onChange={(value) => setSelectedUsers(value)}
          allowClear={true}
          virtual={false}
          maxTagCount={'responsive'}
        >
          {users.map((user: any) => (
            <Option key={user.id} value={user.id}>
              <RoleTag role={user.role} userName={user.name} />
            </Option>
          ))}
        </Select>
      </Modal>
      <Table
        columns={processColumns}
        dataSource={processes.map((process: any) => ({ ...process, key: process.id }))}
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Card>
  );
};

export default AssignUsers;
