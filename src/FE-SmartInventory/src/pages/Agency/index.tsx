import {
 CheckCircleOutlined,
 CloseCircleOutlined,
 DeleteOutlined,
 EyeOutlined,
 FundOutlined,
 InfoCircleOutlined,
 LockFilled,
 PlusOutlined,
 SettingOutlined,
 ToolOutlined,
} from '@ant-design/icons';
import {
 Button,
 Input,
 Space,
 Table,
 Tag,
 Typography,
 Modal,
 Popconfirm,
 Statistic,
 Row,
 Col,
 Card,
 Tabs,
 Tooltip,
 Drawer,
 Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { TCreateAgency, TAgency } from '@/interface/TAgency';
import { ROLE, RoleEnum, RoleEnumString, roleName } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { useQueryAgency } from './Hook/useQueryAgency';
import CreateAgency from './Components/CreateAgency';
import RoleTag from '../User/Components/RoleTag';

