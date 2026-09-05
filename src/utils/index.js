export function matchPath(patternInfo, pathname) {
  const {
    path,
    caseSensitive = false,
    end = true,
  } = typeof patternInfo === "string" ? { path: patternInfo } : patternInfo;

  const paramNames = [];

  let regexSource = path
    .replace(/[.+*?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\*/g, "(.*)")
    .replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^/]+)";
    });

  if (!regexSource.startsWith("/")) {
    regexSource = "/" + regexSource;
  }

  const regexString = `^${regexSource}${end ? "\\/?$" : "(?:\\/?|\\/.*)$"}`;
  const flags = caseSensitive ? "" : "i";
  const matcher = new RegExp(regexString, flags);

  const match = matcher.exec(pathname);
  if (!match) return null;

  const params = {};
  const capturedValues = match.slice(1);

  paramNames.forEach((name, index) => {
    params[name] = decodeURIComponent(capturedValues[index] || "");
  });

  if (path.includes("*") && capturedValues[paramNames.length]) {
    params["*"] = decodeURIComponent(capturedValues[paramNames.length]);
  }

  return {
    pathname,
    params,
    pattern: { path, caseSensitive, end },
  };
}
