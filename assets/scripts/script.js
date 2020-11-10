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



$(".organ-photo")
      .mouseover(function(e) {
            let organId=$(this).attr("id");
            let correctDescription=document.querySelectorAll(".organ-description");
            let correctIdArray=[];
            let correctId;
            
            for (let i = 0; i < correctDescription.length; i++) {
                  $(correctDescription[i]).removeClass("activeDescription");
                  correctId=$(correctDescription[i]).attr("id");
                  if(organId===correctId){
                        $(correctDescription[i]).addClass("activeDescription");
                  }
            }
      })
      .mouseout(function(e) {
            $(".organ-description").removeClass("activeDescription");
      });



// let appropriateOrganInfoArra=[
//       {
//             id:0,
//             title:'memory issues',
//             description:'Sleep deprivation prevents your brain from forming connections which helps us process and remember new information. It can negatively impact both short- and long-term memory, increase forgetfulness and risk of alzheimer’s disease.'
//       },
//       {
//             id:1,
//             title:'weakened immunity',
//             description:'Too little sleep weakens your immune system. You are more likely to get sick when you are exposed to germs.'
//       },
//       {
//             id:2,
//             title:'risk for heart disease',
//             description:'Sleep deprivation may lead to higher levels of chemical linked to inflammation, which play roles in heart disease. Besides, in spring, when people lose one hour of sleep, a subsequent 24% increase in heart attacks occurs the following day.'
//       },
//       {
//             id:3,
//             title:'weight gain',
//             description:'With sleep deprivation, the chemicals that signal to your brain that you are full are off balance. As a result, you are more likely to overindulge even when you have had enough to eat.'
//       },
//       {
//             id:4,
//             title:'poor balance',
//             description:'Lack of sleep  can affect your balance and coordination, making you more prone to falls and other physical accidents.'
//       },
//       {
//             id:5,
//             title:'risk for diabetes',
//             description:'A lack of sleep affects your body’s release of insulin, a blood sugar-lowering hormone. People who do not get enough sleep have higher blood sugar levels and an increased risk for type 2 diabetes.'
//       },
//       {
//             id:6,
//             title:'low sex drive',
//             description:'Lack of sleep disrupts the creation of hormones like estrogen and testosterone. Therefore people who do not get enough sleep, often have a lower libido.'
//       }
// ]
// $(".each_organ").mouseover(function(e) {
//       let x;
//       let y;
//       $(".title").text('');
//       $(".desription p").text('');
//       let currentOrganId=parseInt($(this).attr("id"));
//       for (let i = 0; i < appropriateOrganInfoArra.length; i++) {
//             $(".high_blood_pressure-parent_container").removeClass(`info${i}`);
//             if(currentOrganId===appropriateOrganInfoArra[i].id){
//                   $(".title").append(appropriateOrganInfoArra[i].title);
//                   $(".desription p").append(appropriateOrganInfoArra[i].description);
//                   $(".high_blood_pressure").attr("id",`info${i}`);
//                   $(".high_blood_pressure-parent_container").addClass(`info${i}`)
//                   $(".high_blood_pressure-parent_container").css("display","flex");
//                   x = e.clientX;
//                   y = e.clientY;
//                   console.log("x",x," ", " y",y);
//             }   
//             else{
//             }
//       }
// });