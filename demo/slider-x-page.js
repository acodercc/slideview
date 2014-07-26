(function(){
    var lib = window.lib || lib;
    var Page = {
        init: function(){
            this.initCards();
            this.initSlide();
            this.bindEvents();
        },
        initCards: function(){
            var texts = ['1','2'],
            cards,
            li,
            i=0,
            len=texts.length;

            cards = this.cards = [];

            for(; i < len; i += 1){
                li = document.createElement('li');
                li.className = 'card';
                li.textContent = texts[i];
                li.style.backgroundColor = this.__generateColor();
                cards[i] = li;
            }
        },
        initSlide: function(){

            var me = this;

            this.dynamicSlide = lib.slideview('#slider-dynamic', {
                items: this.cards,
                direction: 'h',
                loop: true,
                interval: 500
                //noBounceEasing: true
            });

            this.staticSlide = lib.slideview('#slider-static', {
                direction: 'v',
                loop: true
                //noBounceEasing: true
            });


        },
        bindEvents: function(){

            this.dynamicSlide.onFlip(function(){
                window.console.log(this);
            });

            document.body.addEventListener('click', this, false);
        },
        handleEvent : function(e){
            if(e.type === 'click'){
                switch(e.target.id){
                    case 'J-btnSlideTo':
                        this.__slideTo();
                    break;
                    case 'J-btnPrev':
                        this.__prev();
                    break;
                    case 'J-btnNext':
                        this.__next();
                    break;
                }
            }
        },
        __slideTo: function(){
            this.dynamicSlide.slideTo(1);
        },
        __prev: function(){
            this.dynamicSlide.prev();
        },
        __next: function(){
            this.dynamicSlide.next();
        },
        __generateColor: function(){
            function randomtmp(){
                return 255-Math.floor(Math.random()*128);
            }
            return 'rgb('+randomtmp()+','+randomtmp()+','+randomtmp()+')';
        }

    };
    window.Page = Page;
}());
