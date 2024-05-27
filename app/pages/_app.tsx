import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <AntdRegistry>
        <Component {...pageProps} />
    </AntdRegistry>
  </ConfigProvider>
);

export default App;