import { serve } from "inngest/next";
import { inngestClient } from "@/worker/workLoad";
import { tester } from "@/worker/post-handler";

// Create a client to send and receive events
console.log(process.env.INNGEST_EVENT_KEY);

export default serve({
  client: inngestClient,
  functions: [tester],
  streaming: "allow",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
