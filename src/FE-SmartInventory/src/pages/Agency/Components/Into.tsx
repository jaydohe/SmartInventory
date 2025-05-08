import { Button, Card, Col, Divider, Form, Input, Modal, Row, Space, Tag, Typography } from 'antd';

import { QueryKeys, RoleEnumString, UserOptionEnum } from '@/Constant';
import { TUpdatePassword, TUpdateUser } from '@/interface/TUser';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  KeyOutlined,
  LockOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQueryDetailAgency, useQueryAgency } from '../Hook/useQueryAgency';
import CreateAgency from './CreateAgency';
import UpdateAgency
 from './UpdateAgency';

 export default function AgencyInfo({ AgencyId }: { AgencyId: string }) {
   const [form] = Form.useForm();
   const [action, setAction] = useState<UserOptionEnum | null>(null);
   const queryClient = useQueryClient();
 
   const { data: getInfo } = useQueryDetailAgency(AgencyId);
   const { updateAgency } = useQueryAgency('');

   useEffect(() => {
    if (getInfo?.data) {
      form.setFieldsValue({
        id: getInfo.data.id,
        name: getInfo.data.name,
        
        
      });
    }
  }, [getInfo]);
