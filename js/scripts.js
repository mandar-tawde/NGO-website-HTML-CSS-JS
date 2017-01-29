include('js/jquery.easing.1.3.js');
include('js/jquery.animate-colors-min.js');
include('js/jquery.backgroundpos.min.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/forms.js');
include('js/googleMap.js');
include('js/spin.js');
include('js/bgStretch.js');
include('js/sImg.js');
include('js/jquery.fancybox-1.3.4.pack.js');
include('js/uCarousel.js')


//----Include-Function----
function include(url){ 
  document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
//--------global-------------
var isSplash = true;
var isFirst = true;

var spinner;
var mapSpinner;
var bgSpinner;

var MSIE = ($.browser.msie) && ($.browser.version <= 8)
//------DocReady-------------
$(document).ready(function(){ 
    if(location.hash.length == 0){
        location.hash="!/"+$('#content > ul > li:first-child').attr('id');
    }
    ///////////////////////////////////////////////////////////////////

$("body").css({'min-height':'568px'});


///////////////////////////////////////////////////////////////////



     $('ul#menu').superfish({
          delay:       800,
          animation:   {height:'show'},
          speed:       600,
          autoArrows:  false,
         dropShadows: false,
         	onInit: function(){
  				$("#menu > li > a").each(function(index){
  					var conText = $(this).find('.mText').text();
                       $(this).append("<div class='_area'></div><div class='_overPl'></div><div class='mTextOver'>"+conText+"</div>"); 
                       
  				})
  	 		}
        });
});
  
 //------WinLoad-------------  
$(window).load(function(){  




   
   $('.fancyPic').fancybox({'titlePosition': 'inside', 'overlayColor':'#000'}); 
   
   if(!MSIE){ $('.fancyPic').find(".zoomSp").fadeTo(500, 0)}else{ $('.fancyPic').find(".zoomSp").css({"display":"none"})  }
    $('.fancyPic').hover(function(){
    if(!MSIE){ 
        $(this).find(".zoomSp").stop().fadeTo(500, 1)
    }else{
        $(this).find(".zoomSp").css({"display":"block"})   
    }
    },
     function(){
            if(!MSIE){ 
                $(this).find(".zoomSp").stop().fadeTo(500, 0)
            }else{
                     $(this).find(".zoomSp").css({"display":"none"})    
            }   
        }
 )   
   
   
   $(".thumbs").stop(true).delay(1000).animate({bottom:"44px"}, 800, 'easeOutCubic');
   
   $('.thumbs .pags li a').each(function(){
		$('<span class="ovrl" />')
			.appendTo(this)
			.css({
				width:'100%'
				,height:'100%'
				,left:0
				,top:0
				,position:'absolute'
				
				,opacity:0
			})
	})
  
	setTimeout(function(){	
	$('#bgStretch').bgStretch({align:'leftTop',
			navs:$('.thumbs .pags')
				.uCarousel({
					show:4
					,clickable:true					
				})
				.uCarousel(function(n,_){
					_.me.navs(n)
				})
				.navs({
					autoPlay:15000,
					hoverIn:function(li){
						$('.ovrl',li)
							.stop()
							.animate({
								opacity:1
							})
					}
					,hoverOut:function(li){
						$('.ovrl',li)
							.stop()
							.animate({
								opacity:0
							})
					}
				})
				.navs(0)
		})
		.sImg({
			spinner:'<div class="bg-spinner" />'			
		})	
		 var img=0;
        var num=$('.thumbs .pags li').length-1;
        $('#prev').click(function(){
            img=img-1;
    		if (img<0) img=img+num+1;
    		$.when($('#bgStretch img')).then(function(){
    			$('.thumbs .pags li a').eq(img).click();
    		})
    		return false
    	});
    	$('#next').click(function(){
    		img=img+1;
    		if (img>num) img=img-num-1;
    		$.when($('#bgStretch img')).then(function(){
    			$('.thumbs .pags li a').eq(img).click();
    		})
            return false
    	});
		 },0);
		


       
var menuItems = $('#menu >li'); 
var currentIm = 0;
var lastIm = 0;



///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');

    //$('.menu > ul >li').eq(0).css({'display':'none'});
	var content=$('#content'),
		nav=$('.menu');
		nav2=$('.menu2');

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({left:"-1700px",'display':'none'});
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({'display':'block', left:'1700px'}).stop().delay(400).animate({left:"0px"},800,'easeOutCubic');
                if ((_.n == 0) && ((_.pren>0) || (_.pren==undefined))){splashMode();}
                if (((_.pren == 0) || (_.pren == undefined)) && (_.n>0) ){contentMode(); }
            }
			if(_.prev){
			     _.prev.stop().animate({left:'-1700px'},600,'easeInOutCubic',function(){_.prev.css({'display':'none'});} );
             }
		}
	})
    

    function splashMode(){
        isSplash = true;
            $(".extraBg1").stop(true).delay(300).animate({height:"0px", top:"380px"}, 600, 'easeOutCubic');
             $("body").css({'min-height':'568px'});
            setTimeout(
                function(){
                    $(".main").css({"z-index":1})
       
                }, 800)
			
				
				
				
				
    }
    
    function contentMode(){  
        isSplash = false;
              $(".extraBg1").css({top:"380px"}).stop(true).animate({height:"657px", top:"0px"}, 600, 'easeOutCubic');
			  $("body").css({'min-height':'900px'});
         
              $(".main").css({"z-index":2})
			  
	

    }		
    
    
	nav.navs({
			useHash:true,
             hoverIn:function(li){
                $(".mText", li).stop(true).animate({top:"70px"}, 600, 'easeOutCubic');
                $(".mTextOver", li).stop(true).delay(50).animate({top:"28px"}, 500, 'easeOutCubic');
                $("._overPl", li).stop(true).animate({bottom:"0px"}, 500, 'easeOutCubic');

                   // if(($.browser.msie) && ($.browser.version <= 8)){}else{}
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        $(".mText", li).stop(true).animate({top:"0px"}, 600, 'easeOutCubic');
                        $(".mTextOver", li).stop(true).delay(20).animate({top:"-100px"}, 400, 'easeOutCubic');
                        $("._overPl", li).stop(true).animate({bottom:"100px"}, 400, 'easeOutCubic');
                    } 
                } 
		})

		.navs(function(n){			
			$('#content').tabs(n);
		})
        
        
       	nav2.navs({
			useHash:true,
             hoverIn:function(li){
                $(".mText2", li).stop(true).animate({color:"#a0a0a0"}, 600, 'easeOutCubic');
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        $(".mText2", li).stop(true).animate({color:"#000"}, 600, 'easeOutCubic');
                    } 
                } 
		})

		.navs(function(n){			
			$('#content').tabs(n);
		})

//////////////////////////////////////////
   	var h_cont=600;
	function centrRepos() {
		var h=$(window).height();
		if (h>(h_cont+40)) {
			m_top=~~(h-h_cont)/2;
			h_new=h;
		} else {
			m_top=20;
			h_new=h_cont+40;
		}
        
            if(m_top > 155){
		          $('.center').stop().animate({paddingTop:m_top}, 800, 'easeOutExpo');
          }else{
            
            $('.center').stop().animate({paddingTop:"155px"}, 800, 'easeOutExpo');
          }
        
	}
	centrRepos();
    ///////////Window resize///////
    
    function windowW() {
 return (($(window).width()>=parseInt($('body').css('minWidth')))?$(window).width():parseInt($('body').css('minWidth')));
}
    
    
	$(window).resize(function(){
        centrRepos();
         
        }
    );

    } //window function
) //window load