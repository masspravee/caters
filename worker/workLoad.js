import { Inngest } from "inngest";
export const inngestClient = new Inngest({
  id: "my-app",
  eventKey: process.env.InngestKey,
});
