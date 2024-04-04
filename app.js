const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const router = require('./routes/v1/router.js');
app.use('/api', router);

// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yaml')
// const fs = require('fs');
// const file = fs.readFileSync('api-docs.yaml', 'utf8');
// const swaggerDocs = YAML.parse(file)

// app.use('/v1/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`App berjalan pada port : ${port}`);
});
