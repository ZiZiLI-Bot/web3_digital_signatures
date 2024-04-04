/* eslint-disable react-hooks/exhaustive-deps */
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Button, ConfigProvider, notification, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../Landing/landing.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Text } = Typography;

type dropDSP = {
  success: boolean;
  message: string;
  transition?: string;
};

export default function ClaimToken() {
  const mint_address = import.meta.env.VITE_PUBLIC_MINT_TOKEN || '';
  const [SOL, setSOL] = useState(0);
  const [DSP, setDSP] = useState(0);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const airdropSOL = async () => {
    if (!wallet.connected) return;
    setLoading(true);
    try {
      const message = 'Airdrop 2 SOL to current wallet: ' + wallet.publicKey?.toBase58();
      const encodedMessage = new TextEncoder().encode(message);
      await wallet.signMessage!(encodedMessage);

      const drop = await connection.requestAirdrop(wallet.publicKey!, 2 * LAMPORTS_PER_SOL);

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: drop,
      });
      notification.success({ message: 'Success', description: 'Airdrop successful' });
      getSOLBalance();
    } catch (error) {
      notification.error({
        message: 'Failed to airdrop SOL',
        description: 'You have requested too many airdrops. Wait 24 hours for a refill.',
      });
      console.error(error);
    }
    setLoading(false);
  };

  const airdropDSP = async () => {
    if (!wallet.connected) return;
    setLoading(true);
    try {
      const message = 'Airdrop 1.000.000 DSP to current wallet: ' + wallet.publicKey?.toBase58();
      const encodedMessage = new TextEncoder().encode(message);
      await wallet.signMessage!(encodedMessage);

      const getDrop = await axios.post<dropDSP>('https://airdrop.chuhung.com/claim_token', {
        address: wallet.publicKey?.toBase58(),
      });

      if (!getDrop.data.success) {
        notification.error({ message: 'Error', description: getDrop.data.message });
        setLoading(false);
        return;
      } else {
        notification.success({
          message: 'Success',
          description: (
            <p>
              Request successful. You can check transaction{' '}
              <a href={getDrop.data.transition} target='_blank'>
                here
              </a>
            </p>
          ),
        });
        getDSPBalance();
      }

      getDSPBalance();
    } catch (error) {
      notification.error({ message: 'Error', description: 'Failed to airdrop DSP' });
      console.error(error);
    }
    setLoading(false);
  };

  const getSOLBalance = async () => {
    if (!wallet.connected) return;
    const balance = await connection.getBalance(wallet.publicKey!);
    setSOL(balance / LAMPORTS_PER_SOL);
  };

  const getDSPBalance = async () => {
    if (!wallet.connected) return;
    const ata = getAssociatedTokenAddressSync(new PublicKey(mint_address), wallet.publicKey!);
    const tokenAmount = await connection.getTokenAccountBalance(ata);
    setDSP(tokenAmount.value.uiAmount!);
  };

  useEffect(() => {
    getSOLBalance();
    getDSPBalance();
  }, [wallet]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className='bg-black text-white w-full h-screen flex flex-col items-center justify-center'>
        <h1 className={`${styles.text_title} text-[3.5rem] my-2`}>DSP - Request Token</h1>
        <div className='w-[37rem] h-[70%] border border-solid border-gray-900/80 rounded-md p-6'>
          <Link to='/' className='mb-2 block'>
            Back to home
          </Link>
          <div className='space-y-5 border-b border-solid border-gray-900/80 pb-8'>
            <h2 className='text-3xl font-medium'>Request Claim:</h2>
            <p>You can only hold a maximum of 5.000.000 DSP</p>
            <p>DSP contract: </p>
            <Text copyable>DKc1k886G6ZQgS4zZRZzLhJinQ7C3DBfw9sFcZwzhYXh</Text>
            <p className='text-red-600 font-medium'>* Only run in devnet</p>
            <div className='flex space-x-3 items-end'>
              <p className='font-medium'>WALLET: </p>
              <WalletMultiButton />
            </div>
          </div>
          {wallet.connected ? (
            <div className='mt-6 space-y-2'>
              <h2>Current:</h2>
              <p>SOL: {SOL.toFixed(2)} SOL</p>
              <p>DSP: {new Intl.NumberFormat().format(DSP)} DSP</p>
              <div className='space-y-4'>
                <Button
                  onClick={airdropSOL}
                  disabled={loading}
                  loading={loading}
                  type='primary'
                  size='large'
                  className='w-full'
                  style={{ height: 50 }}
                >
                  Request to 2 SOL
                </Button>
                <Button
                  onClick={airdropDSP}
                  disabled={loading}
                  loading={loading}
                  type='primary'
                  size='large'
                  className='w-full'
                  style={{ height: 50 }}
                >
                  Request to 1.000.000 DSP Token
                </Button>
              </div>
            </div>
          ) : (
            <div className='text-center mt-10'>
              <h2>Connect Wallet to Proceed</h2>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
