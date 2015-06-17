import path from 'path';

module.exports = class ConvertItauCli {
  createCli(opts) {
    var Cli = require('cli-router').Cli;

    opts.controllers_root = path.join(__dirname, "./controllers");
    var cli = new Cli(opts);

    cli
      .route('version', (p) => p.version || p['--version'])
      .route('convert', (p, args) => args.length === 1);

    var result = cli.run({ argv: process.argv.slice(2) });
    if (result.hasOwnProperty('_promise0')) {
      // promise result
      return result.then(function (promise_result) {
        console.log(promise_result);
      });
    } else {
      // no promise
      console.log(result);
    }
  }
};
