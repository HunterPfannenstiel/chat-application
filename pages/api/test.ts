import { NextApiHandler } from "next";
const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    const { initialFetch, page } = req.query;
    console.log({ initialFetch, page });
    res.status(200).json({ message: "sent!" });
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
