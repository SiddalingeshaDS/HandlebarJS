var Handlebars = require("handlebars/runtime");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand\" href=\"#\">Project name</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n          <ul class=\"nav navbar-nav\">\r\n            <li class=\"active\"><a href=\"#\">Home</a></li>\r\n            <li><a href=\"#about\">About</a></li>\r\n            <li><a href=\"#contact\">Contact</a></li>\r\n            <li class=\"dropdown\">\r\n              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\r\n              <ul class=\"dropdown-menu\">\r\n                <li><a href=\"#\">Action</a></li>\r\n                <li><a href=\"#\">Another action</a></li>\r\n                <li><a href=\"#\">Something else here</a></li>\r\n                <li role=\"separator\" class=\"divider\"></li>\r\n                <li class=\"dropdown-header\">Nav header</li>\r\n                <li><a href=\"#\">Separated link</a></li>\r\n                <li><a href=\"#\">One more separated link</a></li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li><a href=\"../navbar/\">Default</a></li>\r\n            <li class=\"active\"><a href=\"./\">Static top <span class=\"sr-only\">(current)</span></a></li>\r\n            <li><a href=\"../navbar-fixed-top/\">Fixed top</a></li>\r\n          </ul>\r\n        </div><!--/.nav-collapse -->\r\n      </div>\r\n    </nav>";
},"useData":true});