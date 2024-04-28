import { serve } from "inngest/next";
import { inngestClient } from "@/worker/workLoad";
import { tester } from "@/worker/post-handler";

// Create a client to send and receive events

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [tester],
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
