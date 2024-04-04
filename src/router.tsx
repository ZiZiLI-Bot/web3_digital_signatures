import { createBrowserRouter } from 'react-router-dom';
import ClaimToken from './app/ClaimToken';
import CreateDocs from './app/Create_doc';
import LandingPage from './app/Landing';
import SignDoc from './app/Sign_doc';
import DetailDoc from './app/Sign_doc/DetailDoc';
import Tutorial from './app/Tutorial';
import Verification from './app/Verification';
import VerificationDetail from './app/Verification/Verification';
import MainLayout from './layout';
import RedirectTo from './utils/Redirect/RedirectTo';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/claim', element: <ClaimToken /> },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { path: '', element: <Tutorial /> },
      { path: 'create', element: <CreateDocs /> },
      { path: 'signature', element: <SignDoc /> },
      { path: 'verification', element: <Verification /> },
      { path: 'signature/:id', element: <DetailDoc /> },
      { path: 'verification/:id', element: <VerificationDetail /> },
    ],
  },
  { path: '*', element: <RedirectTo to='/' /> },
]);

export default router;
