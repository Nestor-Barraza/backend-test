module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/, https://lite-thinking-test.000webhostapp.com/');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header( 'Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  next();
}