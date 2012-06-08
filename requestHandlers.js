var formidable = require("formidable"),
    fs = require("fs"),
    mu = require("mu2"),
    querystring = require("querystring"),
    util = require("util");

mu.root = __dirname + "/templates";

function redirectTo(location_path) {
  return function(response, request) {
    var location = "http://" + request.headers.host + location_path;
    response.writeHead(302, {"Location": location});
    response.end();
  }
}

function templateHandler(templateName, view) {
  return function(response, request) {
    if (process.env.NODE_ENV == "DEVELOPMENT") {
      mu.clearCache();
    }

    view = typeof view !== "undefined" ? view : {};
    if(typeof view === "function") {
      view = view(request);
    }

    response.writeHead(200, {"Content-Type": "text/html"});
    var stream = mu.compileAndRender(templateName, view);
    util.pump(stream, response);
  }
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Possible error on Windows systems:
       tried to rename to an already existing file */
    fs.rename(files.upload.path, "/Users/steven/tmp/diabeetus.png", function(err) {
      if (err) {
        fs.unlink("/Users/steven/tmp/diabeetus.png");
        fs.rename(files.upload.path, "/Users/steven/tmp/diabeetus.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    // TODO use template rendering code from above...
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/Users/steven/tmp/diabeetus.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.index = redirectTo("/start");
exports.start = templateHandler("start.html");
exports.upload = upload;
exports.show = show;
