const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === "/log") {
    const { headers, method, url } = req;
    let body = [];
    req.on("error", (err) => {
      console.error(err)
    }).on("data", (chunk) => {
      body.push(chunk)
    }).on("end", () => {
        body = JSON.parse(body);
        let serverData;

        function checkFileExistsSync(filepath){
          let flag = true;
          try{
            fs.accessSync(filepath);
          }catch(e){
            flag = false;
          }
          return flag;
        }

        switch (checkFileExistsSync(body["name"] + ".json")) {
          case false:
              res.writeHead(200, {"Content-Type": "application/json"})
              res.write(JSON.stringify("błedny login użytkownika"));
              res.end()
            break;
          default:
            serverData = fs.readFileSync(body["name"] + ".json")
            fs.readFile(body["name"] + ".json", () => {
              res.writeHead(200, {"Content-Type": "application/json"})
              res.write(JSON.stringify(JSON.parse(serverData).user.name))
              res.end()
          })
        }
  })
} else if (req.method === 'POST' && req.url === "/sign") {
    //do poprawki
      const { headers, method, url } = req;
      let body = [];
      req.on("error", (err) => {
        console.error(err)
      }).on("data", (chunk) => {
        body.push(chunk)
      }).on("end", () => {
        body = JSON.parse(body);

        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(body));
        res.end()
    })
} else {
  res.writeHead(200, {"Content-Type": "application/json"})
  res.end()
}
}).listen(8080)
