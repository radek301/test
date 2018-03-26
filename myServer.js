const http = require('http');
const url = require("url");
const fs = require("fs");

http.createServer((req, res) => {
  let searchParamOne = url.parse(req.url).pathname.split("/")[1];
  let searchParamTwo = url.parse(req.url).pathname.split("/")[2];
  let searchParamThree = url.parse(req.url).pathname.split("/")[3];
  let serverData = fs.readFileSync("serverData.json");
  let dataObj = JSON.parse(serverData);
  let dataHTML = JSON.stringify(dataObj, null, 2);

  res.writeHead(200, {"Content-Type": "application/json"});
  req.on("error", (err) => {
    console.log(err);
  });
    res.on("error", (err) => {
      console.log(err);
    });

    switch (searchParamOne) {
      case "all":
        res.write(dataHTML);
        break;
      case (Object.keys(dataObj).indexOf(searchParamOne) + 1 && searchParamOne):
        res.write(String(dataObj[searchParamOne]));
        break;
      case "add":
        if (searchParamThree === undefined) {
          res.write("Pls add 3th parametr");
          break;
        } else {
          dataObj[searchParamTwo] = searchParamThree;
          let dataAdd = JSON.stringify(dataObj, null, 2);
          fs.writeFile("serverData.json", dataAdd, (err) => {
              if(err) throw err;
          });
          res.write("Thank you, your word was added into data!");
          break;
        }
      default:
        res.write("searching word dont exist in server data");
        break;
    }
  res.end();
}).listen(8080);
