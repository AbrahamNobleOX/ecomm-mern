export const payloadSize = (payloadData) => {
  const payloadString = JSON.stringify(payloadData);
  const payloadSizeInBytes = Buffer.byteLength(payloadString, "utf8");

  let payloadSize;

  if (payloadSizeInBytes < 1024) {
    payloadSize = `${payloadSizeInBytes} bytes`;
  } else if (payloadSizeInBytes < 1024 * 1024) {
    payloadSize = `${(payloadSizeInBytes / 1024).toFixed(2)} KB`;
  } else if (payloadSizeInBytes < 1024 * 1024 * 1024) {
    payloadSize = `${(payloadSizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    payloadSize = `${(payloadSizeInBytes / (1024 * 1024 * 1024)).toFixed(
      2
    )} GB`;
  }

  return payloadSize;
};
