import { Tooltip } from 'antd';
import { ReactNode } from 'react';

export interface IToolTipAntProps {
  children: ReactNode;
  text: string;
}

export default function ToolTipAnt({ children, text }: IToolTipAntProps) {
  return (
    <Tooltip placement="left" title={text} color={'blue'}>
      {children}
    </Tooltip>
  );
}
