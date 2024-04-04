import { Alert, Timeline } from 'antd';
import { Link } from 'react-router-dom';

const tutorialTimeLine = [
  { children: <p className='text-[1.1rem]'>Step 1: Connect Phantom wallet</p> },
  { children: <p className='text-[1.1rem]'>Step 2: Claim SOL and DSP token</p> },
  {
    children: (
      <p className='text-[1.1rem]'>
        Step 3: Visit <Link to='./dashboard'>Dashboard</Link> the features can be tested as demonstrated in the demo
        video.
      </p>
    ),
  },
];

export default function Tutorial() {
  return (
    <div id='tutorial' className='w-full'>
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
            <li>SOL for fees transaction</li>
            <li>
              A specific SPL token designed for the payment of system fees (temporarily called{' '}
              <strong>DSP token</strong>)
            </li>
          </ul>
          <p>
            SOL and DSP token, you can request <Link to='/claim'>here</Link>
          </p>
        </div>
        <div className='mt-10'>
          <Timeline className='text-xl' mode='left' items={tutorialTimeLine} />
        </div>
      </div>
    </div>
  );
}
