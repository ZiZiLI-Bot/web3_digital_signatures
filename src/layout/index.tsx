/* eslint-disable react-hooks/exhaustive-deps */
import { CompressOutlined, FileAddOutlined, SignatureOutlined } from '@ant-design/icons';
import * as anchor from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

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
  getItem('Create', './create', <FileAddOutlined />),
  getItem('Signature', './signature', <SignatureOutlined />),
  getItem('Verification', './verification', <CompressOutlined />),
];

export default function MainLayout() {
  const mint_address = import.meta.env.VITE_PUBLIC_MINT_TOKEN || '';
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [solBalance, setSolBalance] = useState(0);
  const [DSP, setDSP] = useState(0);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = new anchor.AnchorProvider(connection, wallet!, {});
  anchor.setProvider(provider);

  const getTransactionAccount = async () => {
    if (!wallet) return;
    const lamports = await connection.getBalance(new PublicKey(wallet.publicKey));
    setSolBalance(Number((lamports / LAMPORTS_PER_SOL).toFixed(2)));
  };

  const getDSPBalance = async () => {
    if (!wallet) return;
    const ata = getAssociatedTokenAddressSync(new PublicKey(mint_address), wallet.publicKey);
    const tokenAmount = await connection.getTokenAccountBalance(ata);
    setDSP(tokenAmount.value.uiAmount!);
  };

  useEffect(() => {
    getTransactionAccount();
    getDSPBalance();
  }, [wallet]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key.toString());
  };

  return (
    <Layout className='h-[100vh]'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link to='/dashboard' className='my-2 block'>
          <p className='font-medium text-3xl text-white text-center'>LGC</p>
        </Link>
        <Menu onClick={onClick} theme='dark' defaultSelectedKeys={[location.pathname]} mode='inline' items={items} />
      </Sider>
      <Layout className='h-full w-full'>
        <Header className='p-0 bg-white'>
          <div className='flex items-center justify-between px-4 h-full'>
            <h1 className='text-2xl font-semibold'>LegalChain - Digital Signatures</h1>
            <div className='flex items-center justify-center space-x-2'>
              <Link to='/' className='flex items-center'>
                <FaHome size={24} className='mr-6 text-black' />
              </Link>
              <WalletMultiButton />
              {wallet && (
                <div className='flex flex-col'>
                  <Text className='font-bold'>{solBalance} SOL</Text>
                  <Text className='font-bold'>{new Intl.NumberFormat().format(DSP)} DSP</Text>
                </div>
              )}
            </div>
          </div>
        </Header>
        <Content className='mx-4 mt-2'>
          <main className='p-6 h-full w-full bg-white rounded-xl overflow-auto'>
            <Outlet />
          </main>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DIGITAL SIGNATURES PROJECT ©{new Date().getFullYear()} Created by LegalChain Team
        </Footer>
      </Layout>
    </Layout>
  );
}
