import { authStoreSelectors } from '@/Stores/userStore';
import { Footer } from 'antd/es/layout/layout';
import * as React from 'react';

export interface FooterV1Props {}

export default function FooterV1(props: FooterV1Props) {
  // const agencyName = authStoreSelectors.use.agencyName();
  // const primaryColor = authStoreSelectors.use.primaryColor();

  return (
    <Footer className={`text-lg lg:text-xl font-semibold p-2`} style={{ textAlign: 'center' }}>
      {/* {agencyName} */}
    </Footer>
  );
}
