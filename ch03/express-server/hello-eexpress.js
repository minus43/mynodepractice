const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; chatset=utf-8' });
  res.end('헬로 express');
});

app.listen(port, () => {
  console.log(`START_SERVER : use ${port}`);
});
