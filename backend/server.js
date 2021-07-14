// server starts from this file
const app = require('./app');

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, (connected, err) => {
  if (err) {
    console.log('error occurred:', err);
    return;
  } else {
    console.log('listening on port:', port);
  }
});
