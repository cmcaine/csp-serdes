Simple and correct Content-Security-Policy parser and serializer using ES6 Maps and Sets.

```js
import * as csp from 'csp-serdes'

example_policy = "default-src 'none'; script-src 'nonce-ExamplePolicyTests'; sandbox; connect-src https: 'self'; img-src 'self'; style-src 'self'"

policy = csp.parse(example_policy)

policy instanceof Map // true
policy.get('default-src') instanceof Set // true

// remove directives
policy.delete('sandbox')

// modify directives
policy.get('script-src').add("'unsafe-eval'")

// replace directives
policy.set('script-src', new Set(["'self'", "'unsafe-eval'"]))

// serialize back to a string
csp.serialize(policy) // "default-src 'none'; script-src 'self' 'unsafe-eval'; connect-src https: 'self'; img-src 'self'; style-src 'self'"
```
