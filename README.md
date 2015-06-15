Itau copy-and-paste converter to moneylog
==========================

Helps to convert your itau 'extrato' to moneylog format


#### Install

----------------

```sh
npm install -g itau-copy-paste-to-moneylog
```

----------------

#### Usage example

```sh
convert-itau-por-periodo     -i data-pasted.txt --append txt/dados.txt
convert-itau-extrato-simples -i data-pasted.txt --append txt/dados.txt
```

----------------

#### developers, come here

##### run all tests

```sh
gulp
```

##### filter tests

```sh
gulp --grep='Periodo Especifico: convert Itau line: should get date from begining'
```

##### Deploy npm package

You can deploy package with:

```shell
$ npm run deploy [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
```

This should run the following steps:

  - Check if not tracked commits in git
  - Run tests with `npm test`
  - Upgrade version in `package.json`, commit and add tag
  - Publish package in npmjs.com
