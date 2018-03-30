const http = require('http');
const url = require("url");
const fs = require("fs");

http.createServer((req, res) => {
  let userSearch = url.parse(req.url).pathname.split("/")[1];
  let serverData = fs.readFileSync("serverData.json");
  let data = JSON.parse(serverData);
  function dataWrite(e) {
      return JSON.stringify(e, null, 2);
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  req.on("error", (err) => {
    console.log(err);
  });

  res.on("error", (err) => {
    console.log(err);
  });

  let dataName = data.user.pet.reduce(function(e, el) {
      if (userSearch === el.name) {
        e = el.name
      }
    return e
  }
  , {});

  let dataId = data.user.pet.reduce(function(e, el) {
      if (userSearch === el.name) {
        e = (el.id)
      }
    return e
  }
  , {});


  switch (userSearch) {
    case data.user.name:
      res.write(dataWrite(data.user.name))
      break;

    case dataName:
      res.write(dataWrite(data.user.pet[dataId]))
      break;

    case "add":
      function AddPet(){
        this.id = data.user.pet.length,
        this.name = url.parse(req.url).pathname.split("/")[2],
        this.age = url.parse(req.url).pathname.split("/")[3],
        this.sex = url.parse(req.url).pathname.split("/")[4]
      }

      url.parse(req.url).pathname.split("/")[4]
        ?
        (data.user.pet.push(new AddPet()),
        fs.writeFile("serverData.json",
                      dataWrite(data),
                      (err) => {
                        if (err) throw err}
                    ),
        res.write("new pet added")
        )
        :
        res.write("fill empty space");
      break;

    default:
      res.write(dataWrite(data));
      break;
    }

  res.end();
}).listen(8080);
