// carousel 슬라이더 css 값
function getDeg(count){
    // 180+((360/7)*count)
    return 180+(360/7)*count>360?Math.abs((180+(360/7)*count)-360):180+(360/7)*count
}
/////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

    // 스크롤탑 방지
    $('a.no-scroll').on('click', function(event){
        event.preventDefault();
    });
    

    // scrollTop
    let scrTop = 0;
    let building_top = $(".building").offset().top;
    let building_height = $(".building").height(); // 애니메이션 속도감을 세팅
    let elv_height = $(".elv").height();
    let anime_length = building_height - elv_height; // 애니메이션 실질적 구간 !== building_height

    $(window).scroll(function(){
        scrTop = $(window).scrollTop()
        // console.log("현재 스크롤바가 위에서"+scrTop+"픽셀만큼 떨어져 있습니다")
        // 헤더 컬러 orange
        if(scrTop>=953){
            $("#logoHeader").attr("src","./img/logo_orange.png")
            $("#btnGnb").attr("src","./img/btn_gnb_o.png")
            $(".gnb .lang").css("color",`#ffa200`).css("border",`1px solid #ffa200`)
        }else{
            $("#logoHeader").attr("src","./img/logo_white.png")
            $("#btnGnb").attr("src","./img/btn_gnb_w.png")
            $(".gnb .lang").css("color",`#fff`).css("border",`1px solid #fff`)
        }


        // 스크롤 애니메이션
        let distance = scrTop - building_top;
        let anime_per = distance / anime_length * 100
        let num = anime_per / (100/7) // 구간마다 0-100% 
        let idx = Math.floor(num) // 0 1 2 3 4
        let iPer = num - idx // 0~1 > 100을 곱하면 0~100 사이의 수가 됨
        let per1 = distance/anime_length //0~>1
        let per2 = 1-per1 //1~>0
        let per3 = 0.5+per1*0.5//0.5~1
        let per4 = per1*130 //0~130
        let per5 = per1*-130 //0~-130
        console.log(scrTop,distance,anime_length);

        // 엘리베이터 도달하지 못한 상황
        if(distance < 0){
            // $(".cir1").css("transform",`translate(-175%, -50%)`)
            // $(".cir3").css("transform",`translate(75%, -50%)`)
            $(".elv").removeClass("fixed")
            $(".elv").removeClass("bottom")
        }

        // 엘리베이터 도달하여 진행중인 상황
        if(distance>=0  && distance<anime_length){
            $(".elv").addClass("fixed")
            $(".elv").removeClass("bottom")
            // $(".cir1").css("transform",`translate(${-130+per4}%,0)`)
            // $(".cir3").css("transform",`translate(${130+per5}%,0)`)
            if(per1 < 0.14){ // 원의 수평이동
                let transformPhase = per1 / 0.14; // 0 ~ 1
                $(".scr_cir>li").css("color","#000").css("background","#f7f7f7").css("border","1px solid rgb(220, 220, 220)");
                $(".cir2").css("transform", `translate(0)`);
                $(".cir1").css("transform", `translate(${-130 + transformPhase * 130}%, 0)`).css("opacity", 1);
                $(".cir3").css("transform", `translate(${130 - transformPhase * 130}%, 0)`).css("opacity", 1);
            }else if (per1 <= 0.28) { // 원 합치기
                let scalePhase = (per1 - 0.14) / 0.14; // 0 ~ 1
                $(".scr_cir>li").css("scale", 1 - scalePhase * 0.7).css("color","transparent").css("background","#ffa200").css("border","none");
                $(".cir1").css("opacity", 1 - scalePhase).css("background","transparent");
                $(".cir3").css("opacity", 1 - scalePhase).css("background","transparent");
                $(".starship").removeClass("on")
            }else if (per1 <= 0.42) { // 원 위로
                let transYPhase = (per1 -0.28) / 0.14; // 0 ~ 1
                let ypos = -transYPhase * 300;
                let xscale = 1-transYPhase*0.3;
                let yscale = 1+transYPhase*0.3;
                $(".cir2").css("transform", `translateY(${ypos}%) scale(${xscale},${yscale})`);
                $(".starship").addClass("on")
            } else if (per1 <= 0.56) { // 원 아래로
                let transYPhase = (per1 - 0.42) / 0.14; // 0 ~ 1
                let ypos = transYPhase * 300 - 300;
                let xscale = 0.7+transYPhase*0.6;
                let yscale = 1.3-transYPhase*0.6 ;
                $(".cir2").css("transform", `translateY(${ypos}%) scale(${xscale},${yscale})`);
                $(".starship").addClass("on")
                $(".with").removeClass("on")
            } else if (per1 <= 0.70) { // 원위로
                let transYPhase = (per1 - 0.56) / 0.14; // 0 ~ 1
                let ypos = -transYPhase * 300;
                let xscale = 1.3-transYPhase*0.6;
                let yscale = 0.7+transYPhase*0.6;
                $(".cir2").css("transform", `translateY(${ypos}%) scale(${xscale},${yscale})`);
                $(".starship").removeClass("on")
                $(".with").addClass("on")
            } else if (per1 <= 0.84) { // 원아래로
                let transYPhase = (per1 - 0.70) / 0.14; // 0 ~ 1
                let ypos = transYPhase * 300 - 300;
                let xscale = 0.7+transYPhase*0.6;
                let yscale = 1.3-transYPhase*0.6 ;
                $(".cir2").css("transform", `translateY(${ypos}%) scale(${xscale},${yscale})`);
                $(".with").addClass("on")
                $(".entertain").removeClass("on")
            } else if (per1 <= 1) { // 원위로
                let transYPhase = (per1 - 0.84) / 0.14; // 0 ~ 1
                let ypos = -transYPhase * 600;
                let xscale = 1.3-transYPhase*0.6;
                let yscale = 0.7+transYPhase*0.6;
                $(".cir2").css("transform", `translateY(${ypos}%) scale(${xscale},${yscale})`);
                $(".with").removeClass("on")
                $(".entertain").addClass("on")

                $(".cir1").css("opacity", 0);
                $(".cir2").css("opacity", 1);
                $(".cir3").css("opacity", 0);
            }
        }
        

        // 엘리베이터 벗어난 상황
        if(distance > anime_length){
            $(".elv").removeClass("fixed")
            $(".elv").addClass("bottom")
        }

    })


    // header:before 태그
    let gnbState = false;
    $(".btn_gnb").click(function(e){
        e.preventDefault()
        if(gnbState==false){
            $("header").addClass("on")
            $(".gnb_list").addClass("on")
            $("#logoHeader").attr("src","./img/logo_orange.png")
            $("#btnGnb").attr("src","./img/btn_close.png")
            $(".lang").css("color","#ffa200")
            $(".lang").css("border","1px solid #ffa200")
            gnbState=true
        }else{
            scrTop = $(window).scrollTop()
            if(scrTop>=953){
                $("#logoHeader").attr("src","./img/logo_orange.png")
                $("#btnGnb").attr("src","./img/btn_gnb_o.png")
                $(".gnb .lang").css("color",`#ffa200`).css("border",`1px solid #ffa200`)
            }else{
                $("#logoHeader").attr("src","./img/logo_white.png")
                $("#btnGnb").attr("src","./img/btn_gnb_w.png")
                $(".gnb .lang").css("color",`#fff`).css("border",`1px solid #fff`)
            }

            $("header").removeClass("on")
            $(".gnb_list").removeClass("on")
            gnbState=false
        }
    })



    // banner button
    let count = 0;
    $(".station_btn .btn_rt").click(function(e){
        e.preventDefault()
        count++
        if(count>2){count=0}
            $(".train").css("transform",`translateX(${count*-33.333}%)`)
            $(".banner_info>div").removeClass("on")
            $(".banner_info>div").eq(count).addClass("on")
    })
    $(".station_btn .btn_lt").click(function(e){
        e.preventDefault()
        count--
        if(count<0){count=0}
            $(".train").css("transform",`translateX(${count*-33.333}%)`)
            $(".banner_info>div").removeClass("on")
            $(".banner_info>div").eq(count).addClass("on")
    })



    // carousel 슬라이드 영역
    let carousel_count = 0;
    let per_deg = 360 / 7;
    // carousel 돌아감 origin(0,0)
    function rotateCarousel(count){
        $(".carousel").css("transform",`rotate(${-count * per_deg}deg)`);
        $(".carousel>div").each(function(index){
            $(this).css("transform",`rotate(${getDeg(index)}deg) translateX(35rem) rotate(${-getDeg(index)}deg) rotate(${count * per_deg}deg)`);
        });
        $(".carousel>div").removeClass("on");
        $(".carousel>div").eq(count % 7).addClass("on");
    }
            // 팬카페  
            function fanCafe(cid){
                const slideLinks = {
                    0: "https://cafe.daum.net/IVEstarship",
                    1: "https://cafe.daum.net/WJSNcosmic",
                    2: "https://cafe.daum.net/monsta-x",
                    3: "https://cafe.daum.net/cravity-official",
                    4: "https://cafe.daum.net/Hyungknight",
                    5: "https://cafe.daum.net/official-jeongsewoon",
                    6: ""
                };
                const link = slideLinks[cid];
                $(".artist").find('.fan_cafe').attr("href", link);
            }
            // 아티스트명 탭
            function artistTab(cid){
                $(".tap_artist li").removeClass("on");
                $(".tap_artist li").eq(cid).addClass("on");
            }
            // 아티스트명 SLIDE IN
            function artistName(cid){
                $(".artist_name>li").removeClass("on");
                $(".artist_name>li").eq(cid).addClass("on");
            }

    // 탭 클릭시 슬라이드가 돌아감
    $(".tap_artist>li").click(function(e){
        e.preventDefault()
        let clickedIndex = $(this).index();
        rotateCarousel(clickedIndex)
        artistTab(clickedIndex)
        artistName(clickedIndex)
        fanCafe(clickedIndex)
        // return false
    });
    // 슬라이드 클릭시 적용
    $(".carousel>div").click(function(){
        let clickedIndex = $(this).index();
        // 팬카페  
        fanCafe(clickedIndex)
        // 아티스트명 탭
        artistTab(clickedIndex) 
        // 아티스트명 SLIDE IN
        artistName(clickedIndex)
        rotateCarousel(clickedIndex)
    });
    // 버튼 클릭시 적용
    $(".carousel_btn .btn_rt").click(function(){
        carousel_count++;
        if(carousel_count>6){carousel_count=0}
        rotateCarousel(carousel_count)
        fanCafe(carousel_count)
        artistTab(carousel_count)
        artistName(carousel_count)
    });
    $(".carousel_btn .btn_lt").click(function(){
        carousel_count--;
        if(carousel_count<0){carousel_count=6}
        rotateCarousel(carousel_count)
        fanCafe(carousel_count)
        artistTab(carousel_count)
        artistName(carousel_count)
    });




    // 앨범 슬라이드 swiper
    let swiper = new Swiper(".album_station", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        on: {
            slideChange: function(){
              // 현재 센터에 있는 슬라이드의 인덱스를 가져옴
              // realIndex는 실제 중앙에 위치한 슬라이드의 인덱스를 제공
              // 모든 슬라이드에서 'on' 클래스 제거

              
                // if(centerIndex>){
                //     centerIndex = 
                // }
              // 중앙에 있는 슬라이드에 'on' 클래스 추가
            //   $(".album_cover > li").eq(centerIndex).addClass("on");
            //   console.log(centerIndex)
            //   // album_info도 동일하게 처리
            //   $(".album_info > li").removeClass("on");
            //   $(".album_info > li").eq(centerIndex).addClass("on");

            },
          },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
            
      swiper.on('slideChangeTransitionEnd', function () {
        let slideindex =this.realIndex
        // console.log(slideindex)

            $(".album_cover > li").removeClass("on");
            // $(".album_cover > li").eq(slideindex+2).addClass("on");
            $(".album_info > li").removeClass("on");
            // $(".album_info > li").eq(slideindex+2).addClass("on");
        
            idx = slideindex + 2
            if(idx >9)
            {
                idx = idx - 10
            }

            console.log(idx)
            $(`[data-swiper-slide-index='${idx}']`).addClass("on")
    })


      $(".album_cover>li").click(function(){
          $(".album_cover>li").removeClass("on");
          $(this).addClass("on");
          let cover_idx = $(this).index();
          $(".album_info>li").removeClass("on");
          $(".album_info>li").eq(cover_idx).addClass("on");

          swiper.slideTo(cover_idx); // 이동할 슬라이드 인덱스 전달
        });


    // 휠 애니메이션 적용
    $('.banner').on('wheel', function(event){
        var originalEvent = event.originalEvent;
        var delta = originalEvent.deltaY || -originalEvent.wheelDelta;

        if (delta > 0) {
            // 휠내렸을때
            console.log('Scrolling down in ' + this.id);
            $("html,body").stop().animate({"scrollTop":$(".artist").offset().top},600)
        } else {
            // 휠올렸을때
            console.log('Scrolling up in ' + this.id);
        }
        // Prevent default scrolling behavior
        event.preventDefault();
    });

    $('.artist').on('wheel', function(event){
        var originalEvent = event.originalEvent;
        var delta = originalEvent.deltaY || -originalEvent.wheelDelta;

        if (delta > 0) {
            // 휠내렸을때
            console.log('Scrolling down in ' + this.id);
            $("html,body").stop().animate({"scrollTop":$(".cl").offset().top},600)
        } else {
            // 휠올렸을때
            $("html,body").stop().animate({"scrollTop":$(".banner").offset().top},600)
            console.log('Scrolling up in ' + this.id);
        }
        // Prevent default scrolling behavior
        event.preventDefault();
    });

    $('.album').on('wheel', function(event){
        var originalEvent = event.originalEvent;
        var delta = originalEvent.deltaY || -originalEvent.wheelDelta;

        if (delta > 0) {
            event.preventDefault();
            // 휠내렸을때
            console.log('Scrolling down in ' + this.id);
            $("html,body").stop().animate({"scrollTop":$(".news").offset().top},600)
        } else {
            // 휠올렸을때
            // $("html,body").stop().animate({"scrollTop":$(".artist").offset().top},600)
            // console.log('Scrolling up in ' + this.id);
        }
        // Prevent default scrolling behavior
        
    });

    $('.news').on('wheel', function(event){
        var originalEvent = event.originalEvent;
        var delta = originalEvent.deltaY || -originalEvent.wheelDelta;

        if (delta > 0) {
            // 휠내렸을때
            // console.log('Scrolling down in ' + this.id);
            // $("html,body").stop().animate({"scrollTop":$(".album").offset().top},600)
        } else {
            // 휠올렸을때
            $("html,body").stop().animate({"scrollTop":$(".album").offset().top},600)
            console.log('Scrolling up in ' + this.id);
        }
        // Prevent default scrolling behavior
        event.preventDefault();
    });
    
    

    // 새로고침 시 탑으로 이동
    // $("html,body").stop().animate({"scrollTop":0},500)











})


    

























