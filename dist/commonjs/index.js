"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple CSP parser. Does not validate or normalise.
 *
 * By specification, a CSP is a map of directive name to directive value and
 * directive value is a set[1].
 *
 * So this parser gives you a JS Map of String => Set.
 *
 * This code is an implementation of the canonical serialized CSP parsing
 * algorithm[2]. With the additional rule that directive-names are forced to
 * lowercase because CSPv2 specifies case-insensitive matching of names[3] and
 * all the valid names are canonically lowercase. Discussion[4].
 *
 * If you want directive name validation use csputil or add a validate function.
 *
 * [1]: https://w3c.github.io/webappsec-csp/#grammardef-serialized-policy
 * [2]: https://w3c.github.io/webappsec-csp/#parse-serialized-policy
 * [3]: https://w3c.github.io/webappsec-csp/2/#policy-parsing
 * [4]: https://github.com/w3c/webappsec-csp/issues/236
 */
function parse(policy) {
    // Only the first directive with a given name is used, so remove duplicates
    // Map() keeps the last duplicate, which is the opposite of what we want.
    const seenNames = new Set();
    function unseenName(name) {
        if (!seenNames.has(name)) {
            seenNames.add(name);
            return true;
        }
        else {
            // console.warn(`CSP policy "${policy}" contains duplicate directive name: "${name}"`)
            return false;
        }
    }
    return new Map(policy.split(';')
        .map(token => token.trim())
        .filter(token => token !== '')
        .map(token => {
        let [name, ...value] = token.split(/\s+/);
        return [name.toLowerCase(), new Set(value)];
    })
        .filter(([name, _]) => unseenName(name)));
}
exports.parse = parse;
/**
 * Semicolon delimited list of space delimited name + value lists.
 *
 * https://w3c.github.io/webappsec-csp/#grammardef-serialized-policy
 */
function serialize(policy) {
    return Array.from(policy.entries())
        .map(([name, value]) => [name, ...Array.from(value)].join(' '))
        .join('; ');
}
exports.serialize = serialize;
//# sourceMappingURL=index.js.map