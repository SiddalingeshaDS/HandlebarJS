var Handlebars = require("handlebars/runtime");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<section id=\"hero-slider\">\r\n"
    + ((stack1 = ((helper = (helper = helpers.slider || (depth0 != null ? depth0.slider : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"slider","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</section>\r\n<section id=\"featured-list\">\r\n"
    + ((stack1 = ((helper = (helper = helpers.featured || (depth0 != null ? depth0.featured : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"featured","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</section>\r\n<section id=\"info-slider\">\r\n"
    + ((stack1 = ((helper = (helper = helpers.infoSlider || (depth0 != null ? depth0.infoSlider : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"infoSlider","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</section>\r\n<section id=\"contact\">\r\n"
    + ((stack1 = ((helper = (helper = helpers.contact || (depth0 != null ? depth0.contact : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contact","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</section>\r\n";
},"useData":true});