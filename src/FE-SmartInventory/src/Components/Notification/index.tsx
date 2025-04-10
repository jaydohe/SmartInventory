import { TNotifyType } from '@/Constant';
import { TNotification, TPage } from '@/interface';
import { getInitials } from '@/utils';
import { UseQueryResult } from '@tanstack/react-query';
import { Avatar, Badge, Flex, List, Tag } from 'antd';
import moment from 'moment';
import 'moment/dist/locale/vi';

export interface TNotificationComProps {
  handleNavigateNotify: (typeNavigate: TNotifyType, targetId: string) => void;
  isRead?: boolean;
  getAllNotification: UseQueryResult<TPage<TNotification>, Error>;
  handleMakeAsReadNotify: (id: string) => void;
}

export default function NotificationCom({
  handleNavigateNotify,
  isRead = true,
  getAllNotification,
  handleMakeAsReadNotify,
}: TNotificationComProps) {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={
          isRead
            ? getAllNotification.data?.data
            : getAllNotification.data?.data.filter((item) => item.isMarked === isRead)
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className={`hover:bg-[#f6f6f6]    ${
              item.type === TNotifyType.TICKET_UNDO || item.type === TNotifyType.SCHEME_UNDO
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            } `}
            onClick={() => {
              if (item.type !== TNotifyType.TICKET_UNDO && item.type !== TNotifyType.SCHEME_UNDO) {
                handleNavigateNotify(item.type, item.targetId);
              }

              if (!item.isMarked) {
                handleMakeAsReadNotify(item.id);
              }
            }}
          >
            <List.Item.Meta
              className={`px-2 items-center`}
              title={
                <Flex wrap align="center" justify="space-between">
                  {!item.isMarked ? (
                    <Badge size="default" offset={[-1, 3]} status="processing" dot>
                      <Tag color="orange" className="mx-0 text-sm font-medium ">
                        {item.title}
                      </Tag>
                    </Badge>
                  ) : (
                    <Tag color="orange" className="mx-0 text-sm font-medium ">
                      {item.title}
                    </Tag>
                  )}

                  {moment(item.createdAt).format('ll')}
                </Flex>
              }
              description={
                <p className="tex-base font-medium text-bgHeaderItem"> {item.content}</p>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}
