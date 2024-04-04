import Helix from '@/assets/Helix.png';
import Ico_sanhedrin from '@/assets/Ico_sanhedrin.png';
import Sphere from '@/assets/Sphere.png';
import Thous from '@/assets/Thorus_3.png';
import Card from '@/assets/card.png';
import Fav_folder from '@/assets/fav_folder.png';
import Flash from '@/assets/flash.png';
import Setting from '@/assets/setting.png';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Alert, Col, ConfigProvider, Modal, Row, Timeline, theme } from 'antd';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';
import { useRef, useState } from 'react';

const videoDemo =
  'https://firebasestorage.googleapis.com/v0/b/stroragefile.appspot.com/o/videos%2FDSP%20Demo%20Video%20-%20Made%20with%20Clipchamp%20(1).mp4?alt=media&token=6e2a5d6d-674e-4839-bd11-bfd2c699fbd9';

const tutorialTimeLine = [
  { children: <p className='text-[1.1rem]'>Step 1: Connect Phantom wallet</p> },
  { children: <p className='text-[1.1rem]'>Step 2: Claim SOL and DSP token</p> },
  {
    children: (
      <p className='text-[1.1rem]'>
        Step 3: Visit{' '}
        <Link className='underline' to='./dashboard'>
          Dashboard
        </Link>{' '}
        the features can be tested as demonstrated in the demo video.
      </p>
    ),
  },
];

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeModal = () => {
    setOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <main className='bg-[#050505] w-full h-full relative text-white'>
        <div id='navbar' className='fixed w-full h-20 z-20 bg-black'>
          <div className='container mx-auto h-full flex justify-between items-center'>
            <div className='flex items-center'>
              <h3 className='ml-2 font-bold text-3xl'>DSP</h3>
            </div>
            <div className='flex items-center space-x-3'>
              <p className='font-medium text-[17px]'>Wallet: </p>
              <WalletMultiButton />
            </div>
          </div>
        </div>
        <div id='header' className='w-full h-screen overflow-hidden'>
          <div className='h-[95%] w-full relative'>
            <div className='absolute w-full h-full blur'>
              <img
                src={Ico_sanhedrin}
                alt='ICON'
                className={`${styles.sanhedrin_1} absolute w-80 top-[10%] left-80 opacity-75`}
              />
              <img
                src={Ico_sanhedrin}
                alt='ICON'
                className={`${styles.sanhedrin_2} absolute w-[30rem] bottom-0 -right-44 opacity-75`}
              />
            </div>
            <div className='absolute left-[50%] -translate-x-[50%] w-full h-full container flex flex-col justify-center items-center'>
              <h5 className='font-medium text-xl text-center'>Welcome to LegalChain</h5>
              <h1 className={`${styles.text_title} text-[7rem] leading-normal text-center`}>
                Digital signature solution for businesses
              </h1>
              <div className='mt-4 flex items-center justify-center space-x-4'>
                <Link to='/dashboard'>
                  <button className='btn'>See demo</button>
                </Link>
                <a href='#introduction'>
                  <button className='btn'>Introduction</button>
                </a>
              </div>
            </div>
          </div>
          <div className='h-[5%] flex items-center justify-center'>
            <FaAngleDoubleDown size={30} className='animate-bounce' />
          </div>
        </div>
        <div id='introduction' className='w-full h-screen pt-24 relative overflow-hidden'>
          <img src={Helix} alt='Icon' className={`${styles.sanhedrin_1} absolute -left-[10%] w-1/3`} />
          <div className='container absolute left-[50%] -translate-x-[50%]'>
            <h2 className='font-light text-gray-500/90'># INTRODUCTION</h2>
            <h1 className={`${styles.text_title} text-[5rem] block w-[50%]`}>
              Digital signatures. Power by blockchain.
            </h1>
            <p className='font-light text-2xl block w-[80%]'>
              LegalChain is a solution that assists businesses in managing, storing, issuing internally, authenticating,
              and ensuring the integrity of legal documents through blockchain technology. It simplifies the
              complexities and challenges associated with handling routine documents.
            </p>
            <div className='mt-10 flex space-x-3'>
              <button onClick={() => setOpen(true)} className='btn'>
                Video demo
              </button>
              <a href='#tutorial'>
                <button className='btn'>claim token test</button>
              </a>
            </div>
          </div>
        </div>
        <div id='features' className='w-full min-h-screen pt-24'>
          <div className='w-full h-full container mx-auto relative'>
            <img src={Thous} alt='Icon' className='absolute w-[40%] top-[10%] left-[50%] -translate-x-[50%] blur' />
            <h2 className='font-light text-gray-500/90'># Features</h2>
            <div className='w-full h-[40rem] relative flex flex-col items-center justify-center space-y-8'>
              <h4 className='font-light text-xl text-gray-300/75 uppercase'>IN LegalChain</h4>
              <h1 className={`${styles.text_title} text-[5rem] block w-[40rem] text-center`}>
                MORE POWER MORE SIMPLIFY
              </h1>
              <p className='text-center block w-[40rem] text-xl font-light'>
                The LegalChain solution utilizes blockchain records to enhance application transparency beyond what web2
                systems offer. It is designed to be easily accessible and deployable for each customer.
              </p>
            </div>
          </div>
          <Row gutter={[16, 16]} className='container mx-auto w-full h-full'>
            <Col span={12} className='flex flex-col items-center justify-center'>
              <div className='w-1/2 h-full'>
                <img src={Flash} alt='Icon' className='w-[9rem]' />
                <h1>High Availability</h1>
                <p className='font-light text-base'>
                  Simple to deploy and scale, always prepared for any scenario, powered by Solana Blockchain.
                </p>
              </div>
            </Col>
            <Col span={12} className='flex flex-col items-center justify-center'>
              <div className='w-1/2 h-full'>
                <img src={Card} alt='Icon' className='w-[9rem]' />
                <h1>Cost Optimization</h1>
                <p className='font-light text-base'>
                  Charges are determined by the number of requests, with no need for upfront payments or standard plans.
                </p>
              </div>
            </Col>
            <Col span={12} className='flex flex-col items-center justify-center'>
              <div className='w-1/2 h-full'>
                <img src={Setting} alt='Icon' className='w-[9rem]' />
                <h1>Automated Workflows</h1>
                <p className='font-light text-base'>
                  Say goodbye to delays! Our platform streamlines approvals and execution, accelerating the agreement
                  process.
                </p>
              </div>
            </Col>
            <Col span={12} className='flex flex-col items-center justify-center'>
              <div className='w-1/2 h-full'>
                <img src={Fav_folder} alt='Icon' className='w-[9rem]' />
                <h1>Enhanced Transparency</h1>
                <p className='font-light text-base'>
                  Gain a clear audit trail of all changes and approvals, facilitating dispute resolution and fostering
                  trust.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div id='tutorial' className='w-full min-h-screen pt-24'>
          <div className='container mx-auto'>
            <h2 className='font-light text-gray-500/90'># Tutorial</h2>
            <Alert
              className='mt-4'
              message='Introduce demo'
              description='This is simply a demonstration to present the concept. The entire system is currently deployed only on the Solana devnet network!'
              type='warning'
              showIcon
            />
            <div className='mt-10 text-[1.1rem]'>
              <p>There are two types of fees that need to be paid to interact with the program:</p>
              <ul>
                <li>SOL for transaction fee</li>
                <li>
                  A specific SPL token issued by us for the payment of system fees (temporarily called{' '}
                  <strong>DSP token</strong>)
                </li>
              </ul>
              <p>
                You can request for SOL and DSP token <Link to='/claim'>here</Link>
              </p>
            </div>
            <div className='mt-10'>
              <Timeline className='text-xl' mode='left' items={tutorialTimeLine} />
            </div>
            <Link to='/dashboard'>
              <button className='btn'>See Demo</button>
            </Link>
          </div>
        </div>
        <div id='contacts' className='w-full min-h-screen pt-24 relative'>
          <img src={Sphere} alt='Icon' className='absolute w-1/3 top-[50%] -translate-y-[50%] -left-[10%]' />
          <div className='container mx-auto'>
            <h2 className='font-light text-gray-500/90'># Info / Contacts</h2>
            <Row gutter={16} className='mt-10'>
              <Col span={12} className='space-y-4'>
                <h1 className={`${styles.text_title} text-[5rem]`}>We always recognize your contributions.</h1>
                <p className='text-xl'>
                  Up-to-date information will consistently be provided on the official pages. We welcome feedback from
                  all.
                </p>
              </Col>
              <Col span={12} className='flex flex-col items-end'>
                <div className='space-y-24'>
                  <div>
                    <a target='_blank' href='https://arena.colosseum.org/posts/929'>
                      <h1 className={`${styles.text_title} text-[3rem] cursor-pointer`}>Colosseum Post ↵</h1>
                    </a>
                    <p className='text-xl'>The post on Colosseum showcases the project idea.</p>
                  </div>
                  <div>
                    <a target='_blank' href='https://twitter.com/LegalChainSLN'>
                      <h1 className={`${styles.text_title} text-[3rem] cursor-pointer`}>X Page ↵</h1>
                    </a>
                    <p className='text-xl'>Official X page of the project.</p>
                  </div>
                  <div>
                    <h1 className={`${styles.text_title} text-[3rem] cursor-pointer`}>Contacts</h1>
                    <p className='text-xl'>
                      Email: <a href='mailto:huutrungle2001@gmail.com'>huutrungle2001@gmail.com</a> -{' '}
                      <a href='mailto:hung.chutuan@chuhung.com'>hung.chutuan@chuhung.com</a>
                    </p>
                    <p className='text-xl'>
                      Telegram:{' '}
                      <a target='_blank' href='https://t.me/huutrungle2001'>
                        @huutrungle2001
                      </a>
                      {' - '}
                      <a target='_blank' href='https://t.me/chutuanhung'>
                        @chutuanhung
                      </a>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div id='footer' className='py-4'>
          <p className='text-center text-base text-gray-500'>
            # LegalChain Team - DIGITAL SIGNATURES PROJECT ©{new Date().getFullYear()}
          </p>
        </div>
      </main>
      <Modal footer={[]} centered width='53%' open={open} onOk={closeModal} onCancel={closeModal}>
        <video ref={videoRef} className='w-full h-[500px]' controls>
          <source src={videoDemo} type='video/mp4' />
        </video>
      </Modal>
    </ConfigProvider>
  );
}
