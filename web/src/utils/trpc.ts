import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../services/functions/router";
export const trpc = createTRPCReact<AppRouter>();
