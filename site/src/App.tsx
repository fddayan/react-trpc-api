import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';

const DisplayUser = () => {
  const { data } = trpc.getUser.useQuery("1234");

  return (
    <div>
      Name:
      {data?.name}
    </div>
  )
}

const Articles = () => {
  const utils = trpc.useContext();
  const { data } = trpc.getArticles.useQuery();
  const { mutateAsync } = trpc.createArticle.useMutation({
    onSuccess() {
      utils.getArticles.invalidate();
    }
  });

  const handleCreateRandomArticle = async () => {
    mutateAsync({ title: `${Math.random()}`, url: `${Math.random()}` })
  }

  return (
    <div>
      <button onClick={handleCreateRandomArticle}>Create Random Article</button>
      <ul>
        {data?.articles.map(a => (
          <li key={a.title}>{a.title}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_URL,
          // url: 'http://localhost:5000/trpc',
          // // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <DisplayUser />
        <Articles />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
