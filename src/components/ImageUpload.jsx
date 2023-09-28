import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/fire-config";
import Compressor from "compressorjs";

const uploadImage = async (file) => {
  try {
    let compressedImg = file;
    let storageRef;

    if (file.type === "image") {
      compressedImg = await new Promise((resolve) => {
        new Compressor(values.img, {
          maxWidth: 1500,
          quality: 0.8,
          success(result) {
            resolve(result);
          },
          error(err) {
            console.error("Image compression error:", err);
            resolve(values.img);
          },
        });
      });

      storageRef = ref(storage, `blogImages/${compressedImg.name}`);
      await uploadBytes(storageRef, compressedImg);
    }

    const URL = compressedImg ? await getDownloadURL(storageRef) : null;

    return {
      default: URL,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return Promise.reject(error);
  }
};

export default uploadImage;
