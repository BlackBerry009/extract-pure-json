# Install
```sh
npm install extract-pure-json
```
```sh
yarn add extract-pure-json
```
```sh
pnpm install extract-pure-json
```

# Usage
```js
import extractPureJson from 'extract-pure-json'

const str1 = 'hello world { "a": 1, "b": 2 }'
const str2 = 'Hey [{ "a": 1, "b": 2 }]'
const str3 = '{"a": 1} {"b": 2}'

extractPureJson(str1) // { "a": 1, "b": 2 }
extractPureJson(str2) // false
extractPureJson(str3) // {"a": 1}
```

