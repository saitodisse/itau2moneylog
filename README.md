Itaú copy-and-paste converter to moneylog
==========================

Helps to convert your itau 'extrato' to moneylog-beta format (http://aurelio.net/moneylog/beta/)

- this tool will work well with Firefox
- you have to use "por periodo" on Itaú web-site
- not tested on windows

#### Install

----------------

```sh
npm install -g itau-copy-paste-to-moneylog
```

```sh
# install nodemon to make the process easier
npm install -g nodemon
```

----------------

#### Usage example

###### print converted 'itaú extrato' on screen

```sh
converter-itau.js data-pasted.txt
```

###### smart usage with nodemon

When you save the moneylog data is appended.

```sh
nodemon -q -e 'txt' bin/converter-itau.js periodo paste-data.txt >> ../moneylog-beta/txt/dados.txt
```

You can use `save-text-to-file` firefox add-on (https://addons.mozilla.org/EN-uS/firefox/addon/save-text-to-file/?src=userprofile).
Just configure to save on `Shift + F1` to your `paste-data.txt`.

 * 1) copy/paste/save text from 'extrato' with `save-text-to-file`
 * 2) change month and repeat above step

----------------

#### developers, come here

##### run all tests

```sh
gulp
```

##### filter tests

```sh
gulp --grep='Periodo Especifico: convert Itaú line: should get date from begining'
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
