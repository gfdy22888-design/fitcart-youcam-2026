// Keep multipart requests comfortably below hosting ingress limits.
// The original file remains in the shopper's browser for the before/after view.
export async function prepareImage(file: File): Promise<File> {
  const limit = 700_000;
  if (file.size <= limit) return file;
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this photo.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.88, 0.74, 0.6, 0.46]) {
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= limit) return new File([blob], "fitcart-prepared.jpg", {type: "image/jpeg"});
    }
    throw new Error("This image is too complex to prepare. Choose a smaller JPG photo.");
  } finally {
    bitmap.close();
  }
}
