/*
    Author: Jitendar Kumar Ray
    Version: 1.0.0
    Initial Release: 2016
*/

(function($){

    $.fn.scrollMaster = function(options){
        var settings = $.extend({
            easingFn: "swing",
            easingDuration: 900,
            topOffset: 79,
        }, options)
    
        settings.topOffset -= 1;
        var elementToTrack = [],
            currentElement = 0,
            scrollParent,
            scrollEnd = false,
            scrollLock = true,
            isBody = true,
            scrollParentOffsetHeight,
            scrollHeight,
            scrollListener;
            
            
            this.each( function(){
                let $this = $(this);
                let $target = $($this.attr('href'));
                elementToTrack.push( {
                    obj: $this,
                    target: $target,
                    top: $target.position().top,
                    bottom: $target.outerHeight() + $target.position().top,
                }
                    
                )
            });
    
         
            scrollParent = elementToTrack[0].target.scrollParent();
            
            if( scrollParent.is($(document)) ){
                scrollParent = $("html, body");
                isBody = true;
            }else{
                isBody = false;
            }
                elementToTrack.forEach( (anchorTag) =>{
                anchorTag.obj.on('click', function(event) {
                    event.preventDefault();
    
                elementToTrack.forEach( (item) => {
                    item.obj.removeClass('active');
                });
                let $this = $(this);
                let element = elementToTrack.filter( (item, index) => { 
                    if (item.obj.is($this)){
                            scrollEnd = index === elementToTrack.length - 1 ? true : false ;
                            currentElement = index;
                        return item 
                    }
                    });  
                
                if (element.length === 0) return;
                $this.addClass('active');
                scrollLock = false;
                scrollParent.stop().animate({
                        scrollTop: element[0].top - settings.topOffset
                    }, settings.easingDuration ,() => { scrollLock = true});
            });
            });
                 
                 if (isBody){
                     scrollHeight = scrollParent.height()
                     scrollEventListener = $(window);
                     scrollParentOffsetHeight = $(window).height();
            
                 }else{
                    scrollParentOffsetHeight = scrollParent.height() 
                    scrollHeight = scrollParent[0].scrollHeight;
                    scrollEventListener = scrollParent;
                 }
               
              
                 
                 function scrollFirstTime(scrollTop){
                    let element;
                    if( scrollParentOffsetHeight + scrollTop >= scrollHeight - 15 ){
                        currentElement = elementToTrack.length - 1;
                        element = elementToTrack[currentElement];
                        scrollEnd = true;
                    }else {
                    element = elementToTrack.filter( (item, index) => {
                    if( scrollTop  >= item.top - settings.topOffset && scrollTop  < item.bottom - settings.topOffset){
                       currentElement = index;
                       return item
                    }
                
                  })[0];
                }
    
                  if(element)
                  element.obj.addClass('active');
                }
            
                scrollFirstTime(scrollEventListener.scrollTop());
            
                 scrollEventListener.on('scroll', function(){
                    if(scrollLock){
                        scrollToPosition($(this).scrollTop());
                    }
                });
             
               function scrollToPosition(scrollTop){
                    if( scrollParentOffsetHeight + scrollTop >= scrollHeight - 15 )
                    {
                        if( scrollEnd) return;
                        elementToTrack[currentElement].obj.removeClass('active');
                        elementToTrack[currentElement + 1].obj.addClass('active');
                        currentElement++;
                        scrollEnd = true;
                        
                        
                        return 
                    } 
                    if( scrollTop  >= elementToTrack[currentElement].top - settings.topOffset && scrollTop  <= elementToTrack[currentElement].bottom - settings.topOffset){
                        elementToTrack[currentElement].obj.addClass('active');
                    }else if( currentElement < elementToTrack.length - 1 && scrollTop  > elementToTrack[currentElement + 1].top - settings.topOffset){
                        elementToTrack[currentElement].obj.removeClass('active');
                        if(currentElement < elementToTrack.length - 1)
                        currentElement++;
                        if(currentElement == elementToTrack.length - 1 )
                        scrollEnd = true;
                        
                    }else{
                        elementToTrack[currentElement].obj.removeClass('active');
                        if(currentElement > 0)
                        currentElement--;
            
                        if(scrollEnd) 
                        scrollEnd = false;
                    }
                }
    
    
    
            return this;
    }
    
    
    
    
    })(jQuery);
