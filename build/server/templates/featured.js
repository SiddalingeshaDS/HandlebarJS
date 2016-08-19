var Handlebars = require("handlebars/runtime");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"container featured-list\">\r\n  "
    + ((stack1 = ((helper = (helper = helpers.tiles || (depth0 != null ? depth0.tiles : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"tiles","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true});