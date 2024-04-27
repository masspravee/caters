import { serve } from "inngest/next";
import { inngestClient } from "@/worker/workLoad";
import { tester } from "@/worker/post-handler";

// Create a client to send and receive events

export default serve({
  client: inngestClient,
  functions: [tester],
});