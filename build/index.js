var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// <stdin>
__markAsModule(exports);
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = import_server.default.renderToString(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: __objSpread(__objSpread({}, Object.fromEntries(responseHeaders)), {
      "Content-Type": "text/html"
    })
  });
}

// route-module:/home/cchild/repos/very-short/app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
var import_remix2 = __toModule(require("remix"));
var import_react_router_dom = __toModule(require("react-router-dom"));

// app/styles/global.css
var global_default = "/build/_assets/global-GA5HWB4K.css";

// route-module:/home/cchild/repos/very-short/app/root.tsx
var links = () => {
  return [{rel: "stylesheet", href: global_default}];
};
function Document({children}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  }), /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "bg-yellow-200"
  }, children, /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)));
}
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null));
}
function ErrorBoundary({error}) {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message), /* @__PURE__ */ React.createElement("p", null, "Replace this UI with what you want users to see when your app throws uncaught errors."));
}

// route-module:/home/cchild/repos/very-short/app/routes/components/button.tsx
var button_exports = {};
__export(button_exports, {
  default: () => button_default
});
var Button = ({onClick, type, children}) => {
  return /* @__PURE__ */ React.createElement("button", {
    type,
    className: "p-4 pl-6 pr-6 bg-green-400",
    onClick: () => {
      onClick && onClick();
    }
  }, children);
};
var button_default = Button;

// route-module:/home/cchild/repos/very-short/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  links: () => links2,
  meta: () => meta
});

// app/styles/index.css
var styles_default = "/build/_assets/index-VITU2XOT.css";

// route-module:/home/cchild/repos/very-short/app/routes/index.tsx
var import_react_router_dom2 = __toModule(require("react-router-dom"));
var meta = () => {
  return {
    title: "vry.sh - your simple URL shortener",
    description: "Welcome to vry.sh, the simple URL shortener"
  };
};
var links2 = () => {
  return [{rel: "stylesheet", href: styles_default}];
};
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "container grid gap-4 mt-4 justify-items-center"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "text-2xl"
  }, "Very Short"), /* @__PURE__ */ React.createElement("p", null, "Shorten any URL in one simple step..."), /* @__PURE__ */ React.createElement(import_react_router_dom2.Outlet, null), /* @__PURE__ */ React.createElement("footer", {
    className: "container flex justify-center p-4"
  }, /* @__PURE__ */ React.createElement("p", null, "source available on", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://gtihub/03c/very-short",
    target: "_blank"
  }, "GitHub"), " ", "| terms")));
}

// route-module:/home/cchild/repos/very-short/app/routes/index/result.tsx
var result_exports = {};
__export(result_exports, {
  default: () => Index2,
  loader: () => loader
});
var import_react_router_dom3 = __toModule(require("react-router-dom"));
var import_remix4 = __toModule(require("remix"));

// app/session.ts
var import_remix3 = __toModule(require("remix"));
var {getSession, commitSession, destroySession} = (0, import_remix3.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.DOMAIN || "vry.sh",
    expires: new Date(Date.now() + 60),
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET || "devsecret"],
    secure: true
  }
});

// app/routes/components/button.tsx
var Button2 = ({onClick, type, children}) => {
  return /* @__PURE__ */ React.createElement("button", {
    type,
    className: "p-4 pl-6 pr-6 bg-green-400",
    onClick: () => {
      onClick && onClick();
    }
  }, children);
};
var button_default2 = Button2;

// route-module:/home/cchild/repos/very-short/app/routes/index/result.tsx
var loader = async ({request}) => {
  let session = await getSession(request.headers.get("Cookie"));
  let url = session.get("url") || null;
  if (url === null) {
    return (0, import_remix4.redirect)("/");
  }
  return (0, import_remix4.json)({url}, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function Index2() {
  let {url} = (0, import_remix4.useRouteData)();
  let navigate = (0, import_react_router_dom3.useNavigate)();
  const goBack = () => {
    navigate("/");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "m-4 p-4 flex justify-center bg-blue-200"
  }, "Your new Very Short URL is:\xA0", /* @__PURE__ */ React.createElement("a", {
    href: url,
    target: "_blank"
  }, url)), /* @__PURE__ */ React.createElement(button_default2, {
    type: "button",
    onClick: goBack
  }, "Another?"));
}

// route-module:/home/cchild/repos/very-short/app/routes/index/$hash.tsx
var hash_exports = {};
__export(hash_exports, {
  default: () => Index3,
  loader: () => loader2
});
var import_remix5 = __toModule(require("remix"));
var import_hashids = __toModule(require("hashids"));

// app/database.ts
var import_supabase_js = __toModule(require("@supabase/supabase-js"));
var Database = (0, import_supabase_js.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");
var database_default = Database;

// route-module:/home/cchild/repos/very-short/app/routes/index/$hash.tsx
var loader2 = async ({params}) => {
  const hash = params.hash;
  const hasher = new import_hashids.default(process.env.HASH_SALT || "devsalt", parseInt(process.env.HASH_LENGTH || "5", 10));
  let id = hasher.decode(hash);
  const {data, error} = await database_default.from("urls").select("redirect_to").eq("id", id);
  return (0, import_remix5.redirect)(data && data[0]["redirect_to"]);
};
function Index3() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}

// route-module:/home/cchild/repos/very-short/app/routes/index/index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action,
  default: () => Index4,
  loader: () => loader3
});
var import_remix6 = __toModule(require("remix"));
var import_hashids2 = __toModule(require("hashids"));
var yup = __toModule(require("yup"));
var loader3 = async ({request}) => {
  let session = await getSession(request.headers.get("Cookie"));
  let error = session.get("error") || null;
  return (0, import_remix6.json)({error}, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
var action = async ({request}) => {
  let session = await getSession(request.headers.get("Cookie"));
  let body = new URLSearchParams(await request.text());
  let schema = yup.object().shape({
    url: yup.string().url().required()
  });
  const isValid = await schema.isValid(body);
  if (!isValid) {
    session.flash("error", `Please enter a valid URL`);
    return (0, import_remix6.redirect)("/", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  let url = body.get("url");
  const {data, error} = await database_default.from("urls").insert([
    {redirect_to: url}
  ]);
  const hasher = new import_hashids2.default(process.env.HASH_SALT || "devsalt", parseInt(process.env.HASH_LENGTH || "5", 10));
  let hash = hasher.encode(data && data[0]["id"]);
  session.flash("url", `https://${process.env.DOMAIN}/${hash}`);
  return (0, import_remix6.redirect)("/result", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function Index4() {
  let {error} = (0, import_remix6.useRouteData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_remix6.Form, {
    method: "post",
    className: "w-1/2"
  }, error && /* @__PURE__ */ React.createElement("div", {
    className: "bg-red-300 w-full flex justify-center p-4 mt-4 mb-4"
  }, error), /* @__PURE__ */ React.createElement("div", {
    className: "w-full flex justify-center"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "url",
    placeholder: "Shorten your long URL",
    className: "p-4 w-full"
  }), /* @__PURE__ */ React.createElement(button_default2, {
    type: "submit"
  }, "Shorten"))));
}

// route-module:/home/cchild/repos/very-short/app/routes/404.tsx
var __exports = {};
__export(__exports, {
  default: () => FourOhFour,
  meta: () => meta2
});
var meta2 = () => {
  return {title: "Ain't nothing here"};
};
function FourOhFour() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "404"));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = {module: entry_server_exports};
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "/",
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/components/button": {
    id: "routes/components/button",
    parentId: "root",
    path: "components/button",
    caseSensitive: false,
    module: button_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "/",
    caseSensitive: false,
    module: routes_exports
  },
  "routes/index/result": {
    id: "routes/index/result",
    parentId: "routes/index",
    path: "result",
    caseSensitive: false,
    module: result_exports
  },
  "routes/index/$hash": {
    id: "routes/index/$hash",
    parentId: "routes/index",
    path: ":hash",
    caseSensitive: false,
    module: hash_exports
  },
  "routes/index/index": {
    id: "routes/index/index",
    parentId: "routes/index",
    path: "/",
    caseSensitive: false,
    module: index_exports
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "*",
    caseSensitive: false,
    module: __exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
