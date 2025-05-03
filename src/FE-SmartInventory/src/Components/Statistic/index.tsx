import React from 'react';
import { Card, Statistic, Typography } from 'antd';

const { Text } = Typography;

interface StatisticCardProps {
  title: string;
  value: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
  return (
    <Card bordered={false}>
      <Statistic
        className="flex justify-center items-center flex-col min-w-36"
        title={<Text className="mb-0 text-base sm:text-lg lg:text-xl xl:text-2xl">{title}</Text>}
        value={value}
        valueStyle={{ color: '#00b0ec', fontSize: '2.5rem', fontWeight: 'bold' }}
      />
    </Card>
  );
};

export default StatisticCard;