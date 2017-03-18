'use strict';

/**
 * Loads a screepspl.us grafana agent into the client. This requires that you
 * load the authorization token as a string into Memory.screepsplusToken.
 *
 * NOTE: This is specifically for players that do not close their clients or
 *   do not care about data being pushed while they are not online. It will
 *   *only* work while a client is open.
 *
 * Author: SemperRabbit (special thanks to ags131 for assisting)
 */

global.runAgent = function () {
  Memory.screepsplusToken = config.stats.screepsplusToken;
  var output = '<SCRIPT>\n  if(!document.pushStats){\n    document.pushStats = function(){\n      let el = angular.element($(\'body\'));\n      let conn = el.injector().get(\'Connection\');\n      Promise.all([\n        conn.getMemoryByPath(\'\',\'screepsplusToken\'),\n        conn.getMemoryByPath(\'\',\'stats\'),\n      ]).then(function(data){\n        let [token, stats] = data;\n        let xhr=new XMLHttpRequest();\n        xhr.open(\'POST\', \'https://screepspl.us/api/stats/submit\', true);\n        xhr.setRequestHeader(\'Authorization\',\'JWT \' + token);\n        xhr.setRequestHeader(\'Content-Type\', \'application/json;charset=UTF-8\');\n        xhr.onreadystatechange=function(){if(xhr.readyState===XMLHttpRequest.DONE&&xhr.status===200){console.log(\'resp\',xhr.responseText);}};\n        xhr.send(JSON.stringify(stats));\n      }).catch(function(){});\n    };\n    document.pushStats();\n    setInterval(document.pushStats, 15000);\n  }\n  </SCRIPT>';

  var _a = output.split('\n');

  var _f = function _f(s) {
    return s.trim();
  };

  var _r = [];

  for (var _i = 0; _i < _a.length; _i++) {
    _r.push(_f(_a[_i], _i, _a));
  }

  console.log(_r.join(''));
};
if (config.stats.enabled && config.stats.screepsplusToken) {
  runAgent();
}