// pages/api/file.ts

import { IncomingForm, File } from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK({
  pinataJWTKey: process.env.PINATA_JWT as string,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: any; files: { file: File | File[] } }> => {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

const saveFileToIPFS = async (file: File) => {
  const stream = fs.createReadStream(file.filepath);
  const result = await pinata.pinFileToIPFS(stream, {
    pinataMetadata: {
      name: file.originalFilename || "uploaded_image",
    },
  });
  fs.unlinkSync(file.filepath);
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { files } = await parseForm(req);
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const ipfsResponse = await saveFileToIPFS(file);

      return res.status(200).json({ ipfsHash: ipfsResponse.IpfsHash });
    } catch (error) {
      console.error("File upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  } else if (req.method === "GET") {
    try {
      const list = await pinata.pinList({ pageLimit: 1 });
      return res.status(200).json(list.rows[0]);
    } catch (error) {
      console.error("Fetching pinned files failed:", error);
      return res.status(500).json({ error: "Could not retrieve pinned data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
