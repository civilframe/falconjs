(function(){var t,e,n,i,r,o,l,s,a,c,u,p,_,h,d,f,m,v,b,g,y,w,O,k,F,x,j,T=[].slice,E={}.hasOwnProperty,S=function(t,e){function n(){this.constructor=t}for(var i in e)E.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};h=function(t){return null!=t&&"[object Object]"===Object.prototype.toString.call(t)},u=function(t){return null!=t&&"[object Function]"===Object.prototype.toString.call(t)},a=function(t){return null!=t&&"[object Boolean]"===Object.prototype.toString.call(t)},s=function(t){return null!=t&&"[object Array]"===Object.prototype.toString.call(t)},d=function(t){return null!=t&&"[object String]"===Object.prototype.toString.call(t)},_=function(t){return null!=t&&"[object Number]"===Object.prototype.toString.call(t)},p=function(t){return _(t)&&t!==t},c=function(t){var e,n;if(h(t)){for(e in t)return n=t[e],!1;return!0}return d(t)||s(t)?0===t.length:null===t||void 0===t?!0:!1},b=function(t){return t.replace(/^\s+/,"").replace(/\s+$/,"")},v=function(t,e){return 0===t.indexOf(e)},m=function(t){var e,n;n=[];for(e in t)n.push(e);return n},o=function(t,e){var n,i;null==t&&(t={}),h(e)||(e={});for(n in e)i=e[n],t[n]=i;return t},l=function(t,e){var n,i;for(n in t)if(i=t[n],i===e)return n;return void 0},r=function(t){var e,n,i;if(!h(t))return t;if(t instanceof Date)return new Date(t.getTime());if(t instanceof RegExp)return e="",null!=t.global&&(e+="g"),null!=t.ignoreCase&&(e+="i"),null!=t.multiline&&(e+="m"),null!=t.sticky&&(e+="y"),RegExp(t.source,e);i=new t.constructor;for(n in t)i[n]=r(t[n]);return i},i=function(t){var e,n,i,r,o;for(n={},r=0,o=t.length;o>r;r++)e=t[r],n[e]=!0;return function(){var t;t=[];for(e in n)i=n[e],t.push(e);return t}()},n=function(t,e){var n,i,r,o;if(!s(t))return[];for(s(e)||(e=[e]),i=0,o=e.length;o>i;i++)n=e[i],t=function(){var e,i,o;for(o=[],e=0,i=t.length;i>e;e++)r=t[e],r!==n&&o.push(r);return o}();return t},this.Falcon=e={version:"0.7.1",applicationElement:"body",baseApiUrl:"",baseTemplateUrl:"",cache:!0,apply:function(t,n,i){var r,o;u(n)&&(r=[i,n],n=r[0],i=r[1]),d(n)||(n=""),n=b(n),c(n)&&(n=null!=(o=e.applicationElement)?o:"body"),u(i)||(i=function(){}),document.createElement("template"),$(function(){var r;return $("template").each(function(t,n){var i;return n=$(n),i=n.attr("id"),null!=i&&e.View.cacheTemplate("#"+i,n.html()),n.remove()}),r=$(n),r.attr("data-bind","view: $data"),ko.applyBindings(ko.observable(t),r[0]),i()})},isModel:function(t){return null!=t&&t instanceof e.Model},isCollection:function(t){return null!=t&&t instanceof e.Collection},isView:function(t){return null!=t&&t instanceof e.View},isDataObject:function(t){return null!=t&&(t instanceof e.Model||t instanceof e.Collection)},isFalconObject:function(t){return null!=t&&t instanceof e.Object},addBinding:function(t,e,n){var i;return a(e)&&(i=[n,e],e=i[0],n=i[1]),n&&(ko.virtualElements.allowedBindings[t]=!0),u(e)&&(e={update:e}),ko.bindingHandlers[t]=e}},e.Object=function(){function t(){var t,n,i,o,l;if(this.__falcon_object__events__={},this.__falcon_object__cid__=e++,h(this.defaults)){i=this.defaults;for(t in i)n=i[t],this[t]=u(n)?n.apply(this,arguments):h(n)?r(n):n}if(h(this.observables)){o=this.observables;for(t in o)n=o[t],this[t]=u(n)?ko.computed({read:n,owner:this}):h(n)&&("read"in n||"write"in n)?ko.computed({read:n.read,write:n.write,owner:null!=(l=n.owner)?l:this}):s(n)?ko.observableArray(n.slice(0)):ko.observable(n)}}var e;return e=0,t.prototype.observables=null,t.prototype.defaults=null,t.extend=function(t,e){var n,i,r,o,l;o=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return o.apply(this,arguments)};for(r in o)l=o[r],i[r]=l;for(r in e)l=e[r],i[r]=l;n=function(){this.constructor=i},n.prototype=o.prototype,i.prototype=new n;for(r in t)l=t[r],i.prototype[r]=l;return i.__super__=o.prototype,i},t.prototype.__falcon_object__events__=null,t.prototype.__falcon_object__cid__=null,t.prototype.on=function(t,e,n){var i,r;return d(t)&&u(e)?(null==n&&(n=this),t=b(t).toLowerCase(),c(t)?this:((null!=(r=(i=this.__falcon_object__events__)[t])?r:i[t]=[]).push({callback:e,context:n}),this)):this},t.prototype.off=function(t,e){var n;return d(t)?(t=b(t).toLowerCase(),c(t)||null==this.__falcon_object__events__[t]?this:(u(e)?(this.__falcon_object__events__[t]=function(){var i,r,o,l;for(o=this.__falcon_object__events__[t],l=[],i=0,r=o.length;r>i;i++)n=o[i],n.callback!==e&&l.push(n);return l}.call(this),0>=this.__falcon_object__events__[t].length&&(this.__falcon_object__events__[t]=null)):this.__falcon_object__events__[t]=null,this)):this},t.prototype.has=function(t,e){var n,i,r,o;if(!d(t))return!1;if(t=b(t).toLowerCase(),c(t)||null==this.__falcon_object__events__[t])return!1;if(null!=this.__falcon_object__events__[t]&&!u(e))return!0;for(o=this.__falcon_object__events__[t],i=0,r=o.length;r>i;i++)if(n=o[i],n.callback===e)return!0;return!1},t.prototype.trigger=function(){var t,e,n,i,r,o;if(e=arguments[0],t=arguments.length>=2?T.call(arguments,1):[],!d(e))return this;if(e=b(e).toLowerCase(),c(e)||null==this.__falcon_object__events__[e])return this;for(o=this.__falcon_object__events__[e],i=0,r=o.length;r>i;i++)n=o[i],n.callback.apply(n.context,t);return this},t}(),e.Model=function(t){function n(t,i){var r,o;return n.__super__.constructor.apply(this,arguments),t=ko.utils.unwrapObservable(t),i=ko.utils.unwrapObservable(i),null!=i&&!e.isModel(i)&&e.isModel(t)&&(r=[t,i],i=r[0],t=r[1]),null==i&&e.isModel(t)&&(o=[t,i],i=o[0],t=o[1]),e.isModel(t)&&(t=t.unwrap()),this.parent=i,this.initialize(t),c(t)||this.fill(t),this}return S(n,t),n.extend=e.Object.extend,n.prototype.id=null,n.prototype.url=null,n.prototype.parent=null,n.prototype.initialize=function(){},n.prototype.get=function(t){return d(t)?ko.utils.unwrapObservable(this[t]):this.undefined},n.prototype.set=function(t,e){var n,i;if(h(t)){for(n in t)i=t[n],this.set(n,i);return this}return d(t)?(ko.isObservable(this[t])?this[t](e):this[t]=e,this):this},n.prototype.toggle=function(t){return this.set(t,!this.get(t))},n.prototype.parse=function(t){return t},n.prototype.fill=function(t){var n,i,r,o;if((_(t)||d(t))&&(t={id:t}),!h(t))return this;if(e.isModel(t)&&(t=t.unwrap()),c(t))return this;i={},o=e.Model.prototype;for(n in o)r=o[n],"id"!==n&&"url"!==n&&(i[n]=!0);for(n in t)r=t[n],i[n]||(r=ko.utils.unwrapObservable(r),e.isModel(this[n])?c(r)||this[n].fill(r):e.isCollection(this[n])?this[n].fill(r):ko.isWriteableObservable(this[n])?this[n](r):this[n]=r);return this},n.prototype.unwrap=function(){var t,n,i;n={};for(t in this)i=this[t],"id"!==t&&t in e.Model.prototype||(n[t]=e.isDataObject(i)?i.unwrap():i);return n},n.prototype.serialize=function(t){var n,i,r,o,l,a,c;if(r={},null==t?t=function(){var t;t=[];for(n in this)"id"!==n&&n in e.Model.prototype||t.push(n);return t}.call(this):d(t)&&(t=b(t).split(",")),s(t)){for(i={},a=0,c=t.length;c>a;a++)n=t[a],i[n]=null;t=i}if(!h(t))return r;for(n in t)o=t[n],l=this[n],e.isDataObject(l)?r[n]=l.serialize(o):ko.isObservable(l)?r[n]=ko.utils.unwrapObservable(l):u(l)||(r[n]=l);return r},n.prototype.makeUrl=function(t,n){var i,r,o,l,s,a;return a=u(this.url)?this.url():this.url,d(a)||(a=""),a=b(a),d(t)||(t=""),t=t.toUpperCase(),"GET"!==t&&"PUT"!==t&&"POST"!==t&&"DELETE"!==t&&(t="GET"),n=void 0!==n?n:this.parent,i="",s=a.lastIndexOf("."),s>-1&&(i=a.slice(s),a=a.slice(0,s)),v(a,"/")||(a="/"+a),e.isModel(n)?(l=n.makeUrl(),r=l.lastIndexOf("."),o=l.lastIndexOf("/"),r>o&&(r>-1&&(l=l.slice(0,r)),l=b(l)),a=""+l+a):d(e.baseApiUrl)&&(a=""+e.baseApiUrl+a),("GET"===t||"PUT"===t||"DELETE"===t)&&("/"!==a.slice(-1)&&(a+="/"),a+=ko.utils.unwrapObservable(this.id)),a=a.replace(/([^:])\/\/+/gi,"$1/"),""+a+i},n.prototype.validate=function(){return!0},n.prototype.sync=function(t,n,i){var r,o,l,p,_,f,m=this;return u(n)&&(n={complete:n}),d(n)&&(n={attributes:b(n).split(",")}),s(n)&&(n={attributes:n}),h(n)||(n={}),h(n.data)||(n.data=null),d(n.dataType)||(n.dataType="json"),d(n.contentType)||(n.contentType="application/json"),u(n.success)||(n.success=function(){}),u(n.complete)||(n.complete=function(){}),u(n.error)||(n.error=function(){}),e.isModel(n.parent)||null===n.parent||(n.parent=this.parent),null==n.attributes&&(n.attributes=null),h(n.params)||(n.params={}),a(n.fill)||(n.fill=!0),h(n.headers)||(n.headers={}),t=b(d(t)?t.toUpperCase():"GET"),"GET"!==t&&"POST"!==t&&"PUT"!==t&&"DELETE"!==t&&(t="GET"),n.type=t,"PUT"!==t&&"POST"!==t||this.validate(n)?(null!==n.data||"POST"!==t&&"PUT"!==t||(n.data=this.serialize(n.attributes)),r=null===n.data?"":JSON.stringify(n.data),i=null!=(_=null!=i?i:n.context)?_:this,l=null!=(f=n.url)?f:this.makeUrl(t,n.parent),c(n.params)||(l.indexOf("?")>-1||(l+="?"),l+=function(){var t,e;t=n.params,e=[];for(o in t)p=t[o],e.push(""+o+"="+p);return e}().join("&")),$.ajax({type:t,url:l,data:r,dataType:n.dataType,contentType:n.contentType,cache:e.cache,headers:n.headers,success:function(e,r,o){var l;switch(d(e)&&(e=JSON.parse(e)),null==e&&d(o.responseText)&&(e=JSON.parse(o.responseText)),null==e&&(e={}),l=m.parse(e,n,o),n.fill&&m.fill(l,n),t){case"GET":m.trigger("fetch",l);break;case"POST":m.trigger("create",l);break;case"PUT":m.trigger("save",l);break;case"DELETE":m.trigger("destroy",l)}return n.success.call(i,m,e,r,o)},error:function(t){var e,r;r=t.responseText;try{d(r)&&(r=JSON.parse(r))}catch(o){e=o}return n.error.call(i,m,r,t)},complete:function(t,e){return n.complete.call(i,m,t,e)}})):void 0},n.prototype.fetch=function(t,e){return this.sync("GET",t,e)},n.prototype.create=function(t,e){return this.sync("POST",t,e)},n.prototype.save=function(t,e){return this.isNew()?this.create(t,e):this.sync("PUT",t,e)},n.prototype.destroy=function(t,e){return this.sync("DELETE",t,e)},n.prototype.equals=function(t){var n,i;return t=ko.utils.unwrapObservable(t),e.isModel(t)?(n=this.get("id"),i=t.get("id"),null!=n&&null!=i?t.get("id")===this.get("id"):t===this):_(t)||d(t)?t===this.get("id"):!1},n.prototype.mixin=function(t){var n,i,r,o,l=this;h(t)||(t={});for(n in t)i=t[n],e.isDataObject(this[n])?this[n].mixin(i):ko.isObservable(i)?this[n]=ko.observable(null!=(r=this[n])?r:ko.utils.unwrapObservable(i)):u(i)?function(){var t;return t=i,l[n]=function(){var e;return e=arguments.length>=1?T.call(arguments,0):[],t.call.apply(t,[l,l].concat(T.call(e)))}}():null==(o=this[n])&&(this[n]=i);return this},n.prototype.clone=function(t,n){var i;return(null===t||e.isModel(t))&&(i=[void 0,t],t=i[0],n=i[1]),null===n||e.isModel(n)||(n=this.parent),new this.constructor(this.serialize(t),n)},n.prototype.isNew=function(){return null==this.get("id")},n}(e.Object),e.View=function(t){function n(){var t,r,o=this;return n.__super__.constructor.apply(this,arguments),t=this.makeUrl(),this._is_rendered=!1,this.is_loaded=ko.observable(!1),this.__falcon_view__child_views__=[],r=function(){return o.__falcon_view__loaded_url__=t,o.is_loaded(!0)},this.initialize.apply(this,arguments),c(t)||t in i?r():v(t,"#")?(e.View.cacheTemplate(t,$(t).html()),r()):$.ajax({url:t,type:"GET",cache:e.cache,error:function(){return console.log("[FALCON] Error Loading Template: '"+t+"'"),o.trigger("error")},success:function(n){return e.View.cacheTemplate(t,n),r()}}),this}var i;return S(n,t),i={},n.cacheTemplate=function(t,e){d(t)||(t=""),d(e)||(e=""),t=b(t),i[t]=e},n.resetCache=function(){i={}},n.extend=e.Object.extend,n.prototype.url=null,n.prototype.is_loaded=!1,n.prototype._is_rendered=!1,n.prototype.__falcon_view__child_views__=null,n.prototype.__falcon_view__loaded_url__=null,n.prototype.makeUrl=function(){var t;return t=ko.utils.unwrapObservable(this.url),u(t)&&(t=t()),d(t)||(t=""),t=b(t),"#"===t.charAt(0)?t:("/"!==t.charAt(0)&&(t="/"+t),d(e.baseTemplateUrl)&&(t=""+e.baseTemplateUrl+t),t=t.replace(/([^:])\/\/+/gi,"$1/"))},n.prototype.template=function(){var t;return ko.utils.unwrapObservable(this.is_loaded)?null!=(t=i[this.__falcon_view__loaded_url__])?t:"":""},n.prototype._render=function(){this._is_rendered||(this.display.apply(this,arguments),this._is_rendered=!0)},n.prototype._unrender=function(){var t,e,n,i;if(this._is_rendered){for(i=this.__falcon_view__child_views__,e=0,n=i.length;n>e;e++)t=i[e],t._unrender();this.__falcon_view__child_views__=[],this.dispose.apply(this,arguments),this._is_rendered=!1}},n.prototype._addChildView=function(t){return e.isView(t)?this.__falcon_view__child_views__.push(t):void 0},n.prototype.initialize=function(){},n.prototype.display=function(){},n.prototype.dispose=function(){},n.__falcon_view__viewModel__=null,n.prototype.viewModel=function(){var t,n,i,r=this;if(null!=this.__falcon_view__viewModel__)return this.__falcon_view__viewModel__;i={__falcon_view__addChildView__:function(t){return r._addChildView(t)}};for(t in this)n=this[t],t in e.View.prototype||(u(n)&&!ko.isObservable(n)&&(n=function(){var t;return t=n,function(){var e;return e=arguments.length>=1?T.call(arguments,0):[],t.call.apply(t,[r].concat(T.call(e)))}}()),i[t]=n);return this.__falcon_view__viewModel__=i},n}(e.Object),e.Collection=function(n){function i(t,n){var r,o,l;i.__super__.constructor.apply(this,arguments),t=ko.utils.unwrapObservable(t),n=ko.utils.unwrapObservable(n),null==n&&e.isModel(t)&&(r=[t,n],n=r[0],t=r[1]),e.isModel(t)&&s(n)&&(o=[t,n],n=o[0],t=o[1]),null!=this.model&&null==(l=this.url)&&(this.url=this.model.prototype.url),this.length=ko.observable(0),this.parent=n,this.__falcon_collection__mixins__=[],this.reset(),c(t)||this.fill(t),this.initialize(t)}var r;return S(i,n),i.extend=e.Object.extend,r=function(t){var n,i,r;return e.isModel(t)?(i=t,r=i.get("id"),null!=r?function(t){var n,r;return e.isModel(t)?(n=t.get("id"),r=i.get("id"),n===r):!1}:function(t){return e.isModel(t)?t===i:!1}):_(t)||d(t)?(n=t,function(t){return e.isModel(t)?t.get("id")===n:!1}):t},i.prototype.__falcon_collection__mixins__=null,i.prototype.__falcon_collection__change_count__=0,i.prototype.models=null,i.prototype.model=null,i.prototype.url=null,i.prototype.length=0,i.prototype.parent=null,i.prototype.comparator=null,i.prototype.initialize=function(){},i.prototype.parse=function(t){return t},i.prototype.fill=function(t,n){var i,o,l,a,p,_,f,m,v,b,g,y,w,O,k,F,x,j,T,E,S,M,C,U,V,A,D;if(null==this.model)return this;if(null==t&&(t=[]),e.isCollection(t)&&(t=t.models()),ko.isObservable(t)&&(t=ko.utils.unwrapObservable(t)),s(t)||(t=[t]),b=[],h(n)||(n={}),m=n.method,d(m)||(m=""),m=m.toLowerCase(),"replace"!==m&&"append"!==m&&"prepend"!==m&&"insert"!==m&&"merge"!==m&&(m="replace"),i=null!=(V=n.comparator)?V:this.comparator,"replace"!==m&&c(t))return[];for(this.__falcon_collection__change_count__++,l=y=0,F=t.length;F>y;l=++y)for(_=t[l],e.isModel(_)?_ instanceof this.model?(b[l]=t[l],null!=this.parent&&(b[l].parent=this.parent)):b[l]=new this.model(_.serialize(),this.parent):b[l]=new this.model(_,this.parent),A=this.__falcon_collection__mixins__,w=0,x=A.length;x>w;w++)f=A[w],b[l].mixin(f);if("replace"===m)U=b;else if("merge"===m)for(U=this.models(),O=0,j=b.length;j>O;O++){for(v=b[O],p=r(v),C=null,k=0,T=U.length;T>k;k++)if(_=U[k],p(_)){C=_;break}C?C.fill(v):U.push(v)}else if("prepend"===m)for(S=b.length-1,U=this.models(),l=M=0,E=b.length;E>M;l=++M)v=b[l],U.unshift(b[S-l]);else"append"===m?(U=this.models(),U=U.concat(b)):"insert"===m&&(a=null!=(D=n.insert_index)?D:-1,U=this.models(),0>a||a>=U.length?U=U.concat(b):(o=U.slice(0,a),g=U.slice(a),U=o.concat(b,g)));return u(i)&&U.sort(i),this.models(U),this.length(this.models().length),b},i.prototype.unwrap=function(){var t,n,i,r;n=[],r=this.models();for(t in r)i=r[t],n[t]=e.isDataObject(i)?i.unwrap():i;return n},i.prototype.serialize=function(t){var n,i,r,o;i=[],o=this.models();for(n in o)r=o[n],i[n]=e.isDataObject(r)?r.serialize(t):r;return i},i.prototype.makeUrl=function(t,n){var i,r,o,l;return l=u(this.url)?this.url():this.url,d(l)||(l=""),l=b(l),d(t)||(t=""),t=t.toUpperCase(),"GET"!==t&&"PUT"!==t&&"POST"!==t&&"DELETE"!==t&&(t="GET"),v(l,"/")||(l="/"+l),n=void 0===n?this.parent:n,e.isModel(n)?(o=n.makeUrl(),i=o.lastIndexOf("."),r=o.lastIndexOf("/"),i>r&&(i>-1&&(o=o.slice(0,i)),o=b(o)),l=""+o+l):d(e.baseApiUrl)&&(l=""+e.baseApiUrl+l),l=l.replace(/([^:])\/\/+/gi,"$1/").replace(/^\/\//gi,"/")},i.prototype.sync=function(t,n,i){var r,o,l,p,_,f,m=this;return u(n)&&(n={complete:n}),d(n)&&(n={attributes:b(n).split(",")}),s(n)&&(n={attributes:n}),h(n)||(n={}),h(n.data)||(n.data=null),d(n.dataType)||(n.dataType="json"),d(n.contentType)||(n.contentType="application/json"),u(n.success)||(n.success=function(){}),u(n.complete)||(n.complete=function(){}),u(n.error)||(n.error=function(){}),e.isModel(n.parent)||null===n.parent||(n.parent=this.parent),null==n.attributes&&(n.attributes=null),h(n.params)||(n.params={}),a(n.fill)||(n.fill=!0),h(n.headers)||(n.headers={}),t=b(d(t)?t.toUpperCase():"GET"),"GET"!==t&&"POST"!==t&&"PUT"!==t&&"DELETE"!==t&&(t="GET"),r=null===n.data?"":JSON.stringify(n.data),i=null!=(_=null!=i?i:n.context)?_:this,l=null!=(f=n.url)?f:b(this.makeUrl(t,n.parent)),c(n.params)||(l.indexOf("?")>-1||(l+="?"),l+=function(){var t,e;t=n.params,e=[];for(o in t)p=t[o],e.push(""+o+"="+p);return e}().join("&")),$.ajax({url:l,type:t,data:r,dataType:n.dataType,contentType:n.contentType,cache:e.cache,headers:n.headers,success:function(e,r,o){var l;return d(e)&&(e=JSON.parse(e)),null==e&&d(o.responseText)&&(e=JSON.parse(o.responseText)),null==e&&(e=[]),l=m.parse(e,n,o),"GET"===t&&(n.fill&&m.fill(l,n),m.trigger("fetch",l)),n.success.call(i,m,e,r,o)},error:function(t){var e,r;r=t.responseText;try{d(r)&&(r=JSON.parse(r))}catch(o){e=o}return n.error.call(i,m,r,t)},complete:function(t,e){return n.complete.call(i,m,t,e)}})},i.prototype.fetch=function(t,e){return this.sync("GET",t,e)},i.prototype.create=function(t,n,i){var r,o=this;return null!=this.model?(e.isModel(t)&&(t=t.unwrap()),h(t)||(t={}),u(n)&&(n={success:n}),h(n)||(n={}),u(n.success)||(n.success=function(){}),d(n.method)||(n.method="append"),r=n.success,n.success=function(t){var e,i;return e=o.fill(t,n),r.apply(null!=(i=e[0])?i:t,arguments)},new this.model(t,this.parent).create(n,i)):void 0},i.prototype.destroy=function(t,n,i){var r,o=this;return null==this.model?null:(t=this.first(ko.utils.unwrapObservable(t)),e.isModel(t)?(u(n)&&(n={success:n}),h(n)||(n={}),u(n.success)||(n.success=function(){}),void 0===n.parent&&(n.parent=this.parent),r=n.success,n.success=function(t){return o.remove(t),r.apply(t,arguments)},t.destroy(n,i)):null)},i.prototype.remove=function(t){var n;return t=ko.utils.unwrapObservable(t),e.isCollection(t)&&(t=t.models()),this.__falcon_collection__change_count__++,n=s(t)?this.models.removeAll(t):this.models.remove(r(t)),c(n)||this.length(this.models().length),this},i.prototype.append=function(t){return this.fill(t,{method:"append"})},i.prototype.prepend=function(t){return this.fill(t,{method:"prepend"})},i.prototype.insert=function(t,e){var n,i;return i=r(e),u(i)?(n=this.indexOf(e),this.fill(t,{method:"insert",insert_index:n})):this.fill(t,{method:"append"})},i.prototype.unshift=function(){return this.prepend.apply(this,arguments)},i.prototype.shift=function(){var t;return t=this.models.shift(),this.length(this.models().length),t},i.prototype.push=function(){return this.append.apply(this,arguments)},i.prototype.pop=function(){var t;return this.__falcon_collection__change_count__++,t=this.models.pop(),this.length(this.models().length),t},i.prototype.sort=function(t){return u(t)?this.models.sort(t):models},i.prototype.at=function(t){var e;return t=parseInt(t),p(t)?null:(e=this.models(),0>t||t>=e.length?null:e[t])},i.prototype.indexOf=function(t){var n,i,o,l,s;if(e.isModel(t))return this.models.indexOf(t);if(i=r(t),!u(i))return-1;for(s=this.models(),n=o=0,l=s.length;l>o;n=++o)if(t=s[n],i(t))return n;return-1},i.prototype.lastIndexOf=function(t){var e,n,i,o,l,s,a;if(i=r(t),!u(i))return-1;for(l=this.models(),o=l.length,e=s=0,a=l.length;a>s;e=++s)if(t=l[e],n=o-e-1,i(l[n]))return n;return-1},i.prototype.each=function(t,e){var n,i,r,o,l,s,a,c;if(!u(t))return this;if(null==e&&(e=this),1===t.length)for(a=this.models(),r=0,l=a.length;l>r;r++)i=a[r],t.call(e,i);else for(c=this.models(),n=o=0,s=c.length;s>o;n=++o)i=c[n],t.call(e,n,i);return this},i.prototype.first=function(t){var e,n,i,o;for(t=r(t),u(t)||(t=function(){return!0}),o=this.models(),n=0,i=o.length;i>n;n++)if(e=o[n],t(e))return e;return null},i.prototype.last=function(t){var e,n,i,o,l,s;for(t=r(t),u(t)||(t=function(){return!0}),o=this.models(),i=o.length,e=l=0,s=o.length;s>l;e=++l)if(n=o[e],n=o[i-e-1],t(n))return n;return null},i.prototype.filter=function(t){var e;return t=r(t),u(t)?function(){var n,i,r,o;for(r=this.models(),o=[],n=0,i=r.length;i>n;n++)e=r[n],t(e)&&o.push(e);return o}.call(this):this.models()},i.prototype.any=function(t){var e,n,i,o;if(t=r(t),!u(t))return!1;for(o=this.models(),n=0,i=o.length;i>n;n++)if(e=o[n],t(e))return!0;return!1},i.prototype.without=function(t){var e;return t=r(t),u(t)?function(){var n,i,r,o;for(r=this.models(),o=[],n=0,i=r.length;i>n;n++)e=r[n],t(e)||o.push(e);return o}.call(this):this.models()},i.prototype.pluck=function(t,e){var n,i,r,o,l;for(d(t)||(t=""),a(e)||(e=!0),r=[],i=this.models(),o=0,l=i.length;l>o;o++)n=i[o],null!=n?r.push(e?ko.utils.unwrapObservable(n[t]):n[t]):r.push(void 0);return r},i.prototype.slice=function(t,e){return this.models.slice(t,e)},i.prototype.chain=function(){var e;return e=new t,e.model=this.model,e.fill(this.models()),e},i.prototype.mixin=function(t){var n,i,r,o,l,s,a,c=this;h(t)||(t={}),a={};for(n in t)o=t[n],ko.isObservable(o)?a[n]=ko.observable(ko.utils.unwrapObservable(o)):u(o)?function(){var t;return t=o,a[n]=function(){var e;return e=arguments.length>=1?T.call(arguments,0):[],t.apply(e[0],[e[0],c].concat(e.slice(1)))},a[n].length=t.length}():a[n]=o;for(r=this.models(),l=0,s=r.length;s>l;l++)i=r[l],e.isDataObject(i)&&i.mixin(a);return this.__falcon_collection__mixins__.push(a),this},i.prototype.clone=function(t,n){var i;return(null===t||e.isModel(t))&&(i=[void 0,t],t=i[0],n=i[1]),null===n||e.isModel(n)||(n=this.parent),new this.constructor(this.serialize(t),n)},i.prototype.reset=function(){return this.__falcon_collection__change_count__++,null!=this.models?this.models([]):this.models=ko.observableArray([]),this.length(0),this},i}(e.Object),t=function(t){function e(){return k=e.__super__.constructor.apply(this,arguments)}return S(e,t),e.prototype.slice=function(){return this.models(e.__super__.slice.apply(this,arguments)),this},e.prototype.sort=function(){return this.models(e.__super__.sort.apply(this,arguments)),this},e.prototype.filter=function(){return this.models(e.__super__.filter.apply(this,arguments)),this},e.prototype.without=function(){return this.models(e.__super__.without.apply(this,arguments)),this},e}(e.Collection),ko.bindingHandlers.view=function(){var t,n,i,r;return i=function(t){return function(){return{data:t,templateEngine:ko.nativeTemplateEngine.instance}}},n=function(t){var n,i;return n={},null==t&&(t={}),n=t instanceof e.View?t.viewModel():ko.utils.unwrapObservable(null!=(i=t.viewModel)?i:{})},t=function(t){var n,i;return n="",null==t&&(t={}),n=t instanceof e.View?t.template():ko.utils.unwrapObservable(null!=(i=t.template)?i:"")},r={controlsDescendantBindings:!0},{init:function(t,o,l,s,a){var c,u,p,_;return _=o(),null!=_&&ko.isSubscribable(_)?(u=ko.utils.unwrapObservable(_),p=_.subscribe(function(t){return e.isView(u)&&u._unrender(),u=t}),ko.utils.domNodeDisposal.addDisposeCallback(t,function(){return e.isView(u)&&u._unrender(),p.dispose()})):e.isView(_)&&ko.utils.domNodeDisposal.addDisposeCallback(t,function(){return _._unrender()}),_=ko.utils.unwrapObservable(_),s=n(_),c=a.createChildContext(s),c.$view=s,ko.bindingHandlers.template.init(t,i(s),l,s,c),r},update:function(o,l,s,a,u){var p,_,d;return d=l(),d=ko.utils.unwrapObservable(d),a=n(d),_=t(d),window.prev_viewModel=window.current_viewModel,window.current_viewModel=a,h(d)?(p=u.createChildContext(a),p.$view=a,null!=("undefined"!=typeof parentViewContext&&null!==parentViewContext?parentViewContext.__falcon_view__addChildView__:void 0)&&parentViewContext.__falcon_view__addChildView__(d),c(a)||c(_)?$(o).empty():d instanceof e.View&&!ko.utils.unwrapObservable(d.is_loaded)||(o.innerHTML=_,ko.bindingHandlers.template.update(o,i(a),s,a,p),e.isView(d)&&d._render()),r):r}}}(),w=function(t){var n;return t=ko.utils.peekObservable(t),(e.isCollection(t)||s(t))&&(t={data:t}),h(t)||(t={}),t.data=ko.utils.unwrapObservable(t.data),e.isCollection(t.data)&&(t.data=t.data.models()),null==(n=t.data)&&(t.data=[]),function(){return t}},j=function(t,n){var i,r,o,l;return e.isCollection(n)?(o=ko.utils.domData.get(t,"__falcon_object__cid__"),i=n.__falcon_object__cid__,r=n.__falcon_collection__change_count__,l=ko.utils.domData.get(t,"__falcon_collection___change_count__"),l===r&&o===i?!1:(ko.utils.domData.set(t,"__falcon_object__cid__",i),ko.utils.domData.set(t,"__falcon_collection___change_count__",r),!0)):!0},y=null!=(F=ko.bindingHandlers.foreach)?F:{},ko.bindingHandlers.foreach={init:function(){var t,e,n,i;return e=arguments[0],i=arguments[1],t=arguments.length>=3?T.call(arguments,2):[],n=ko.utils.unwrapObservable(i()),ko.utils.domData.set(e,"__falcon_collection___change_count__",-1),y.init.apply(y,[e,w(n)].concat(T.call(t)))},update:function(){var t,e,n,i;return e=arguments[0],i=arguments[1],t=arguments.length>=3?T.call(arguments,2):[],n=ko.utils.unwrapObservable(i()),j(e,n)?y.update.apply(y,[e,w(n)].concat(T.call(t))):void 0}};for(f in y)g=y[f],f in ko.bindingHandlers.foreach||(ko.bindingHandlers.foreach[f]=g);O=null!=(x=ko.bindingHandlers.options)?x:function(){},ko.bindingHandlers.options=function(){return{init:function(){var t,e,n,i;return e=arguments[0],n=arguments[1],t=arguments.length>=3?T.call(arguments,2):[],g=ko.utils.unwrapObservable(n()),ko.utils.domData.set(e,"__falcon_collection___change_count__",-1),(null!=(i=O.init)?i:function(){}).apply(null,[e,w(g)].concat(T.call(t)))},update:function(){var t,e,n,i;return e=arguments[0],n=arguments[1],t=arguments.length>=3?T.call(arguments,2):[],g=ko.utils.unwrapObservable(n()),j(e,g)?(null!=(i=O.update)?i:function(){}).apply(null,[e,w(g)].concat(T.call(t))):void 0}}}(),ko.bindingHandlers.log={update:function(t,e){return console.log(ko.utils.unwrapObservable(e()))}},ko.virtualElements.allowedBindings.view=!0,ko.virtualElements.allowedBindings.log=!0}).call(this);