$(document).ready(function() {
    var slider = $('.slider');
    var videoPlaying = false;
  
    slider.on('init', function(event, slick) {
      var currentSlide = slick.$slides[slick.currentSlide];
      var video = $(currentSlide).find('video')[0];
  
      if (video) {
        video.onplay = function() {
          videoPlaying = true;
          slider.slick('slickPause');
        };
  
        video.onended = function() {
          videoPlaying = false;
          slider.slick('slickNext');
          slider.slick('slickPlay');
        };
      }
    });
  
    slider.slick({
      autoplay: true,
      autoplaySpeed: 1000,
      pauseOnHover: false,
      fade: true,
      cssEase: 'linear',
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }
      ]
    });
  
    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var currentVideo = $(slick.$slides[currentSlide]).find('video')[0];
      var nextVideo = $(slick.$slides[nextSlide]).find('video')[0];
  
      if (currentVideo) {
        currentVideo.pause();
      }
  
      if (nextVideo) {
        nextVideo.play();
  
        nextVideo.onended = function() {
          slider.slick('slickNext');
          slider.slick('slickPlay');
        };
      }
    });
  
    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var nextVideoSlide = $(slick.$slides[nextSlide]).hasClass('video-slide');
  
      if (nextVideoSlide && !videoPlaying) {
        slider.slick('slickPause');
      }
  
      if (!nextVideoSlide && !videoPlaying) {
        slider.slick('slickPlay');
      }
    });
  
    // Initiate the slick slider autoplay
    slider.slick('slickPlay');
  });
  