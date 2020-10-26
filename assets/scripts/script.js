function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
      console.log("mySidebar");
}

function w3_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
}

(function($) {
	$.fn.extend({
            jParallax: function(opt) {
                  console.log(1)
                  var defaults = { moveFactor: 5, targetContainer: 'body' },
                        o = $.extend(defaults, opt);
                  return this.each(function() {
                        var background = $(this);
                        $(o.targetContainer).on('mousemove', function(e){
                              mouseX = e.pageX;
                              mouseY = e.pageY;
                              windowWidth = $(window).width();
                              windowHeight = $(window).height();
                              percentX = (0-((mouseX/windowWidth)*o.moveFactor) - (o.moveFactor/2)+o.moveFactor)/2;
                              percentY = (0-((mouseY/windowHeight)*o.moveFactor) - (o.moveFactor/2)+o.moveFactor)/2;
                              background[0].style.transform = "translate("+percentX+"%,"+percentY+"%)";
                        });
                  });
            }					
	});
}(jQuery));

$('.eye-image').jParallax({ moveFactor: 10, targetContainer: '.parallax' });


$(".chapters").click(function() {
      let currentChapterId=parseInt($(this).attr("id"));
      $(".chapters").removeClass('activeChapter');
      if(this.classList.contains('activeChapter')){
            $(this).removeClass('activeChapter');
      }
      else{
            $(this).addClass('activeChapter');
      }
      if(currentChapterId === 2 || currentChapterId === 5){
            $(".w3-xxlarge").css("color","white", "!important");
      }
      else{
            $(".w3-xxlarge").css("color","black", "!important");
      }
});

