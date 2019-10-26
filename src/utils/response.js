 export const apiResponse = (res, status, error, payload) => {
  res.status(status).send(JSON.stringify({ error, payload, status }));
}