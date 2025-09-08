// Scooch
!function(t){if("function"==typeof define&&define.amd)define(["$"],t);else{var e=window.Mobify&&window.Mobify.$||window.Zepto||window.jQuery;t(e)}}(function($){var t=function($){var t={},e=navigator.userAgent,i=$.support=$.support||{};$.extend($.support,{touch:"ontouchend"in document}),t.events=i.touch?{down:"touchstart",move:"touchmove",up:"touchend"}:{down:"mousedown",move:"mousemove",up:"mouseup"},t.getCursorPosition=i.touch?function(t){return t=t.originalEvent||t,{x:t.touches[0].clientX,y:t.touches[0].clientY}}:function(t){return{x:t.clientX,y:t.clientY}},t.getProperty=function(t){for(var e=["Webkit","Moz","O","ms",""],i=document.createElement("div").style,n=0;n<e.length;++n)if(void 0!==i[e[n]+t])return e[n]+t},$.extend(i,{transform:!!t.getProperty("Transform"),transform3d:!(!(window.WebKitCSSMatrix&&"m11"in new WebKitCSSMatrix)||/android\s+[1-2]/i.test(e))});var n=t.getProperty("Transform");i.transform3d?t.translateX=function(t,e){"number"==typeof e&&(e+="px"),t.style[n]="translate3d("+e+",0,0)"}:i.transform?t.translateX=function(t,e){"number"==typeof e&&(e+="px"),t.style[n]="translate("+e+",0)"}:t.translateX=function(t,e){"number"==typeof e&&(e+="px"),t.style.left=e};var s=t.getProperty("Transition"),o=t.getProperty("TransitionDuration");return t.setTransitions=function(t,e){e?t.style[o]="":t.style[o]="0s"},t.requestAnimationFrame=function(){var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},e=function(){t.apply(window,arguments)};return e}(),t}($),e=function($,t){var e={dragRadius:10,moveRadius:20,animate:!0,autoHideArrows:!1,rightToLeft:!1,classPrefix:"m-",classNames:{outer:"scooch",inner:"scooch-inner",item:"item",center:"center",touch:"has-touch",dragging:"dragging",active:"active",inactive:"inactive",fluid:"fluid"}},i=$.support,n=function(t,e){this.setOptions(e),this.initElements(t),this.initOffsets(),this.initAnimation(),this.bind(),this._updateCallbacks=[]};return n.defaults=e,n.prototype.setOptions=function(t){var i=this.options||$.extend({},e,t);i.classNames=$.extend({},i.classNames,t.classNames||{}),this.options=i},n.prototype.initElements=function(t){this._index=1,this.element=t,this.$element=$(t),this.$inner=this.$element.find("."+this._getClass("inner")),this.$items=this.$inner.children(),this.$start=this.$items.eq(0),this.$sec=this.$items.eq(1),this.$current=this.$items.eq(this._index-1),this._length=this.$items.length,this._alignment=this.$element.hasClass(this._getClass("center"))?.5:0,this._isFluid=this.$element.hasClass(this._getClass("fluid"))},n.prototype.initOffsets=function(){this._offsetDrag=0},n.prototype.initAnimation=function(){this.animating=!1,this.dragging=!1,this._needsUpdate=!1,this._enableAnimation()},n.prototype._getClass=function(t){return this.options.classPrefix+this.options.classNames[t]},n.prototype._enableAnimation=function(){this.animating||(t.setTransitions(this.$inner[0],!0),this.$inner.removeClass(this._getClass("dragging")),this.animating=!0)},n.prototype._disableAnimation=function(){this.animating&&(t.setTransitions(this.$inner[0],!1),this.$inner.addClass(this._getClass("dragging")),this.animating=!1)},n.prototype.refresh=function(){this.$items=this.$inner.children("."+this._getClass("item")),this.$start=this.$items.eq(0),this.$sec=this.$items.eq(1),this._length=this.$items.length,this.update()},n.prototype.update=function(e){if("undefined"!=typeof e&&this._updateCallbacks.push(e),!this._needsUpdate){this._needsUpdate=!0;var i=this;t.requestAnimationFrame(function(){i._update(),setTimeout(function(){for(var t=0,e=i._updateCallbacks.length;e>t;t++)i._updateCallbacks[t].call(i);i._updateCallbacks=[]},10)})}},n.prototype._update=function(){if(this._needsUpdate){var e=this.$current,i=this.$start,n=e.prop("offsetLeft")+e.prop("clientWidth")*this._alignment,s=i.prop("offsetLeft")+i.prop("clientWidth")*this._alignment,o=Math.round(-(n-s)+this._offsetDrag);e.prop("offsetParent")&&t.translateX(this.$inner[0],o),this._needsUpdate=!1}},n.prototype.bind=function(){function e(e){i.touch||e.preventDefault(),r=!0,h=!1,l=t.getCursorPosition(e),u=0,c=0,m=!1,f._disableAnimation(),_=1==f._index,y=f._index==f._length}function n(e){if(r&&!h){var i=t.getCursorPosition(e),n=f.$element.width();u=l.x-i.x,c=l.y-i.y,m||a(u)>a(c)&&a(u)>d?(m=!0,e.preventDefault(),_&&0>u?u=u*-n/(u-n):y&&u>0&&(u=u*n/(u+n)),f._offsetDrag=-u,f.update()):a(c)>a(u)&&a(c)>d&&(h=!0)}}function s(t){r&&(r=!1,f._enableAnimation(),!h&&a(u)>v.moveRadius?v.rightToLeft?0>u?f.next():f.prev():u>0?f.next():f.prev():(f._offsetDrag=0,f.update()))}function o(t){m&&t.preventDefault()}var a=Math.abs,r=!1,h=!1,d=this.options.dragRadius,l,u,c,m,f=this,p=this.$element,g=this.$inner,v=this.options,_=!1,y=!1,w=$(window).width();g.on(t.events.down+".scooch",e).on(t.events.move+".scooch",n).on(t.events.up+".scooch",s).on("click.scooch",o).on("mouseout.scooch",s),p.on("click","[data-m-slide]",function(t){t.preventDefault();var e=$(this).attr("data-m-slide"),i=parseInt(e,10);isNaN(i)?f[e]():f.move(i)}),p.on("afterSlide",function(t,e,i){f.$items.eq(e-1).removeClass(f._getClass("active")),f.$items.eq(i-1).addClass(f._getClass("active")),f.$element.find("[data-m-slide='"+e+"']").removeClass(f._getClass("active")),f.$element.find("[data-m-slide='"+i+"']").addClass(f._getClass("active")),v.autoHideArrows&&(f.$element.find("[data-m-slide=prev]").removeClass(f._getClass("inactive")),f.$element.find("[data-m-slide=next]").removeClass(f._getClass("inactive")),1===i&&f.$element.find("[data-m-slide=prev]").addClass(f._getClass("inactive")),i===f._length&&f.$element.find("[data-m-slide=next]").addClass(f._getClass("inactive")))}),$(window).on("resize orientationchange",function(t){w!=$(window).width()&&(f._disableAnimation(),w=$(window).width(),f.update())}),p.trigger("beforeSlide",[1,1]),p.trigger("afterSlide",[1,1]),f.update()},n.prototype.unbind=function(){this.$inner.off()},n.prototype.destroy=function(){this.unbind(),this.$element.trigger("destroy"),this.$element.remove(),this.$element=null,this.$inner=null,this.$start=null,this.$current=null},n.prototype.move=function(t,e){var i=this.$element,n=this.$inner,s=this.$items,o=this.$start,a=this.$current,r=this._length,h=this._index;e=$.extend({},this.options,e),1>t?t=1:t>this._length&&(t=r),t==this._index,e.animate?this._enableAnimation():this._disableAnimation(),i.trigger("beforeSlide",[h,t]),this.$current=a=s.eq(t-1),this._offsetDrag=0,this._index=t,e.animate?this.update():this.update(function(){this._enableAnimation()}),i.trigger("afterSlide",[h,t])},n.prototype.next=function(){this.move(this._index+1)},n.prototype.prev=function(){this.move(this._index-1)},n}($,t);$.fn.scooch=function(t,i){var n=$.extend({},$.fn.scooch.defaults);return"object"==typeof t&&($.extend(n,t,!0),i=null,t=null),i=Array.prototype.slice.apply(arguments),this.each(function(){var s=$(this),o=this._scooch;o||(o=new e(this,n)),t&&(o[t].apply(o,i.slice(1)),"destroy"===t&&(o=null)),this._scooch=o}),this},$.fn.scooch.defaults={}});

// Parallax
$(function(){ParallaxScroll.init()});var ParallaxScroll={showLogs:!1,round:1e3,init:function(){return this._log("init"),this._inited?(this._log("Already Inited"),void(this._inited=!0)):(this._requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,t){window.setTimeout(a,1e3/60)}}(),void this._onScroll(!0))},_inited:!1,_properties:["x","y","z","rotateX","rotateY","rotateZ","scaleX","scaleY","scaleZ","scale"],_requestAnimationFrame:null,_log:function(a){this.showLogs&&console.log("Parallax Scroll / "+a)},_onScroll:function(a){var t=$(document).scrollTop(),e=$(window).height();this._log("onScroll "+t),$("[data-parallax]").each($.proxy(function(i,o){var s=$(o),r=[],n=!1,l=s.data("style");void 0==l&&(l=s.attr("style")||"",s.data("style",l));var d=[s.data("parallax")],c;for(c=2;s.data("parallax"+c);c++)d.push(s.data("parallax-"+c));var v=d.length;for(c=0;v>c;c++){var m=d[c],u=m["from-scroll"];void 0==u&&(u=Math.max(0,$(o).offset().top-e)),u=0|u;var h=m.distance,p=m["to-scroll"];void 0==h&&void 0==p&&(h=e),h=Math.max(0|h,1);var w=m.easing,x=m["easing-return"];if(void 0!=w&&$.easing&&$.easing[w]||(w=null),void 0!=x&&$.easing&&$.easing[x]||(x=w),w){var g=m.duration;void 0==g&&(g=h),g=Math.max(0|g,1);var f=m["duration-return"];void 0==f&&(f=g),h=1;var _=s.data("current-time");void 0==_&&(_=0)}void 0==p&&(p=u+h),p=0|p;var y=m.smoothness;void 0==y&&(y=30),y=0|y,(a||0==y)&&(y=1),y=0|y;var A=t;A=Math.max(A,u),A=Math.min(A,p),w&&(void 0==s.data("sens")&&s.data("sens","back"),A>u&&("back"==s.data("sens")?(_=1,s.data("sens","go")):_++),p>A&&("go"==s.data("sens")?(_=1,s.data("sens","back")):_++),a&&(_=g),s.data("current-time",_)),this._properties.map($.proxy(function(a){var t=0,e=m[a];if(void 0!=e){"scale"==a||"scaleX"==a||"scaleY"==a||"scaleZ"==a?t=1:e=0|e;var i=s.data("_"+a);void 0==i&&(i=t);var o=(e-t)*((A-u)/(p-u))+t,l=i+(o-i)/y;if(w&&_>0&&g>=_){var d=t;"back"==s.data("sens")&&(d=e,e=-e,w=x,g=f),l=$.easing[w](null,_,d,e,g)}l=Math.ceil(l*this.round)/this.round,l==i&&o==e&&(l=e),r[a]||(r[a]=0),r[a]+=l,i!=r[a]&&(s.data("_"+a,r[a]),n=!0)}},this))}if(n){if(void 0!=r.z){var X=m.perspective;void 0==X&&(X=800);var Y=s.parent();Y.data("style")||Y.data("style",Y.attr("style")||""),Y.attr("style","perspective:"+X+"px; -webkit-perspective:"+X+"px; "+Y.data("style"))}void 0==r.scaleX&&(r.scaleX=1),void 0==r.scaleY&&(r.scaleY=1),void 0==r.scaleZ&&(r.scaleZ=1),void 0!=r.scale&&(r.scaleX*=r.scale,r.scaleY*=r.scale,r.scaleZ*=r.scale);var Z="translate3d("+(r.x?r.x:0)+"px, "+(r.y?r.y:0)+"px, "+(r.z?r.z:0)+"px)",q="rotateX("+(r.rotateX?r.rotateX:0)+"deg) rotateY("+(r.rotateY?r.rotateY:0)+"deg) rotateZ("+(r.rotateZ?r.rotateZ:0)+"deg)",F="scaleX("+r.scaleX+") scaleY("+r.scaleY+") scaleZ("+r.scaleZ+")",S=Z+" "+q+" "+F+";";this._log(S),s.attr("style","transform:"+S+" -webkit-transform:"+S+" "+l)}},this)),window.requestAnimationFrame?window.requestAnimationFrame($.proxy(this._onScroll,this,!1)):this._requestAnimationFrame($.proxy(this._onScroll,this,!1))}};

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

var init = {
	onReady() {
		init.pageLoad();
		init.arrow();
		init.menu();
		init.scooch();
		init.formSubmit();
		init.urlHash();
		init.photoScale();
		init.date();
	},
	date() {
		let date = new Date().getFullYear();
		jQuery('.fullYear').html(date);
	},
	pageLoad() {
		jQuery('html, body').animate({
		    scrollTop: jQuery('body').offset().top
		}, 500);
		setTimeout(
			function(){
				jQuery('#splash').addClass("in");
				jQuery('#loading').addClass("show");
			}, 500
		);
		setTimeout(
			function(){
				jQuery('header').addClass("show");
			}, 700
		);
		var aboutHeight = jQuery('#aboutContent').outerHeight();
		jQuery('#aboutImage').css('height', aboutHeight );
	},
	urlHash() {
		var target = window.location.hash;
		if(target) {
			setTimeout(
				function(){
					jQuery('html, body').animate({
			            scrollTop: jQuery(target).offset().top
			        }, 1000);
				}, 500
			);
		}
	},
	arrow() {
		jQuery('.scroll').click(function(e){
			e.preventDefault;
			var target = jQuery(this).attr("data-scroll");
			if(target === 'about') {
				jQuery('html, body').animate({
	                scrollTop: jQuery("#"+target).offset().top
	            }, 1000);
			} else {
				jQuery('html, body').animate({
	                scrollTop: jQuery("#"+target).offset().top
	            }, 1000);
			}
            if(isMobile) {
            	jQuery('header').removeClass("in");
            } else {
            	jQuery('.scroll').removeClass("active");
				jQuery(this).addClass("active");
            }
		})
	},
	menu() {
		jQuery('#menu').click(function(e){
			e.preventDefault;
			if(jQuery('header').hasClass("in")) {
				jQuery('.scroll').removeClass("active");
			}
			jQuery('header').toggleClass("in");
		});
	},
	scooch() {
		jQuery('.m-scooch').scooch();
		jQuery('.m-scooch-controls').click(function(){
			jQuery('.m-scooch').scooch().on("afterSlide", function(e, previousSlide, nextSlide) {
	        	if(nextSlide === 1) {
	        		jQuery('.m-scooch-photos').scooch('move', 1);
	        	}
	        	if(nextSlide === 2) {
	        		jQuery('.m-scooch-photos').scooch('move', 7);
	        	} 
	        	if(nextSlide === 3) {
	        		jQuery('.m-scooch-photos').scooch('move', 12);
	        	} 
	        	if(nextSlide === 4) {
	        		jQuery('.m-scooch-photos').scooch('move', 14);
	        	}
	        });
		});
    },
    formSubmit() {
		jQuery('#newsletterFrm').off("submit").on("submit", function(e) {
			e.preventDefault();

			var form = jQuery(this);
			var button = jQuery('.submit-btn');

			jQuery.ajax({
				type: "GET",
				url: "https://andersonpaak.us20.list-manage.com/subscribe/post-json?c=?",
				data: form.serialize(),
				dataType: "jsonp",
				error: function(err) {
					console.error(err);
				},
				success: function(data) {
					if (data.result !== "success") {
						button.html("").addClass("error");
						jQuery('.responseMessage').addClass("show").html(data.msg);
					} else {
						fbq('track', 'Lead');
						jQuery('input').val("");
						button.html("").addClass("success");
						jQuery('.responseMessage').addClass("show").html(data.msg);
					}
					setTimeout(function() {
						jQuery('.responseMessage').removeClass("show").html("");
						button.removeClass("error success").html("Keep In Touch");
					}, 3000);
				}
			});

			return false;
		});
	},
    photoScale() {
    	jQuery(".photo").click(function(){
    		var direction = jQuery(this).attr("data-scale");
    		var wrap = jQuery(this).parent();
    		if(wrap.hasClass("scale")) {
    			wrap.removeClass("scale");
    			setTimeout(
    				function(){
    					wrap.removeClass(direction);
    				}, 500
				);
    		} else {
    			wrap.addClass("scale " + direction);
    		}
    	});
    }
}

jQuery(document).ready(function() {
	init.onReady();
});