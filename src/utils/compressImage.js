import Compressor from "compressorjs";

/**
 * 压缩图像
 * @param {File} file
 * @param {number} limit
 * @returns {Promise<Blob>}
 */
export function compressImage(file, limit = 512 * 1024) {
  return new Promise((resolve) => {
    if (file.size < limit) resolve(file);
    else {
      new Compressor(file, {
        quality: 0.6,
        convertTypes: ["image/png"],
        convertSize: limit,
        success(result) {
          resolve(result);
        },
      });
    }
  });
}
