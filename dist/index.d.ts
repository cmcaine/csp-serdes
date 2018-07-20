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
export declare function parse(policy: string): Map<string, Set<string>>;
/**
 * Semicolon delimited list of space delimited name + value lists.
 *
 * https://w3c.github.io/webappsec-csp/#grammardef-serialized-policy
 */
export declare function serialize(policy: Map<string, Set<string>>): string;
