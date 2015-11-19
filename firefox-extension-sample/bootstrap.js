/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
var domains = [
  // Prod
  "expert.bigsmall.io",
  "dashboard.bigsmall.io",
  // Stage
  "expert-stage.bigsmall.io",
  "dashboard-stage.bigsmall.io",
  // Dev
  "expert-dev.bigsmall.io",
  "dashboard-dev.bigsmall.io",
];
var addon_domains = []; // list of domains the addon added
var PREF = "media.getusermedia.screensharing.allowed_domains";

function startup(data, reason) {
    if (reason === APP_STARTUP) {
        return;
    }
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(PREF).split(',');
    domains.forEach(function (domain) {
        if (values.indexOf(domain) === -1) {
            values.push(domain);
            addon_domains.push(domain);
        }
    });
    prefs.setCharPref(PREF, values.join(','));

    var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
    var cookieSvc = Components.classes["@mozilla.org/cookieService;1"].getService(Components.interfaces.nsICookieService);

    domains.forEach(function (domain) {
      var cookieUri = ios.newURI("http://" + domain + "/", null, null);
      cookieSvc.setCookieString(cookieUri, null, "firefoxScreenSharing=ready;", null);
    });
}

function setCookies(domains, state) {
  var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
  var cookieSvc = Components.classes["@mozilla.org/cookieService;1"].getService(Components.interfaces.nsICookieService);

  domains.forEach(function (domain) {
    var cookieUri = ios.newURI("http://" + domain + "/", null, null);
    cookieSvc.setCookieString(cookieUri, null, "firefoxScreenSharing=" + state + ";", null);
  });
}

function shutdown(data, reason) {
    if (reason === APP_SHUTDOWN) {
        return;
    }

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(PREF).split(',');
    values = values.filter(function (value) {
        return addon_domains.indexOf(value) === -1;
    });
    prefs.setCharPref(PREF, values.join(','));

    setCookies(domains, "ready");
}

function install(data, reason) {
  setCookies(domains, "ready");
}

function uninstall(data, reason) {
  setCookies(domains, "notReady");

}
