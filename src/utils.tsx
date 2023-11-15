export const findDataReadMessage = async (
  dataMessage: any[],
  dataRead: any
) => {
  const arrayDataMessage = dataMessage;
  const findIndexRead = dataMessage?.findIndex(
    (a: any) => a._id === dataRead?._id
  );
  arrayDataMessage[findIndexRead] = dataRead;
  return arrayDataMessage;
};

export const findDataReadMessageSender = async (
  dataMessage: any[],
  dataRead: any
) => {
  const arrayDataMessage = dataMessage;
  const findIndexRead = dataMessage?.findIndex(
    (a: any) => a._id === dataRead?._id
  );
  arrayDataMessage[findIndexRead] = dataRead;
  return arrayDataMessage;
};
