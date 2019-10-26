 export const apiResponse = (res, status, error, payload) => {
  res.status(status).json({ error, payload, status });
}