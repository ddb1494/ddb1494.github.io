import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    // 404.html
    const key = '404.html';
    const href = sessionStorage.getItem(key);
    if (href) {
      sessionStorage.removeItem(key);
      const { pathname, hash, search } = new URL(href);
      navigate({
        pathname,
        hash,
        search,
      });
    }
  }, []);

  return <>Index</>;
}
