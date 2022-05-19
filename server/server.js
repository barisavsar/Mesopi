var express = require("express");
var app = express();

app.get('/system', (req, res) => {
    res.json({
      appName: process.env.npm_package_name,
      appVersion: process.env.npm_package_version
    });
  });
  
app.use(express.json());
app.post('/patient', (req, res) => {
    console.log(req.body)
    res.status(200).send()
}
)

app.listen(5000, () => {
 console.log("Server running on port 5000");
});

