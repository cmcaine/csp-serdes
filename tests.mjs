import {parse, serialize} from './dist/index.mjs'

// Each of these policies should serialise to $canonical below. Parse and
// serialise and check that they do.
const policies = [
    "default-src 'none'; script-src 'nonce-ExamplePolicyTests'; sandbox; connect-src https: 'self';img-src 'self';style-src 'self'",
    // With duplicate
    "default-src 'none'; script-src 'nonce-ExamplePolicyTests'; sandbox; connect-src https: 'self';img-src 'self';style-src 'self'; default-src 'unsafe-eval'",
    // With mixed case directive names
    "default-src 'none'; script-src 'nonce-ExamplePolicyTests'; sandbox; CONNect-src https: 'self';img-src 'self';StylE-src 'self'",
]

const canonical = "default-src 'none'; script-src 'nonce-ExamplePolicyTests'; sandbox; connect-src https: 'self'; img-src 'self'; style-src 'self'"

const serialized = policies.map(policy => serialize(parse(policy)))

serialized.forEach(policy => {
    if (policy !== canonical) {
        throw `Test failed: "${policy}" !== "${canonical}"`
    }
})

console.log("All tests passed")
