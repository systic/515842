## Instalation
Install all dependencies

``` sh
$ npm install
```

## Build
You need to have npm and sass in order to build the project.

Build css with:
``` sh
$ npm run sass
```

## Run it
You need a http server (webpack-dev-server, npm's http-server, apache, nginx, doesn't matter) and run it in the project's root folder.
For ex:

``` sh
$ webpack-dev-server --content-base .
```

Access the url in your browser (http://localhost:8080/).

## Usage
Available users are:
- `retailer`
- `agent`

No password is required to login.

## CSS validation erros
As stated in the contest description, there are allowed some basic validation fails.
The `pointer-events` and `user-select` will fail because it isn't in css3's spec but it does have full browser support and is widenly used by all major css frameworks.
`-webkit-line-clamp` is used to add ellipsis on multiline texts. Using js for doing so is a waste of time since this property is supported by our targeted browsers.
`-webkit-min-device-pixel-ratio` will give an error but it is **required** for retina displays, to show the bigger icon sprite.

The other css warnings can be ignored since they're fully supported and it's just a vendor validation problem.

## JSON data
I used json data (you can find it in `/data` folder) for user, products and statistics. Some of the pages may be html static, but the copilot said it's ok (https://apps.topcoder.com/forums/?module=Thread&threadID=894918&start=0) .

### Search bar on my-inventory page
You'll have to swipe down to reveal it, not ideal, but that's how it was sugested.
To hide it, swipe up over the search bar.

