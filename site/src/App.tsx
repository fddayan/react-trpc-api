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
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
