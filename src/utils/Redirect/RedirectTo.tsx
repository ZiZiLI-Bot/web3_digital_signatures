import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectTo({ to }: { to: string }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(to);
  }, []);

  return <></>;
}
