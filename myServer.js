const http = require('http');
const url = require("url");

let myJson = {
  "name": "zelda",
  "sex": "female",
  "colour": "czarny",
  "paws": 4
}

http.createServer((req, res) => {
  let searchParamOne = url.parse(req.url).pathname.split("/")[1];
  let searchParamTwo = url.parse(req.url).pathname.split("/")[2];
  let searchParamThree = url.parse(req.url).pathname.split("/")[3];
  let serverData = JSON.stringify(myJson);

  res.writeHead(200, {"Content-Type": "application/json"});
  req.on("error", (err) => {
    console.log(err)
  });
    res.on("error", (err) => {
      console.log(err)
    });
      switch (searchParamOne) {
        case "all":
          res.write(serverData);
          break;
        case (Object.keys(myJson).indexOf(searchParamOne) + 1 && searchParamOne):
          res.write(String(myJson[searchParamOne]));
          break;
        case "add":
          if (searchParamThree === undefined) {
            res.write("Pls add 3th parametr");
            break;
          } else {
            myJson[searchParamTwo] = searchParamThree;
            console.log(myJson);
            res.write("Thank you, your word was added into data!")
            break;
          }
        default:
          res.write("searching word dont exist in server data")
          break;
      }
    res.end()
}).listen(8080);
