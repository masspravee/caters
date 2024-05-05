import { serve } from "inngest/next";
import { inngestClient } from "@/worker/workLoad";
import { tester } from "@/worker/post-handler";

export default serve({
  client: inngestClient,
  functions: [tester],
  streaming: "allow",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
