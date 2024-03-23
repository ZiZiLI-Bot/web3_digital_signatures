/* eslint-disable react-hooks/exhaustive-deps */
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import * as anchor from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateDocs from './Create_doc';

const { Header, Content, Footer, Sider } = Layout;
const SOL_ICON = 'https://cryptologos.cc/logos/solana-sol-logo.png';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Create', 'sub1', <UserOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [solBalance, setSolBalance] = useState(0);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = new anchor.AnchorProvider(connection, wallet!, {});
  anchor.setProvider(provider);

  const getTransactionAccount = async () => {
    if (!wallet) return;
    const lamports = await connection.getBalance(new PublicKey(wallet.publicKey));
    setSolBalance(Number((lamports / LAMPORTS_PER_SOL).toFixed(2)));
  };

  useEffect(() => {
    getTransactionAccount();
  }, [wallet]);

  return (
    <Layout className='h-[100vh]'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='my-2'>
          <p className='font-medium text-3xl text-white text-center'>WEB3</p>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
      </Sider>
      <Layout className='h-full w-full'>
        <Header className='p-0 bg-white'>
          <div className='flex items-center justify-between px-4 h-full'>
            <h1 className='text-2xl font-semibold'>Digital Signatures</h1>
            <div className='flex items-center space-x-2'>
              <WalletMultiButton />
              {wallet && (
                <div className='flex items-center space-x-2'>
                  <div className='bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center p-2 shadow-lg'>
                    <img src={SOL_ICON} alt='SOL ITEM' className='w-full h-full' />
                  </div>
                  <p className='font-bold'>{solBalance} SOL</p>
                </div>
              )}
            </div>
          </div>
        </Header>
        <Content className='mx-4 mt-2'>
          <main className='p-6 h-full w-full bg-white rounded-xl'>
            <CreateDocs />
          </main>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          WEB3 - DIGITAL SIGNATURES PROJECT ©{new Date().getFullYear()} Created by DST Team
        </Footer>
      </Layout>
    </Layout>
  );
}
