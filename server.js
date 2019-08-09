require('dotenv').config();
const app = require('./lib/app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on ${PORT}`);
});
