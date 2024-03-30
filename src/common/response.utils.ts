export const Response = (
  success: boolean,
  message: string,
  body: any,
  statusCode: number,
) => {
  const responseData = { success: success, message: message };
  if (body) {
    responseData['body'] = body;
  }
  return { responseData, status: statusCode };
};
