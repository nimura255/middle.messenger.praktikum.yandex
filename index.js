const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
