const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));
app.use('/src', express.static('/src'));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
