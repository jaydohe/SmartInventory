import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useQuerySetup } from './Hook/useQuerySetup';
import SetupForm from './Components/SetupForm';
import { Card, Typography, Spin, Alert } from 'antd';
import { usePermissions } from '@/hook/usePermissions';

const { Title, Text } = Typography;

export default function SetupPage() {
  const permissions = usePermissions('SetupPage');

  // Filter cho Setup
  const [setupFilter] = useState<TBuilderQuery>({
    appendQuery: [],
  });

  const setupParams = useBuilderQuery(setupFilter);
  const { getSetup, createOrUpdateSetup } = useQuerySetup(setupParams);
  const { data: setupData, isLoading, error } = getSetup;

  const handleCreateOrUpdate = (data: any) => {
    createOrUpdateSetup.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description="Không thể tải thông tin thiết lập. Vui lòng thử lại sau."
        type="error"
        showIcon
      />
    );
  }

  const hasExistingSetup = !!setupData;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-2 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <SettingOutlined className="text-xl font-medium" />
            Thiết lập thông số hệ thống
          </h2>
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            {permissions.canUpdate() ? (
              <SetupForm
                initialData={setupData}
                handleSubmit={handleCreateOrUpdate}
                isLoading={createOrUpdateSetup.isPending}
              />
            ) : (
              <Alert
                message="Không có quyền chỉnh sửa"
                description="Bạn không có quyền chỉnh sửa thiết lập thông số. Vui lòng liên hệ quản trị viên."
                type="warning"
                showIcon
              />
            )}
          </div>

          <div className="w-full md:w-1/4">
            <Card className="bg-gray-50 h-full">
              <Title level={5}>Thông tin</Title>
              <Text>
                {hasExistingSetup
                  ? 'Thông số đã được thiết lập. Bạn có thể cập nhật thông số tại đây.'
                  : 'Chưa có thông số nào được thiết lập. Vui lòng tạo mới thông số.'}
              </Text>
              <div className="mt-4">
                <Text strong>Lưu ý:</Text>
                <ul className="list-disc pl-5 mt-2">
                  <li>Thông số này sẽ ảnh hưởng đến tính toán tồn kho an toàn.</li>
                  <li>
                    Việc thay đổi thông số sẽ ảnh hưởng đến các báo cáo và tính toán trong hệ thống.
                  </li>
                  <li>Nên tham khảo ý kiến chuyên gia trước khi thay đổi các thông số này.</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
