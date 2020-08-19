var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting() {
    this.log("method 1 just ran");
  }

  creating() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("public/package.json"),
      { title: "Template with yeoman" } // user answer `title` used
    );
    this.npmInstall(["webpack", "webpack-cli", "webpack-dev-server"], {
      "save-dev": true,
    });
  }
};
