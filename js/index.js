
const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
const lineEq = (y2, y1, x2, x1, currentVal) => {
    let m = (y2 - y1) / (x2 - x1); 
    let b = y1 - m * x1;
    return m * currentVal + b;
};
const lerp = (a, b, n) => (1 - n) * a + n * b;
const body = document.body;
const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy }
}

// Window sizes.
let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
// Recalculate window sizes on resize.
window.addEventListener('resize', calcWinsize);

// Custom mouse cursor.
class CursorFx {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
        this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
        this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
        this.scale = 1;
        this.opacity = 1;
        this.mousePos = {x:0, y:0};
        this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
        this.lastScale = 1;
        this.lastOpacity = 1;
        
        this.initEvents();
        requestAnimationFrame(() => this.render());
    }
    initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
    }
    render() {
        this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
        this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
        this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
        this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
        this.lastScale = lerp(this.lastScale, this.scale, 0.15);
        this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
        this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
        this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
        this.DOM.circle.style.opacity = this.lastOpacity
        requestAnimationFrame(() => this.render());
    }
    enter() {
        cursor.scale = 2.7;
        this.DOM.circle.style = "border:none; background-color:rgba(255,255,255,1);mix-blend-mode:difference";
    }
    enter2() {
      cursor.scale = 2.7;
      this.DOM.circle.style = "border:none; background-color:rgb(140 0 0 / 50%);mix-blend-mode:difference";
    }
    leave() {
        cursor.scale = 1;
        this.DOM.dot.style = "background-color:#8f0300";
        this.DOM.circle.style = "border:1px solid#8f0300; background-color:none;";
    }
    click() {
        this.lastScale = 1;
        this.lastOpacity = 0;
    }
}

const cursor = new CursorFx(document.querySelector('.cursor'));

// Custom cursor chnages state when hovering on elements with 'data-hover'.
[...document.querySelectorAll('[data-hover]')].forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter() );
    link.addEventListener('mouseleave', () => cursor.leave() );
    link.addEventListener('click', () => cursor.click() );
});

[...document.querySelectorAll('[data-hover2]')].forEach((link) => {
  link.addEventListener('mouseenter', () => cursor.enter2() );
  link.addEventListener('mouseleave', () => cursor.leave() );
  link.addEventListener('click', () => cursor.click() );
});

const white_cursor = document.querySelectorAll(".white_cursor");
const inner_circle = document.querySelector(".cursor__inner--circle");
const inner_dot = document.querySelector(".cursor__inner--dot");

for(i=0; i<white_cursor.length; i++){
  white_cursor[i].addEventListener('mouseover',function(){
    inner_circle.style = "border:1px solid#fff;";
    inner_dot.style = "background-color:#fff;";
  })
  white_cursor[i].addEventListener('mouseleave',function(){
    inner_circle.style = "border:1px solid#8f0300;";
    inner_dot.style = "background-color:#8f0300;";
  })
}





var beforePosition = document.documentElement.scrollTop
var winHei = window.innerHeight;
const headMove1 = document.querySelector(".show");
const headMove2 = document.querySelector(".move_head");
const sec2 = document.querySelector(".sec2");
const sec3 = document.querySelector(".sec3");
const sec5 = document.querySelector(".sec5");
const sec6 = document.querySelector(".sec6");
const sec1Text = document.querySelector(".sec1_text");
const sec1swiper = document.querySelector(".sec1 .swiper");
const sec5swiper = document.querySelector(".sec5 .swiper");
const sec1box = document.querySelectorAll(".sec1 .swiper-slide .box");
const sec5box = document.querySelectorAll(".sec5 .swiper-slide .box");
const sec1Hei = sec1Text.offsetTop;
const sec2Hei = sec2.offsetTop;
const sec3Hei = sec3.offsetTop;
const sec5Hei = sec5.offsetTop;
const sec6Hei = sec6.offsetTop;
const swiperHei = sec1swiper.offsetTop;



document.addEventListener('scroll', function() {
    var afterPosition = document.documentElement.scrollTop;
    

    if (afterPosition > 50) {

      if(beforePosition < afterPosition ){
        headMove1.classList.remove('scrollDown');
        headMove2.classList.remove('scrollDown');
        // 스크롤 위로 

      } else {
        headMove1.classList.add('scrollDown');
        headMove2.classList.add('scrollDown');
        // 스크롤 아래로 
      }

    } else{
    }
    beforePosition = afterPosition;

    if(window.scrollY <= winHei){
        headMove1.style="opacity:0";
        headMove2.style="opacity:0";
    }else if(window.scrollY > 0){
        headMove1.style="opacity:1";
        headMove2.style="opacity:1";
    }

    if(window.scrollY >= sec1Hei+winHei/2){
        sec1Text.classList.add('active'); 
    }
    if(window.scrollY >= swiperHei+winHei/2){
        sec1swiper.classList.add('active'); 
        setTimeout(() => {
          for(i=0; i<sec1box.length; i++){
            sec1box[i].classList.add('active'); 
          }
        }, 500);
    }

    if(window.scrollY >= sec3Hei-winHei/1.5){
      sec3.classList.add('active'); 
    }
    if(window.scrollY >= sec2Hei-winHei/2){
      sec2.classList.add('active'); 
      bg.classList.add('active');
    }
    if(window.scrollY >= sec5Hei-winHei/2){
      sec5swiper.classList.add('active'); 
      setTimeout(() => {
        for(i=0; i<sec5box.length; i++){
          sec5box[i].classList.add('active'); 
        }
      }, 500);
    }
    if(window.scrollY >= sec6Hei-winHei){
      sec6.classList.add('active'); 
      sec6_bg.classList.add('active');
    }


});

const sec7 = document.querySelector('.sec7');
const gong = document.querySelector('.gong_bg');
const hong = document.querySelector('.hong_bg');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const hong_text = document.querySelector('.hong');
const gong_text = document.querySelector('.gong');


right.addEventListener('mouseover',function(){
  hong.classList.add('active');
  hong.classList.remove('sizeup');
  gong_text.style = "opacity:1;";
  cursor_item.classList.add('change_gong');
})
right.addEventListener('mouseleave',function(){
  hong.classList.remove('active');
  hong.classList.remove('sizeup');
  gong_text.style = "opacity:0.1;";
  cursor_item.classList.remove('change_gong');
})
left.addEventListener('mouseover',function(){
  hong.classList.remove('active');
  hong.classList.add('sizeup');
  hong_text.style =  "opacity:1;"
  cursor_item.classList.add('change_hong');
})
left.addEventListener('mouseleave',function(){
  hong.classList.remove('active');
  hong.classList.remove('sizeup');
  hong_text.style =  "opacity:0.1;"
  cursor_item.classList.remove('change_hong');
})

/*btn_Ani*/
const left_btn = document.querySelector(".left .btn_wrap");
const left_btn_p1 = document.querySelector(".left .btn_wrap .btn p:nth-of-type(1)");
const left_btn_p2 = document.querySelector(".left .btn_wrap .btn p:nth-of-type(2)");
const left_btn_div = document.querySelector(".left .btn_wrap .btn div");

const right_btn = document.querySelector(".right .btn_wrap");
const right_btn_p1 = document.querySelector(".right .btn_wrap .btn p:nth-of-type(1)");
const right_btn_p2 = document.querySelector(".right .btn_wrap .btn p:nth-of-type(2)");
const right_btn_div = document.querySelector(".right .btn_wrap .btn div");

left_btn.addEventListener('mouseover',function(){
  left_btn_p1.classList.add('active');
  left_btn_p2.classList.add('active');
  left_btn_div.classList.add('active');
});
left_btn.addEventListener('mouseleave',function(){
  left_btn_p1.classList.remove('active');
  left_btn_p2.classList.remove('active');
  left_btn_div.classList.remove('active');
});

right_btn.addEventListener('mouseover',function(){
  right_btn_p1.classList.add('active');
  right_btn_p2.classList.add('active');
  right_btn_div.classList.add('active');
});
right_btn.addEventListener('mouseleave',function(){
  right_btn_p1.classList.remove('active');
  right_btn_p2.classList.remove('active');
  right_btn_div.classList.remove('active');
});
/*btn_Ani*/



/*
let pos = {y:0, y2:0, state:''}
window.addEventListener('scroll',function(){

  let sec4Hei = sec4.offsetTop;
  let yy = sec4Hei - this.scrollY/7;
  
  if(this.window.scrollY >= sec4Hei-winHei && this.window.scrollY < sec4Hei+winHei){

    pos.y = window.scrollY;
    if(pos.y > pos.y2){
        pos.state = true;                
    }else{
        pos.state = false;
    }
    pos.y2 = pos.y;

    if(pos.state){
        yy = yy/this.scrollY;
    }else{
        yy = yy/this.scrollY;
    }
    bg.style.transform = `scale(${yy*1.5})`;
  };

});


window.addEventListener('scroll',function(){

  let sec6Hei = sec6.offsetTop;
  let yy = sec6Hei - this.scrollY/6;
  
  if(this.window.scrollY >= sec6Hei-winHei && this.window.scrollY < sec6Hei+winHei){

    pos.y = window.scrollY;
    if(pos.y > pos.y2){
        pos.state = true;                
    }else{
        pos.state = false;
    }
    pos.y2 = pos.y;

    if(pos.state){
        yy = yy/this.scrollY;
    }else{
        yy = yy/this.scrollY;
    }
    sec6_bg.style.transform = `scale(${yy*1.5})`;
  };

})
*/

