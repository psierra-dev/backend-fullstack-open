export const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({error: "malformatted id"});
  } else if (error.name === "ValidationError") {
    return response.status(400).json({error: error.message});
  }

  next(error);
};

export const errorServer = (error, request, response, next) => {
  return response.status(500).send({error: "error server"});
};
