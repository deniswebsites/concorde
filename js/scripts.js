var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(document).ready(function() {

  $(".dr_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dr");
    sl = parent.find(".dr_content");
    if(!parent.hasClass("active")) {
      if(parent.closest(".dr.active").length == 0) {
        $(".dr").removeClass("active");
      }
      parent.addClass("active");
    } else {
      parent.removeClass("active");
    }
  });

  $(document).mouseup(function(e) {
    hide_element = $(".custom_select");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
        hide_element.removeClass("active");
      }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
        $(".dr").removeClass("active");
    }
  });

  $(document).on("click", ".checkout_list [data-option-val]",  function(e) {
    e.preventDefault();
    parent = $(this).closest(".custom_select");
    val = $(this).attr("data-option-val");
    parent.find(".p_val").text(val);
    parent.find("input[type='hidden']").val(val);
    parent.removeClass("active");
    parent.find("[data-option-val]").removeClass("active");
    $(this).addClass("active");
  });

  // -------------

  $(".tabs_link").on("click", function() {
    parent = $(this).closest(".tabs_links");
    parent.find(".tabs_link").removeClass("active");
    $(this).addClass("active");
  });

  if( document.getElementsByClassName("map")[0] ) {
    ymaps.ready(function () {        
        var myMap = new ymaps.Map('map', {
            center: [25.262524, 55.293947],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });
        myPlacemark = new ymaps.Placemark([25.262524, 55.293947], {
            hintContent: ''
        }, {
        });
        myMap.geoObjects.add(myPlacemark);        
    });
  }

  $(".respmenubtn").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dropdown_wrapp");
    parent.toggleClass("active");
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".dropdown_wrapp").removeClass("active");
    }
  });

  $(document).on("mouseup", function(e) {
      e.preventDefault();
      hide_element = $(".dropdown_wrapp");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0
          && hide_element.hasClass("active")) {
          $(".dropdown_wrapp").removeClass("active");
      }
  });

  // ----------

  $('.dropdown a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var hrefAttr = $(this).attr("href");
    if( hrefAttr.length > 0 && hrefAttr != "#" ) {
      $('html, body').stop().animate({
        'scrollTop': $(hrefAttr).offset().top+2
      }, 500);
    }
    $(".dropdown_wrapp").removeClass("active");
    $('.dropdown a').removeClass("active");
    $(this).addClass("active");
  });

  // ---------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".lp_close_popup, .lp_popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $("[data-popup]").fadeOut(300);
      $(".popup_bg").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");      
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".lp_popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");    
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // ----------------

    $(".nextQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      parent = parentWrapp.find(".quiz_tab.active");
      activeIndex = parseInt(parent.attr("data-index"));
      nextActiveIndex = activeIndex + 1;
      parent.removeClass("active");
      parentWrapp.find("[data-index = '"+nextActiveIndex+"']").addClass("active");
      if(nextActiveIndex == countQuizTabs) {
        $(".nextQuiz").addClass("hidden");
      }
      if(activeIndex + 1 < countQuizTabs) {
        $(".nextQuiz").removeClass("hidden");
      }
      if(nextActiveIndex > 1) {
        $(".prevQuiz").removeClass("hidden");
      }
    });

    $(".prevQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      parent = parentWrapp.find(".quiz_tab.active");      
      activeIndex = parseInt(parent.attr("data-index"));
      nextActiveIndex = activeIndex - 1;
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      parentWrapp.find(".quiz_tab").removeClass("active");
      parentWrapp.find("[data-index = '"+nextActiveIndex+"']").addClass("active");
      if(nextActiveIndex <= 1) {
        $(".prevQuiz").addClass("hidden");
      } 
      if(nextActiveIndex > 1) {
        $(".prevQuiz").removeClass("hidden");
      }
      if(nextActiveIndex < countQuizTabs) {
        $(".nextQuiz").removeClass("hidden");
      } else {
        $(".nextQuiz").addClass("hidden");
      }
    });
    
  
});