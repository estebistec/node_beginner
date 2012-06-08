var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// TODO implemented named URL lookup/reverse
var handle = {}
handle["/"] = requestHandlers.index;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
