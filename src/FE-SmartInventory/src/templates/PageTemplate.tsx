// Template for pages using permission system
// Copy this template and modify for your specific page

import React, { useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionWrapper } from '@/Components/PermissionWrapper';
import SearchInput from '@/Components/SearchInput';

// Change this to your page name for permissions
const PAGE_NAME = 'YourPageName';

interface DataType {
  id: string;
  name: string;
  // Add your data fields here
}

export default function YourPage() {
  const permissions = usePermissions(PAGE_NAME);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [data, setData] = useState([]);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (record: DataType) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: DataType) => {
    // Implement delete logic
    console.log('Delete', record);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {permissions.canUpdate() && (
            <Button
              color="gold"
              variant="solid"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Cập nhật
            </Button>
          )}
          {permissions.canDelete() && (
            <Button
              color="red"
              variant="solid"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            >
              Xóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl">Your Page Title</h2>

          {permissions.canCreate() && (
            <Button
              variant="solid"
              color="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              className="rounded-2xl w-full sm:w-fit"
            >
              Thêm mới
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3">
          <SearchInput
            placeholder="Tìm kiếm..."
            handleSearchValue={(value) => {
              // Logic search
            }}
          />
        </div>
      </div>

      <Table rowKey="id" columns={columns} dataSource={data} className="rounded-md bg-white" />

      {/* Create Modal */}
      {permissions.canCreate() && (
        <Modal
          title="Thêm mới"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          footer={null}
        >
          {/* Your create form component */}
        </Modal>
      )}

      {/* Edit Modal */}
      <Modal
        title="Cập nhật"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        {/* Your edit form component */}
      </Modal>
    </div>
  );
}

/*
Usage Pattern:

1. Import usePermissions hook:
   import { usePermissions } from '@/hooks/usePermissions';

2. Initialize permissions in component:
   const permissions = usePermissions('YourPageName');

3. Use direct permission checks:
   {permissions.canCreate() && <Button>Thêm</Button>}
   {permissions.canUpdate() && <Button>Sửa</Button>}
   {permissions.canDelete() && <Button>Xóa</Button>}

4. Or use PermissionWrapper component:
   <PermissionWrapper pageName="YourPageName" action="create">
     <Button>Thêm</Button>
   </PermissionWrapper>

5. Make sure your page name matches the permissions defined in:
   src/utils/permissions.ts - PAGE_PERMISSIONS object
*/
