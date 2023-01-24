import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../services/functions/lambda';
export const trpc = createTRPCReact<AppRouter>();