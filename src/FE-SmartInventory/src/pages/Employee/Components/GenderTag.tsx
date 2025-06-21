import { Tag } from 'antd';
import { GenderTypes, genGenderTypes } from '@/Constant/EmployeeTypes';
import { ManOutlined, WomanOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const GenderTag = ({
  gender,
  className,
  genderName,
}: {
  gender: GenderTypes;
  className?: string;
  genderName?: string;
}) => {
  let icon;
  let color;
  switch (gender) {
    case GenderTypes.MALE:
      icon = <ManOutlined />;
      color = 'blue';
      break;
    case GenderTypes.FEMALE:
      icon = <WomanOutlined />;
      color = 'pink';
      break;
    case GenderTypes.OTHER:
      icon = <UserOutlined />;
      color = 'green';
      break;
    default:
      icon = null;
      color = 'default';
  }
  return (
    <Tag
      className={classNames('text-sm font-medium mx-0 w-fit  truncate', className)}
      icon={icon}
      color={color}
    >
      {genderName ? (
        <span className="">
          {genderName} ({genGenderTypes[gender] || gender})
        </span>
      ) : (
        <span className="">{genGenderTypes[gender] || gender}</span>
      )}
    </Tag>
  );
};

export default GenderTag;
