const fsevents = require("fsevents");
const config = require("../webpack.config");
const webpack = require("webpack");
const compiler = webpack(config);
const { exec } = require("child_process");

// exec("http-server");

const stop = fsevents.watch(__dirname, (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id);
  console.log(info);
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log(stats);
    }
  });
});
