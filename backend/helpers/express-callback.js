const makeCallback = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      id: req.id,
      host: req.hostname,
      user: req.user,
      url: req.originalUrl,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    };
    controller(httpRequest)
      .then(httpResponse => {
        res.type('json');
        res.status(httpResponse.statusCode).json(httpResponse.body);
      })
      .catch(err => res.status(500).send(
        {
          message: 'An unknown error occurred.',
          error: err
        }));
  };
};

export default makeCallback;
