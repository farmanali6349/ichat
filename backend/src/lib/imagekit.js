import ImageKit, { toFile } from "@imagekit/nodejs";
import { IMAGE_KIT_PRIVATE_KEY } from "../config/config.js";

const client = new ImageKit({ privateKey: IMAGE_KIT_PRIVATE_KEY });

function getFileName(currName = "upload") {
  const safeName = currName.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
  return `chat-${Date.now()}-${safeName}`;
}

export async function uploadChatMedia(file) {
  const fileName = getFileName(file.originalname);
  const response = await client.uploadFile({
    file: await toFile(file.buffer, fileName, { type: file.mimetype }),
    fileName,
    folder: "/chat",
  });

  return response.url;
}
