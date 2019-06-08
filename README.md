# WWDC 2019 recap

View via GitHub pages: [https://q42.github.io/wwdc-2019-recap/](https://q42.github.io/wwdc-2019-recap/)

## Developing

This uses Parcel, so little dev overhead. See [Parcel docs](https://parceljs.org).

Scripts:
- npm start: `NODE_ENV=development parcel index.html`
- npm run deploy: `node collect-docs.js && cp img/* dist/img/ && gh-pages -d dist`

