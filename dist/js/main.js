function createCookie(e,t,i){var o="";if(i){var r=new Date;r.setTime(r.getTime()+24*i*60*60*1e3),o="; expires="+r.toGMTString()}else o="";document.cookie=e+"="+t+o+"; path=/"}function readCookie(e){for(var t=e+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var r=i[o];" "==r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}!function(e){function t(){i(),e(window).on("load",function(){r()})}function i(){$burgerBtn.on("click",o)}function o(t){t.preventDefault();var i=e(window).outerHeight();$navigation.hasClass("open")?($navigation.removeClass("open"),$navigation.css("height",80)):($navigation.addClass("open"),$navigation.css("height",i))}function r(){if($navigation.length){new Waypoint({element:$navigation,handler:function(e){"down"===e?$navigation.addClass("sticky"):$navigation.removeClass("sticky")},offset:-2})}}$burgerBtn=e(".navigation__burger-js"),$navigation=e(".navigation-js"),$navigationMenu=e(".navigation__menu-js"),t()}(jQuery),function(e){function t(){i.datepicker({format:"dd/mm/yy",startDate:new Date(o.setDate(o.getDate()+1))})}var i=e(".date.js"),o=new Date;t()}(jQuery),function(e){function t(){o.hide(),i.select2(),i.on("change",function(t){var i=e(this),r=i[0].options.selectedIndex,n=e(i[0].options[r]).data("value");"undefined"!=typeof n?o.show():o.hide()})}var i=e(".select.js"),o=e(".custom.js");t()}(jQuery),function(e){function t(){""!==s&&a.find("span").text(s)}function i(){a.on("click",o),n.on("change",r)}function o(){n.click()}function r(){s=e(this).val(),t()}var n=e(".file.js"),a=e(".contact__form-file.js"),s="";t(),i()}(jQuery),function(e){function t(){n.hasClass("button--red")||($faqButtons.find(".button").removeClass("button--red button--gray"),$faqButtons.find(".button").addClass("button--gray"),n.removeClass("button--gray"),n.addClass("button--red")),$faqList.find(".all").hide(),$faqList.find("."+r).show()}function i(){$faqButtons.on("click","a",o)}function o(i){i.preventDefault();var o=e(this);r=o.data("value"),n=o,t()}$faqButtons=e(".faqs__buttons.js"),$faqList=e(".faqs__list.js");var r="all",n=$faqButtons.children().eq(0);t(),i()}(jQuery),function(e,t,i,o){"use strict";var r={videoMaxWidth:"855px",youtubePlayerParams:!1,vimeoPlayerParams:!1,dailymotionPlayerParams:!1,vkPlayerParams:!1,videojs:!1,videojsOptions:{}},n=function(t){return this.core=e(t).data("lightGallery"),this.$el=e(t),this.core.s=e.extend({},r,this.core.s),this.videoLoaded=!1,this.init(),this};n.prototype.init=function(){var t=this;t.core.$el.on("hasVideo.lg.tm",function(e,i,o,r){if(t.core.$slide.eq(i).find(".lg-video").append(t.loadVideo(o,"lg-object",!0,i,r)),r)if(t.core.s.videojs)try{videojs(t.core.$slide.eq(i).find(".lg-html5").get(0),t.core.s.videojsOptions,function(){t.videoLoaded||this.play()})}catch(n){console.error("Make sure you have included videojs")}else t.core.$slide.eq(i).find(".lg-html5").get(0).play()}),t.core.$el.on("onAferAppendSlide.lg.tm",function(e,i){t.core.$slide.eq(i).find(".lg-video-cont").css("max-width",t.core.s.videoMaxWidth),t.videoLoaded=!0});var i=function(e){if(e.find(".lg-object").hasClass("lg-has-poster")&&e.find(".lg-object").is(":visible"))if(e.hasClass("lg-has-video")){var i=e.find(".lg-youtube").get(0),o=e.find(".lg-vimeo").get(0),r=e.find(".lg-dailymotion").get(0),n=e.find(".lg-html5").get(0);if(i)i.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");else if(o)try{$f(o).api("play")}catch(a){console.error("Make sure you have included froogaloop2 js")}else if(r)r.contentWindow.postMessage("play","*");else if(n)if(t.core.s.videojs)try{videojs(n).play()}catch(a){console.error("Make sure you have included videojs")}else n.play();e.addClass("lg-video-playing")}else{e.addClass("lg-video-playing lg-has-video");var s,l,c=function(i,o){if(e.find(".lg-video").append(t.loadVideo(i,"",!1,t.core.index,o)),o)if(t.core.s.videojs)try{videojs(t.core.$slide.eq(t.core.index).find(".lg-html5").get(0),t.core.s.videojsOptions,function(){this.play()})}catch(r){console.error("Make sure you have included videojs")}else t.core.$slide.eq(t.core.index).find(".lg-html5").get(0).play()};t.core.s.dynamic?(s=t.core.s.dynamicEl[t.core.index].src,l=t.core.s.dynamicEl[t.core.index].html,c(s,l)):(s=t.core.$items.eq(t.core.index).attr("href")||t.core.$items.eq(t.core.index).attr("data-src"),l=t.core.$items.eq(t.core.index).attr("data-html"),c(s,l));var u=e.find(".lg-object");e.find(".lg-video").append(u),e.find(".lg-video-object").hasClass("lg-html5")||(e.removeClass("lg-complete"),e.find(".lg-video-object").on("load.lg error.lg",function(){e.addClass("lg-complete")}))}};t.core.doCss()&&t.core.$items.length>1&&(t.core.s.enableSwipe&&t.core.isTouch||t.core.s.enableDrag&&!t.core.isTouch)?t.core.$el.on("onSlideClick.lg.tm",function(){var e=t.core.$slide.eq(t.core.index);i(e)}):t.core.$slide.on("click.lg",function(){i(e(this))}),t.core.$el.on("onBeforeSlide.lg.tm",function(i,o,r){var n=t.core.$slide.eq(o),a=n.find(".lg-youtube").get(0),s=n.find(".lg-vimeo").get(0),l=n.find(".lg-dailymotion").get(0),c=n.find(".lg-vk").get(0),u=n.find(".lg-html5").get(0);if(a)a.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");else if(s)try{$f(s).api("pause")}catch(f){console.error("Make sure you have included froogaloop2 js")}else if(l)l.contentWindow.postMessage("pause","*");else if(u)if(t.core.s.videojs)try{videojs(u).pause()}catch(f){console.error("Make sure you have included videojs")}else u.pause();c&&e(c).attr("src",e(c).attr("src").replace("&autoplay","&noplay"));var d;d=t.core.s.dynamic?t.core.s.dynamicEl[r].src:t.core.$items.eq(r).attr("href")||t.core.$items.eq(r).attr("data-src");var m=t.core.isVideo(d,r)||{};(m.youtube||m.vimeo||m.dailymotion||m.vk)&&t.core.$outer.addClass("lg-hide-download")}),t.core.$el.on("onAfterSlide.lg.tm",function(e,i){t.core.$slide.eq(i).removeClass("lg-video-playing")})},n.prototype.loadVideo=function(t,i,o,r,n){var a="",s=1,l="",c=this.core.isVideo(t,r)||{};if(o&&(s=this.videoLoaded?0:1),c.youtube)l="?wmode=opaque&autoplay="+s+"&enablejsapi=1",this.core.s.youtubePlayerParams&&(l=l+"&"+e.param(this.core.s.youtubePlayerParams)),a='<iframe class="lg-video-object lg-youtube '+i+'" width="560" height="315" src="//www.youtube.com/embed/'+c.youtube[1]+l+'" frameborder="0" allowfullscreen></iframe>';else if(c.vimeo)l="?autoplay="+s+"&api=1",this.core.s.vimeoPlayerParams&&(l=l+"&"+e.param(this.core.s.vimeoPlayerParams)),a='<iframe class="lg-video-object lg-vimeo '+i+'" width="560" height="315"  src="//player.vimeo.com/video/'+c.vimeo[1]+l+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';else if(c.dailymotion)l="?wmode=opaque&autoplay="+s+"&api=postMessage",this.core.s.dailymotionPlayerParams&&(l=l+"&"+e.param(this.core.s.dailymotionPlayerParams)),a='<iframe class="lg-video-object lg-dailymotion '+i+'" width="560" height="315" src="//www.dailymotion.com/embed/video/'+c.dailymotion[1]+l+'" frameborder="0" allowfullscreen></iframe>';else if(c.html5){var u=n.substring(0,1);"."!==u&&"#"!==u||(n=e(n).html()),a=n}else c.vk&&(l="&autoplay="+s,this.core.s.vkPlayerParams&&(l=l+"&"+e.param(this.core.s.vkPlayerParams)),a='<iframe class="lg-video-object lg-vk '+i+'" width="560" height="315" src="http://vk.com/video_ext.php?'+c.vk[1]+l+'" frameborder="0" allowfullscreen></iframe>');return a},n.prototype.destroy=function(){this.videoLoaded=!1},e.fn.lightGallery.modules.video=n}(jQuery,window,document),function(e){function t(){i.lightGallery({controls:!1,counter:!1})}var i=e(".video-js");t()}(jQuery),function(e){function t(){if(arguments&&0===arguments.length)e.each(r,function(t,i){e(i).css({height:e(i).find(".faq__title").outerHeight()})});else{var t=e(arguments[0]);t.hasClass("open")?(t.removeClass("open"),a=t.find(".faq__title").outerHeight(),t.css({height:a})):(t.addClass("open"),a=t.find(".faq__wrapper").outerHeight(),t.css({height:a}))}}function i(){n.on("click",o)}function o(){var i=e(this).closest(".faq");t(i)}var r=e(".faq.js"),n=e(".faq__title.js"),a=0;t(),i()}(jQuery),function(e){var t="form-comp-1",i="__content";e("#subscriber_form").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#subscriber_form").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#subscriber_form").validate({errorClass:t+"__errors",rules:{fullName:"required",email:{required:!0,email:!0}},messages:{fullname:"Please enter your full name",email:"Please enter a valid email address"},submitHandler:function(){e.ajax({type:"POST",url:"/subscriber-email",data:e("#subscriber_form").serialize(),dataType:"json",beforeSend:function(){e("#subscriber-submit span").html("Please wait ..."),e("#subscriber_form .message").remove()},success:function(o){o.success?(e("#subscriber-submit span").html("Learn More"),e("#subscriber_form input").val("")):(e("#subscriber-submit span").html("Learn More"),e("#subscriber_form .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#subscriber-submit span").html("Submit"),e("#subscriber-submit .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}}),t="form-comp-1",i="__content",e("#contact-email").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#contact-email").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#contact-email").validate({errorClass:t+"__errors",rules:{firstName:"required",lastName:"required",phone:"required",message:"required",email:{required:!0,email:!0}},messages:{firstname:"Please enter your first name",lastname:"Please enter your last name",phone:"Please enter your phone number",email:"Please enter a valid email address",message:"Please enter a meassage"},submitHandler:function(){e.ajax({type:"POST",url:"/contact-email",data:e("#contact-email").serialize(),dataType:"json",beforeSend:function(){e("#contact-email-submit span").html("Please wait ..."),e("#contact-email .message").remove()},success:function(o){1==o.success?window.location="/thank-you":2==o.success?(e("#contact-email-submit span").html("Submit"),e(".g-recaptcha").after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>')):(e("#contact-email-submit span").html("Submit"),e("#contact-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#contact-email-submit span").html("Submit"),e("#contact-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}}),t="form-comp-1",i="__content",e("#book-now-email").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#book-now-email").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#book-now-email").validate({errorClass:t+"__errors",rules:{firstName:"required",lastName:"required",phone:"required",eventDate:"required",eventLocation:"required",topic:"required",email:{required:!0,email:!0}},messages:{firstname:"Please enter your first name",lastname:"Please enter your last name",phone:"Please enter your phone number",email:"Please enter a valid email address",eventDate:"Please select a event date",eventLocation:"Please enter a location",topic:"Please select a topic"},submitHandler:function(){e.ajax({type:"POST",url:"/book-now-email",data:e("#book-now-email").serialize(),dataType:"json",beforeSend:function(){e("#book-now-email-submit span").html("Please wait ..."),e("#book-now-email .message").remove()},success:function(o){1==o.success?window.location="/thank-you":2==o.success?(e("#book-now-email-submit span").html("Submit"),e(".g-recaptcha").after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>')):(e("#book-now-email-submit span").html("Submit"),e("#book-now-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#book-now-email-submit span").html("Submit"),e("#book-now-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}}),t="form-comp-1",i="__content",e("#join-us-email").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#join-us-email").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#join-us-email").validate({errorClass:t+"__errors",rules:{firstName:"required",lastName:"required",phone:"required",message:"required",resume:"required",email:{required:!0,email:!0}},messages:{firstname:"Please enter your first name",lastname:"Please enter your last name",phone:"Please enter your phone number",email:"Please enter a valid email address",message:"Please enter your  message",resume:"Please upload a resume"},submitHandler:function(o){var r=new FormData(e("#join-us-email")[0]);e.ajax({type:"POST",url:"/join-us-email",data:r,dataType:"json",cache:!1,contentType:!1,processData:!1,beforeSend:function(){e("#join-us-email-submit span").html("Please wait ..."),e("#join-us-email .message").remove()},success:function(o){1==o.success?window.location="/thank-you":2==o.success?(e("#join-us-email-submit span").html("Submit"),e(".g-recaptcha").after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>')):(e("#join-us-email-submit span").html("Submit"),e("#join-us-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#join-us-email-submit span").html("Submit"),e("#join-us-email .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}}),t="form-comp-1",i="__content",e("#signup_form").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#signup_form").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#signup_form").validate({errorClass:t+"__errors",rules:{fullName:"required",email:{required:!0,email:!0}},messages:{fullname:"Please enter your full name",email:"Please enter a valid email address"},submitHandler:function(){e.ajax({type:"POST",url:"/signup-email",data:e("#signup_form").serialize(),dataType:"json",beforeSend:function(){e("#signup-submit span").html("Please wait ..."),e("#signup_form .message").remove()},success:function(o){o.success?(e("#signup-submit span").html("Sign Up"),e("#signup_form input").val("")):(e("#signup-submit span").html("Learn More"),e("#signup_form .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#signup-submit span").html("Submit"),e("#signup-submit .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}}),t="form-comp-1",i="__content",e("#newsletter_form").parents("section.form-comp-2").length?(t="form-comp-2",i="__heading"):e("#newsletter_form").parents("section.form-comp-3").length&&(t="form-comp-3",i="__heading"),e("#newsletter_form").validate({errorClass:t+"__errors",rules:{fullName:"required",email:{required:!0,email:!0}},messages:{fullname:"Please enter your full name",email:"Please enter a valid email address"},submitHandler:function(){e.ajax({type:"POST",url:"/signup-email",data:e("#newsletter_form").serialize(),dataType:"json",beforeSend:function(){e("#newsletter-submit span").html("Please wait ..."),e("#newsletter_form .message").remove()},success:function(o){o.success?(e("#newsletter-submit span").html("Sign Up"),e("#newsletter_form input").val(""),e(".popup").hide()):(e("#newsletter-submit span").html("Learn More"),e("#newsletter_form.row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>'))},error:function(){e("#newsletter-submit span").html("Submit"),e("#newsletter-submit .row").before('<div class="'+t+i+'__content message">Something went wrong. Please try again later.</div>')}})}})}(jQuery),function(e,t){"use strict";if(!t)throw new Error("Filterizr requires jQuery to work.");var i=function(e){this.init(e)};i.prototype={init:function(e){this.root={x:0,y:0,w:e}},fit:function(e){var t,i,o,r=e.length,n=r>0?e[0].h:0;for(this.root.h=n,t=0;t<r;t++)o=e[t],(i=this.findNode(this.root,o.w,o.h))?o.fit=this.splitNode(i,o.w,o.h):o.fit=this.growDown(o.w,o.h)},findNode:function(e,t,i){return e.used?this.findNode(e.right,t,i)||this.findNode(e.down,t,i):t<=e.w&&i<=e.h?e:null},splitNode:function(e,t,i){return e.used=!0,e.down={x:e.x,y:e.y+i,w:e.w,h:e.h-i},e.right={x:e.x+t,y:e.y,w:e.w-t,h:i},e},growDown:function(e,t){var i;return this.root={used:!0,x:0,y:0,w:this.root.w,h:this.root.h+t,down:{x:0,y:this.root.h,w:this.root.w,h:t},right:this.root},(i=this.findNode(this.root,e,t))?this.splitNode(i,e,t):null}},t.fn.filterizr=function(){var e=this,i=arguments;if(e._fltr||(e._fltr=t.fn.filterizr.prototype.init(e,"object"==typeof i[0]?i[0]:void 0)),"string"==typeof i[0]){if(i[0].lastIndexOf("_")>-1)throw new Error("Filterizr error: You cannot call private methods");if("function"!=typeof e._fltr[i[0]])throw new Error("Filterizr error: There is no such function");e._fltr[i[0]](i[1],i[2])}return e},t.fn.filterizr.prototype={init:function(e,i){var o=t(e).extend(t.fn.filterizr.prototype);return o.options={animationDuration:.4,callbacks:{onFilteringStart:function(){},onFilteringEnd:function(){},onShufflingStart:function(){},onShufflingEnd:function(){},onSortingStart:function(){},onSortingEnd:function(){}},delay:0,delayMode:"progressive",easing:"ease-out",filter:"all",filterOutCss:{opacity:0,transform:"scale(0.5)"},filterInCss:{opacity:1,transform:"scale(1)"},layout:"sameSize",selector:"string"==typeof e?e:".filtr-container",setupControls:!0},0===arguments.length&&(e=o.options.selector,i=o.options),1===arguments.length&&"object"==typeof arguments[0]&&(i=arguments[0]),i&&o.setOptions(i),o.css({padding:0,position:"relative"}),o._lastCategory=0,o._isAnimating=!1,o._isShuffling=!1,o._isSorting=!1,o._mainArray=o._getFiltrItems(),o._subArrays=o._makeSubarrays(),o._activeArray=o._getCollectionByFilter(o.options.filter),o._toggledCategories={},o._typedText=t("input[data-search]").val()||"",o._uID="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,i="x"==e?t:3&t|8;return i.toString(16)}),o._setupEvents(),o.options.setupControls&&o._setupControls(),o.filter(o.options.filter),o},filter:function(e){var t=this,i=t._getCollectionByFilter(e);t.options.filter=e,t.trigger("filteringStart"),t._handleFiltering(i),t._isSearchActivated()&&t.search(t._typedText)},toggleFilter:function(e){var t=this,i=[];t.trigger("filteringStart"),e&&(t._toggledCategories[e]?delete t._toggledCategories[e]:t._toggledCategories[e]=!0),t._multifilterModeOn()?(i=t._makeMultifilterArray(),t._handleFiltering(i),t._isSearchActivated()&&t.search(t._typedText)):(t.filter("all"),t._isSearchActivated()&&t.search(t._typedText))},search:function(e){var t=this,i=t._multifilterModeOn()?t._makeMultifilterArray():t._getCollectionByFilter(t.options.filter),o=[],r=0;if(t._isSearchActivated())for(r=0;r<i.length;r++){var n=i[r].text().toLowerCase().indexOf(e.toLowerCase())>-1;n&&o.push(i[r])}if(o.length>0)t._handleFiltering(o);else if(t._isSearchActivated())for(r=0;r<t._activeArray.length;r++)t._activeArray[r]._filterOut();else t._handleFiltering(i)},shuffle:function(){var e=this;e._isAnimating=!0,e._isShuffling=!0,e.trigger("shufflingStart"),e._mainArray=e._fisherYatesShuffle(e._mainArray),e._subArrays=e._makeSubarrays();var t=e._multifilterModeOn()?e._makeMultifilterArray():e._getCollectionByFilter(e.options.filter);e._isSearchActivated()?e.search(e._typedText):e._placeItems(t)},sort:function(e,t){var i=this;e=e||"domIndex",t=t||"asc",i._isAnimating=!0,i._isSorting=!0,i.trigger("sortingStart");var o="domIndex"!==e&&"sortData"!==e&&"w"!==e&&"h"!==e;if(o)for(var r=0;r<i._mainArray.length;r++)i._mainArray[r][e]=i._mainArray[r].data(e);i._mainArray.sort(i._comparator(e,t)),i._subArrays=i._makeSubarrays();var n=i._multifilterModeOn()?i._makeMultifilterArray():i._getCollectionByFilter(i.options.filter);i._isSearchActivated()?i.search(i._typedText):i._placeItems(n)},setOptions:function(e){var t=this,i=0;for(var o in e)t.options[o]=e[o];if(t._mainArray&&(e.animationDuration||e.delay||e.easing||e.delayMode))for(i=0;i<t._mainArray.length;i++)t._mainArray[i].css("transition","all "+t.options.animationDuration+"s "+t.options.easing+" "+t._mainArray[i]._calcDelay()+"ms");e.callbacks&&(e.callbacks.onFilteringStart||(t.options.callbacks.onFilteringStart=function(){}),e.callbacks.onFilteringEnd||(t.options.callbacks.onFilteringEnd=function(){}),e.callbacks.onShufflingStart||(t.options.callbacks.onShufflingStart=function(){}),e.callbacks.onShufflingEnd||(t.options.callbacks.onShufflingEnd=function(){}),e.callbacks.onSortingStart||(t.options.callbacks.onSortingStart=function(){}),e.callbacks.onSortingEnd||(t.options.callbacks.onSortingEnd=function(){})),t.options.filterInCss.transform||(t.options.filterInCss.transform="translate3d(0,0,0)"),t.options.filterOutCss.transform||(t.options.filterOutCss.transform="translate3d(0,0,0)")},_getFiltrItems:function(){var e=this,i=t(e.find(".filter-item")),r=[];return t.each(i,function(i,n){var a=t(n).extend(o)._init(i,e);r.push(a)}),r},_makeSubarrays:function(){for(var e=this,t=[],i=0;i<e._lastCategory;i++)t.push([]);for(i=0;i<e._mainArray.length;i++)if("object"==typeof e._mainArray[i]._category)for(var o=e._mainArray[i]._category.length,r=0;r<o;r++)t[e._mainArray[i]._category[r]-1].push(e._mainArray[i]);else t[e._mainArray[i]._category-1].push(e._mainArray[i]);return t},_makeMultifilterArray:function(){for(var e=this,t=[],i={},o=0;o<e._mainArray.length;o++){var r=e._mainArray[o],n=!1,a=r.domIndex in i==!1;if(Array.isArray(r._category)){for(var s=0;s<r._category.length;s++)if(r._category[s]in e._toggledCategories){n=!0;break}}else r._category in e._toggledCategories&&(n=!0);a&&n&&(i[r.domIndex]=!0,t.push(r))}return t},_setupControls:function(){var e=this;t("*[data-filter]").click(function(){var i=t(this).data("filter");e.options.filter!==i&&e.filter(i)}),t("*[data-multifilter]").click(function(){var i=t(this).data("multifilter");"all"===i?(e._toggledCategories={},e.filter("all")):e.toggleFilter(i)}),t("*[data-shuffle]").click(function(){e.shuffle()}),t("*[data-sortAsc]").click(function(){var i=t("*[data-sortOrder]").val();e.sort(i,"asc")}),t("*[data-sortDesc]").click(function(){var i=t("*[data-sortOrder]").val();e.sort(i,"desc")}),t("input[data-search]").keyup(function(){e._typedText=t(this).val(),e._delayEvent(function(){e.search(e._typedText)},250,e._uID)})},_setupEvents:function(){var i=this;t(e).resize(function(){i._delayEvent(function(){i.trigger("resizeFiltrContainer")},250,i._uID)}),i.on("resizeFiltrContainer",function(){i._multifilterModeOn()?i.toggleFilter():i.filter(i.options.filter)}).on("filteringStart",function(){i.options.callbacks.onFilteringStart()}).on("filteringEnd",function(){i.options.callbacks.onFilteringEnd()}).on("shufflingStart",function(){i._isShuffling=!0,i.options.callbacks.onShufflingStart()}).on("shufflingEnd",function(){i.options.callbacks.onShufflingEnd(),i._isShuffling=!1}).on("sortingStart",function(){i._isSorting=!0,i.options.callbacks.onSortingStart()}).on("sortingEnd",function(){i.options.callbacks.onSortingEnd(),i._isSorting=!1})},_calcItemPositions:function(){var e=this,o=e._activeArray,r=0,n=Math.round(e.width()/e.find(".blog__articles-item").outerWidth()),a=0,s=o[0].outerWidth(),l=0,c=0,u=0,f=0,d=0,m=[];if("packed"===e.options.layout){t.each(e._activeArray,function(e,t){t._updateDimensions()});var g=new i(e.outerWidth());for(g.fit(e._activeArray),f=0;f<o.length;f++)m.push({left:o[f].fit.x,top:o[f].fit.y});r=g.root.h}if("horizontal"===e.options.layout)for(a=1,f=1;f<=o.length;f++)s=o[f-1].outerWidth(),l=o[f-1].outerHeight(),m.push({left:c,top:u}),c+=s,r<l&&(r=l);else if("vertical"===e.options.layout){for(f=1;f<=o.length;f++)l=o[f-1].outerHeight(),m.push({left:c,top:u}),u+=l;r=u}else if("sameHeight"===e.options.layout){a=1;var h=e.outerWidth();for(f=1;f<=o.length;f++){s=o[f-1].width();var p=o[f-1].outerWidth(),_=0;o[f]&&(_=o[f].width()),m.push({left:c,top:u}),d=c+s+_,d>h?(d=0,c=0,u+=o[0].outerHeight(),a++):c+=p}r=a*o[0].outerHeight()}else if("sameWidth"===e.options.layout){for(f=1;f<=o.length;f++){if(m.push({left:c,top:u}),f%n===0&&a++,c+=s,u=0,a>0)for(d=a;d>0;)u+=o[f-n*d].outerHeight(),d--;f%n===0&&(c=0)}for(f=0;f<n;f++){for(var v=0,y=f;o[y];)v+=o[y].outerHeight(),y+=n;v>r?(r=v,v=0):v=0}}else if("sameSize"===e.options.layout){for(f=1;f<=o.length;f++)m.push({left:c,top:u}),c+=s,f%n===0&&(u+=o[0].outerHeight(),c=0);a=Math.ceil(o.length/n),r=a*o[0].outerHeight()}return e.css("height",r),m},_handleFiltering:function(e){for(var t=this,i=t._getArrayOfUniqueItems(t._activeArray,e),o=0;o<i.length;o++)i[o]._filterOut();t._activeArray=e,t._placeItems(e)},_multifilterModeOn:function(){var e=this;return Object.keys(e._toggledCategories).length>0},_isSearchActivated:function(){var e=this;return e._typedText.length>0},_placeItems:function(e){var t=this;t._isAnimating=!0,t._itemPositions=t._calcItemPositions();for(var i=0;i<e.length;i++)e[i]._filterIn(t._itemPositions[i])},_getCollectionByFilter:function(e){var t=this;return"all"===e?t._mainArray:t._subArrays[e-1]},_makeDeepCopy:function(e){var t={};for(var i in e)t[i]=e[i];return t},_comparator:function(e,t){return function(i,o){return"asc"===t?i[e]<o[e]?-1:i[e]>o[e]?1:0:"desc"===t?o[e]<i[e]?-1:o[e]>i[e]?1:0:void 0}},_getArrayOfUniqueItems:function(e,t){var i,o,r=[],n={},a=t.length;for(i=0;i<a;i++)n[t[i].domIndex]=!0;for(a=e.length,i=0;i<a;i++)o=e[i],o.domIndex in n||r.push(o);return r},_delayEvent:function(){var e={};return function(t,i,o){if(null===o)throw Error("UniqueID needed");e[o]&&clearTimeout(e[o]),e[o]=setTimeout(t,i)}}(),_fisherYatesShuffle:function(e){for(var t,i,o=e.length;o;)i=Math.floor(Math.random()*o--),t=e[o],e[o]=e[i],e[i]=t;return e}};var o={_init:function(e,t){var i=this;return i._parent=t,i._category=i._getCategory(),i._lastPos={},i.domIndex=e,i.sortData=i.data("sort"),i.w=0,i.h=0,i._isFilteredOut=!0,i._filteringOut=!1,i._filteringIn=!1,i.css(t.options.filterOutCss).css({"-webkit-backface-visibility":"hidden",perspective:"1000px","-webkit-perspective":"1000px","-webkit-transform-style":"preserve-3d",position:"absolute",transition:"all "+t.options.animationDuration+"s "+t.options.easing+" "+i._calcDelay()+"ms"}),i.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){i._onTransitionEnd()}),i},_updateDimensions:function(){var e=this;e.w=e.outerWidth(),e.h=e.outerHeight()},_calcDelay:function(){var e=this,t=0;return"progressive"===e._parent.options.delayMode?t=e._parent.options.delay*e.domIndex:e.domIndex%2===0&&(t=e._parent.options.delay),t},_getCategory:function(){var e=this,t=e.data("category");if("string"==typeof t){t=t.split(", ");for(var i=0;i<t.length;i++){if(isNaN(parseInt(t[i])))throw new Error("Filterizr: the value of data-category must be a number, starting from value 1 and increasing.");parseInt(t[i])>e._parent._lastCategory&&(e._parent._lastCategory=parseInt(t[i]))}}else t>e._parent._lastCategory&&(e._parent._lastCategory=t);return t},_onTransitionEnd:function(){var e=this;e._filteringOut?(t(e).addClass("filteredOut"),e._isFilteredOut=!0,e._filteringOut=!1):e._filteringIn&&(e._isFilteredOut=!1,e._filteringIn=!1),e._parent._isAnimating&&(e._parent._isShuffling?e._parent.trigger("shufflingEnd"):e._parent._isSorting?e._parent.trigger("sortingEnd"):e._parent.trigger("filteringEnd"),e._parent._isAnimating=!1)},_filterOut:function(){var e=this,t=e._parent._makeDeepCopy(e._parent.options.filterOutCss);t.transform+=" translate3d("+e._lastPos.left+"px,"+e._lastPos.top+"px, 0)",e.css(t),e.css("pointer-events","none"),e._filteringOut=!0},_filterIn:function(e){var i=this,o=i._parent._makeDeepCopy(i._parent.options.filterInCss);t(i).removeClass("filteredOut"),i._filteringIn=!0,i._lastPos=e,i.css("pointer-events","auto"),o.transform+=" translate3d("+e.left+"px,"+e.top+"px, 0)",i.css(o)}}}(this,jQuery),$(window).on("load",function(){$(".blog__articles-list").length&&$(".blog__articles-list").filterizr({delay:50,delayMode:"progressive",animationDuration:.5,layout:"sameWidth"}),$(".mary-tv__list").length&&$(".mary-tv__list").filterizr({delay:50,delayMode:"progressive",animationDuration:.5,layout:"packed"})}),function(e){e(".blog__filter a, .mary-tv__buttons a").on("click",function(){e(".blog__filter a, .mary-tv__buttons a").removeClass("button--red").addClass("button--gray"),e(this).addClass("button--red").removeClass("button--gray")})}(jQuery),function(e){function t(){n.removeClass("active"),n.addClass("hide")}function i(){r.on("click",o),readCookie("hide")?n.hide():setTimeout(function(){n.removeClass("hide"),n.addClass("active")},2e4)}function o(){return t(),createCookie("hide",!0,1),!1}var r=e(".popup__wrapper-button.js"),n=e(".popup.js");i()}(jQuery),function(e){function t(){o.on("click",i)}function i(){e("html,body").animate({scrollTop:r.offset().top},"slow")}var o=e(".arrow-js"),r=e("#arrow-target");t()}(jQuery),function(e){e(".load-more-blogs").on("click",function(){e.ajax({type:"POST",url:"/blogs/load-more",data:{skip:e(".blog__articles-list .blog__articles-item").length},dataType:"json",beforeSend:function(){e(".load-more-blogs a span").html("Please wait...")},success:function(t){t["load-more"]?e(".load-more-blogs").show():e(".load-more-blogs").hide(),t.success&&e.each(t.object,function(t,i){var o=e(".blog__articles-list .blog__articles-item:first").clone();e(".card-01__date-day",o).html(i.formatedDate.dayNum),e(".card-01__date-month",o).html(i.formatedDate.halfMonth),e(".card-01__image-wrapper",o).attr("href","blogs/"+i.slug),e(".card-01__image",o).html("src",i.metadata.blog_image.url),e(".card-01__content",o).html(i.title),e(".card-01__button",o).attr("href","blogs/"+i.slug),e(".blog__articles-list").append(o)})},error:function(){},complete:function(){e(".load-more-blogs a span").html("LOAD MORE")}})})}(jQuery);