//= require jquery
//= require bootstrap
//= require postuler
//= require ga
/// require infinite-scroll
//= require "isotope.pkgd.min.js"

$(function() {
  $("[data-toggle=tooltip]").tooltip();
  $('#newsletter-form').submit(function(e) {
    e.preventDefault();
    $.post($(e.target).attr('action'), $(e.target).serialize(), function(data) {
      if (data.error) {
        var html = $('#newsletter-form-error').show().html();
        console.log(html);
        $('#newsletter-form-error').html(html.replace('ERROR_MESSAGE', data.error));
      } else {
        $('#newsletter-form').hide();
        $('#newsletter-form-thank-you').show();
      }
    });
  });

  // $(".all-posts").infinitescroll({
  //   loading: {
  //     finishedMsg: ''
  //   },
  //   navSelector: "nav.pagination",
  //   nextSelector: "nav.pagination a[rel=next]",
  //   itemSelector: ".js-post"
  // }, function(newElements) {
  //   $(".all-posts").isotope( 'appended', $( newElements ) );
  // });

  $(".all-posts").isotope({
    // options for masonry layout mode
    itemSelector : '.js-post',
    masonry: {
      columnWidth: ".col-lg-4"
    }
  });

  $('#blog-filters').on( 'click', 'a', function() {
    var filterValue = $(this).data('filter');
    $(".all-posts").isotope({ filter: filterValue });
  });

  if (window.location.hash) {
    $("html").animate({ scrollTop: $(window.location.hash).offset().top }, 1000);
  }
})

// ********************************************************
// Show/Hide Navbar & Sharebar on Scroll Top/Down
// ********************************************************
if ($('#sharebar-scroll').length > 0) {
  $(function(){
    var prevScroll = 0,
        curDir = 'down',
        prevDir = 'up';

    $(window).scroll(function(){
      if($(this).scrollTop() >= prevScroll){
        curDir = 'down';
        if(curDir != prevDir){
          $('#sharebar-scroll').stop();
          $('#sharebar-scroll').animate({ bottom: '0px' }, 300)
          prevDir = curDir;
        }
      } else {
        curDir = 'up';
        if(curDir != prevDir){
          $('#sharebar-scroll').stop();
          $('#sharebar-scroll').animate({ bottom: '-50px' }, 300)
          prevDir = curDir;
        }
      }
      prevScroll = $(this).scrollTop();
    });
  })
}

