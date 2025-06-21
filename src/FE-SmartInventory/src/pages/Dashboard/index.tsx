import { useBuilderQuery } from '@/hook';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { TBuilderQuery } from '@/interface';
import Forbidden from '@/Layout/Forbidden';
import { forbiddenStoreSelectors } from '@/Stores/forbiddenStore';
import { authStoreSelectors } from '@/Stores/userStore';
import {
  BarChartOutlined,
  FundOutlined,
  LineChartOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Card, Col, DatePicker, Layout, Row, Select, Typography } from 'antd';
import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { Navigate, useLocation } from 'react-router';
import { useQuerySmartDashboard } from './Hook/useQuerySmartDashboard';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const location = useLocation();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const forbidden = forbiddenStoreSelectors.use.isForbidden();

  // State cho việc chọn kho và thời gian
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<[string, string]>([
    dayjs().format('YYYY-MM'),
    dayjs().add(3, 'month').format('YYYY-MM'),
  ]);

  // Hook để gọi API Smart Dashboard
  const smartDashboard = useQuerySmartDashboard();

  // Filter để lấy danh sách kho
  const [warehouseFilter] = useState<TBuilderQuery>({
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllWarehouse } = useQueryWarehouse(useBuilderQuery(warehouseFilter));
  const warehouses = getAllWarehouse.data?.data || [];
  useEffect(() => {
    if (getAllWarehouse.data && getAllWarehouse.data.data.length > 0) {
      setSelectedWarehouse(getAllWarehouse.data.data[0].id);
      setSelectedPeriod([dayjs().format('YYYY-MM'), dayjs().add(3, 'month').format('YYYY-MM')]);
    }
  }, [getAllWarehouse.data]);
  // Gọi các API thống kê
  const getAllDemandQuery = smartDashboard.getAllDemand('');
  const getInventoryOptimizeQuery = smartDashboard.getInventoryOptimize();
  const getDemandByPeriodQuery = smartDashboard.getDemandByPeriod(
    selectedWarehouse,
    selectedPeriod[0],
    selectedPeriod[1],
    { enabled: !!selectedWarehouse }
  );
  const getInventoryOptimizeByWarehouseQuery = smartDashboard.getInventoryOptimizeByWarehouse(
    selectedWarehouse,
    { enabled: !!selectedWarehouse }
  );

  // Xử lý dữ liệu cho biểu đồ 1: Tất cả dự báo nhu cầu (Line Column Area)
  const allDemandChartData = useMemo(() => {
    const pageData = getAllDemandQuery.data;
    const data = pageData?.data; // Truy cập vào data array bên trong TPage

    console.log('getAllDemandQuery.data (TPage):', pageData); // Debug log
    console.log('Actual data array:', data); // Debug log

    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        categories: [],
        series: [
          { name: 'Dự báo nhu cầu', type: 'column', data: [] },
          { name: 'Ngưỡng trên', type: 'line', data: [] },
          { name: 'Ngưỡng dưới', type: 'area', data: [] },
        ],
      };
    }

    // Group data by product and sum values (since we want products on X-axis)
    const productMap = new Map<
      string,
      { forecastValue: number; upperBound: number; lowerBound: number }
    >();

    data.forEach((item) => {
      if (productMap.has(item.productName)) {
        const existing = productMap.get(item.productName)!;
        existing.forecastValue += item.forecastValue || 0;
        existing.upperBound += item.upperBound || 0;
        existing.lowerBound += item.lowerBound || 0;
      } else {
        productMap.set(item.productName, {
          forecastValue: item.forecastValue || 0,
          upperBound: item.upperBound || 0,
          lowerBound: item.lowerBound || 0,
        });
      }
    });

    const productNames = Array.from(productMap.keys());
    const forecastValues = productNames.map((name) => productMap.get(name)!.forecastValue);
    const upperBounds = productNames.map((name) => productMap.get(name)!.upperBound);
    const lowerBounds = productNames.map((name) => productMap.get(name)!.lowerBound);

    const chartData = {
      categories: productNames,
      series: [
        {
          name: 'Dự báo nhu cầu',
          type: 'column',
          data: forecastValues,
        },
        {
          name: 'Ngưỡng trên',
          type: 'line',
          data: upperBounds,
        },
        {
          name: 'Ngưỡng dưới',
          type: 'area',
          data: lowerBounds,
        },
      ],
    };

    console.log('Final chart data:', chartData); // Debug log
    return chartData;
  }, [getAllDemandQuery.data]);

  // Xử lý dữ liệu cho biểu đồ 2: Dự báo nhu cầu theo kỳ (Line Chart)
  const demandByPeriodChartData = useMemo(() => {
    const data = getDemandByPeriodQuery.data;
    console.log('getDemandByPeriodQuery', data);
    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        categories: [],
        series: [
          { name: 'Dự báo nhu cầu', type: 'line', data: [] },
          { name: 'Ngưỡng trên', type: 'line', data: [] },
          { name: 'Ngưỡng dưới', type: 'line', data: [] },
        ],
      };
    }

    const periods = data.map((item) => item.fromPeriod);
    const forecastValues = data.map((item) => item.forecastValue || 0);
    const upperBounds = data.map((item) => item.upperBound || 0);
    const lowerBounds = data.map((item) => item.lowerBound || 0);

    return {
      categories: periods,
      series: [
        {
          name: 'Dự báo nhu cầu',
          type: 'line',
          data: forecastValues,
        },
        {
          name: 'Ngưỡng trên',
          type: 'line',
          data: upperBounds,
        },
        {
          name: 'Ngưỡng dưới',
          type: 'line',
          data: lowerBounds,
        },
      ],
    };
  }, [getDemandByPeriodQuery.data]);

  // Xử lý dữ liệu cho biểu đồ 3: Tối ưu tồn kho toàn bộ (Mixed Chart)
  const inventoryOptimizeChartData = useMemo(() => {
    const data = getInventoryOptimizeQuery.data?.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        categories: [],
        series: [
          { name: 'EOQ', type: 'column', data: [] },
          { name: 'Tồn kho an toàn', type: 'area', data: [] },
          { name: 'Tồn kho tối ưu', type: 'line', data: [] },
        ],
      };
    }

    // data là TInventoryOptimize[] từ TPage<TInventoryOptimize>
    const productNames = data.map((item) => item.productName);
    const eoqValues = data.map((item) => item.eoq || 0);
    const safetyStockValues = data.map((item) => item.safetyStock || 0);
    const optimalInventoryValues = data.map((item) => item.optimalInventory || 0);

    return {
      categories: productNames,
      series: [
        {
          name: 'EOQ',
          type: 'column',
          data: eoqValues,
        },
        {
          name: 'Tồn kho an toàn',
          type: 'area',
          data: safetyStockValues,
        },
        {
          name: 'Tồn kho tối ưu',
          type: 'line',
          data: optimalInventoryValues,
        },
      ],
    };
  }, [getInventoryOptimizeQuery.data]);

  // Xử lý dữ liệu cho biểu đồ 4: Tối ưu tồn kho theo kho (Mixed Chart)
  const inventoryOptimizeByWarehouseChartData = useMemo(() => {
    const data = getInventoryOptimizeByWarehouseQuery.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        categories: [],
        series: [
          { name: 'EOQ', type: 'column', data: [] },
          { name: 'Tồn kho an toàn', type: 'area', data: [] },
          { name: 'Tồn kho tối ưu', type: 'line', data: [] },
        ],
      };
    }

    const productNames = data.map((item) => item.productName);
    const eoqValues = data.map((item) => item.eoq || 0);
    const safetyStockValues = data.map((item) => item.safetyStock || 0);
    const optimalInventoryValues = data.map((item) => item.optimalInventory || 0);

    return {
      categories: productNames,
      series: [
        {
          name: 'EOQ',
          type: 'column',
          data: eoqValues,
        },
        {
          name: 'Tồn kho an toàn',
          type: 'area',
          data: safetyStockValues,
        },
        {
          name: 'Tồn kho tối ưu',
          type: 'line',
          data: optimalInventoryValues,
        },
      ],
    };
  }, [getInventoryOptimizeByWarehouseQuery.data]);

  // Cấu hình chung cho biểu đồ
  const getChartOptions = (title: string, categories: string[]): ApexOptions => ({
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 2, 3],
      curve: 'smooth',
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Số lượng',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  const onWarehouseChange = (value: string) => {
    setSelectedWarehouse(value);
  };

  const onPeriodChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings[0] && dateStrings[1]) {
      setSelectedPeriod([
        dayjs(dateStrings[0]).format('YYYY-MM'),
        dayjs(dateStrings[1]).format('YYYY-MM'),
      ]);
    }
  };

  if (!accessToken && !refreshToken) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  if (forbidden) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Forbidden />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Title level={2} className="!mb-2 !text-primary">
              <BarChartOutlined className="mr-3" />
              Dashboard Thống Kê Thông Minh
            </Title>
            <Text type="secondary">Theo dõi dự báo nhu cầu và tối ưu hóa tồn kho</Text>
          </div>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            {/* Biểu đồ 1: Tất cả dự báo nhu cầu */}
            <Card
              title={
                <div className="flex items-center gap-2">
                  <LineChartOutlined className="text-blue-500" />
                  <span>Dự Báo Nhu Cầu Tổng Quan</span>
                </div>
              }
              loading={getAllDemandQuery.isLoading}
            >
              {allDemandChartData.categories.length > 0 ? (
                <Chart
                  options={getChartOptions(
                    'Dự báo nhu cầu theo sản phẩm',
                    allDemandChartData.categories
                  )}
                  series={allDemandChartData.series}
                  type="line"
                  height={350}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">Không có dữ liệu để hiển thị</div>
              )}
            </Card>{' '}
          </Col>
          {/* Biểu đồ 3: Tối ưu tồn kho toàn bộ */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <TrophyOutlined className="text-orange-500" />
                  <span>Tối Ưu Tồn Kho Toàn Bộ</span>
                </div>
              }
              loading={getInventoryOptimizeQuery.isLoading}
            >
              {inventoryOptimizeChartData.categories.length > 0 ? (
                <Chart
                  options={getChartOptions(
                    'Tối ưu tồn kho tổng quan',
                    inventoryOptimizeChartData.categories
                  )}
                  series={inventoryOptimizeChartData.series}
                  type="line"
                  height={350}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">Không có dữ liệu để hiển thị</div>
              )}
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Biểu đồ 2: Dự báo nhu cầu theo kỳ */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FundOutlined className="text-green-500" />
                    <span>Dự Báo Nhu Cầu Theo Kỳ</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select
                      placeholder="Chọn kho"
                      style={{ width: 200 }}
                      onChange={onWarehouseChange}
                      value={selectedWarehouse || undefined}
                      allowClear
                    >
                      {warehouses.map((warehouse) => (
                        <Option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </Option>
                      ))}
                    </Select>

                    <RangePicker
                      picker="month"
                      format="YYYY-MM"
                      onChange={onPeriodChange}
                      defaultValue={[dayjs().subtract(1, 'year'), dayjs().add(3, 'month')]}
                    />
                  </div>
                </div>
              }
              loading={getDemandByPeriodQuery.isLoading}
            >
              {demandByPeriodChartData.categories.length > 0 ? (
                <Chart
                  options={getChartOptions(
                    'Dự báo nhu cầu theo thời gian',
                    demandByPeriodChartData.categories
                  )}
                  series={demandByPeriodChartData.series}
                  type="line"
                  height={350}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedWarehouse ? 'Không có dữ liệu cho kho đã chọn' : 'Vui lòng chọn kho'}
                </div>
              )}
            </Card>
          </Col>
          {/* Biểu đồ 4: Tối ưu tồn kho theo kho */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <BarChartOutlined className="text-purple-500" />
                  <span>Tối Ưu Tồn Kho Theo Kho</span>
                </div>
              }
              loading={getInventoryOptimizeByWarehouseQuery.isLoading}
            >
              {inventoryOptimizeByWarehouseChartData.categories.length > 0 ? (
                <Chart
                  options={getChartOptions(
                    'Tối ưu tồn kho theo kho được chọn',
                    inventoryOptimizeByWarehouseChartData.categories
                  )}
                  series={inventoryOptimizeByWarehouseChartData.series}
                  type="line"
                  height={350}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedWarehouse ? 'Không có dữ liệu cho kho đã chọn' : 'Vui lòng chọn kho'}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
