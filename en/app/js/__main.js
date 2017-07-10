/**
 * Created by Van-zx on 16/10/9.
 */

var closed = false;
function flowClose(){
  document.querySelector('.email-flow').setAttribute("style", "visibility: hidden");
  document.querySelector('.email-flow-open').setAttribute("style", "visibility: visible");
}
function flowShow(){
  document.querySelector('.email-flow').setAttribute("style", "visibility: visible");
  document.querySelector('.email-flow-open').setAttribute("style", "visibility: hidden");
}
//window.onscroll = function(){
//  var t = document.documentElement.scrollTop || document.body.scrollTop;
//  if( t >= 400 && document.querySelector('.email-flow').getAttribute('data-scroll') === 'enable') {
//    flowShow();
//  } else {
//    if(document.querySelector('.email-flow').getAttribute('data-scroll') === 'enable'){
//      flowClose();
//    }
//
//  }
//};

$(document).ready(function(){
  $('.email-flow .close').click(function(){
    $('.email-flow').attr('data-scroll', '');
    flowClose();
  });
  $('.email-flow-open').click(function(){
    flowShow();
  });

  $('.v-page-thank-you .close').click(function(){
    $('.v-page-thank-you').hide();
  });

  $(".v-section-00").addClass("banner-tra");

  $(".v-nav-product").click(function(e){
    console.log($("#page-container").scrollTop());
    e.preventDefault();
    $('html, body').animate({scrollTop: 780}, 500);
  });
  $(".v-nav-subscribe, .v-nav-contact").click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: 4850}, 500);
  });

  $("#v-nav-contact").click(function(e){
    e.preventDefault();
    function a(){

      var h = 640;
      if(document.body.clientWidth < 360){
        h = 532;
        if(document.body.clientHeight > 532){
          h = document.body.clientHeight;
        }
      }
      if(document.body.clientHeight > 640){
        h = document.body.clientHeight;
      }
      //alert(document.body.clientHeight);
      //alert(h);
      var sh = h*6;
      $('#page-container').animate({scrollTop: sh}, 500);
    };
    a();

  });

  // 提交数据
  var submitData = function(e) {
    var target = $(e.target);
    var url = '',
      email = target.find(".v-email").val(),
      tip = target.find(".tip");

    if (email == "") {
      target.find(".tip").text("Please enter a valid email address!");
    } else {

      target.find("input").fadeOut(1000);
      target.find(".tip").text("Data flying...");

      var firstname = target.find(".first_name").length>0 ? target.find(".first_name").val() : "",
        lastname = target.find(".last_name").length>0 ? target.find(".last_name").val() : "",
        params = {email: email, phonenum: "", address: "", firstname: firstname, lastname: lastname};

      if (typeof(fbq) !== "undefined") {
        fbq('track', 'EmailSubmit');
      }
      if(typeof(ga) !== "undefined") {
        ga('send', 'EmailSubmit');
      }
       // 直接提交给 mailChilp
      //$.ajax({
      //  type: 'POST',
      //  url: '/api/preuser',
      //  async: true,
      //  cache: false,
      //  dataType: "json",
      //  contentType: "application/json",
      //  data: JSON.stringify(params),
      //  success: function (data) {
      //    tip.text("Success! Thank you.").unbind();
      //    location.hash = "email_submitted";
      //
      //    if (typeof(fbq) !== "undefined") {
      //      fbq('track', 'EmailSubmitted');
      //    }
      //    if(typeof(ga) !== "undefined") {
      //      ga('send', 'EmailSubmitted');
      //    }
      //    goog_report_conversion();
      //
      //    if (tap) {
      //      tap('conversion');
      //    }
      //
      //  },
      //  error: function (err) {
      //    target.find("input").fadeIn(500);
      //    tip.text("Failed, please try again.");
      //  }
      //});
      var social_param = ''
      console.log(location.search.toString().substr(1));
      if(location.search.toString().indexOf("kid=") > 0){
        var kvs = location.search.toString().substr(1).split("&");
        var kid = "";
        for(var i in kvs){
          if(kvs[i].indexOf("kid")==0){
            kid = kvs[i].substr(4);
          }
        }
        social_param = '&social_id=' + kid;
        console.log(target.serialize());
      }

      $.ajax({
        url: 'https://api.kickofflabs.com/v1/82484/subscribe',
        data: target.serialize()+social_param,
        dataType: 'jsonp',
        jsonp: 'jsonp',
        jsonpCallback: 'subscribe_callback',
        //timeout: 3000,
        success: function(data){
          console.log(data);
          var social_url = data.social_url;
          var fb = $('.v-page-thank-you .fb');
          var tw = $('.v-page-thank-you .tw');
          var mail = $('.v-page-thank-you .email');
          var link = $('.v-page-thank-you .link');
          var fb_href = fb.attr("href");
          var tw_href = tw.attr("href");

          var tw_content = "&text=Check out @VinciHearable, the world's smartest headphones.  Launching this Nov. and early birds get a big discount!"

          fb.attr("href", fb_href+"u="+social_url);
          tw.attr("href", tw_href+"url="+social_url+tw_content);
          link.text(social_url);

          mail.attr("href", mail.attr('href') + social_url + " %0A%0A %0A%0A Best, %0A Vinci Team");

          tip.text("Success! Thank you.").unbind();
          location.hash="email_submitted";

          if(typeof(fbq) !== "undefined"){
            fbq('track', 'EmailSubmitted');
          }

          if(typeof(ga) !== "undefined"){
            ga('send', 'EmailSubmited');
          }
          goog_report_conversion();

          if(tap) {
            tap('conversion');
          }

          $('.v-page-thank-you').show();

        },
        error: function(e) {
          target.find("input").fadeIn(500);
          tip.text("Failed, please try again.");
          console.log(e);
          message = 'Could not subscribe the email address ' + email;
          console.log(message);
        }
      });
    }
  };

  $(".v-email-form").submit(function(e){
    e.preventDefault();
    submitData(e);

  });

  $(".v-email-form-in-flow").submit(function(e){
    e.preventDefault();
    submitData(e);
  });


  $(".v-footer-email-form").submit(function(e){
    e.preventDefault();
    submitData(e);
  });
});


