/* Break Point Cont */
const TAB_BREAK_POINT = 1440;
const MO_BREAK_POINT = 768;

/* ========== DOM Element ========== */
const $masilSec = document.getElementById('masilSec');
const $filterMasil = document.querySelectorAll('#masilSec label.filter');
const $busImg = document.querySelector('.bus-img');
const $masilCourseWrap = document.querySelector('.masil-course-wrap');
const $masilCourse = document.querySelectorAll('.masil-course');

const $bakeryWrap = document.getElementById('bakeryWrap');
const $bakeries = document.querySelectorAll('.bakery');
const $specialSummer = document.getElementById('specialSummer');
const $summerImg1 = document.getElementById('summerImg1');
const $specialBtns = document.querySelectorAll('.section__special .btn');

const $hotelSlides = document.querySelectorAll('#hotelSwiper .swiper-slide');

const $busSecPageBtn = document.querySelectorAll('#busSec .page-button > div');

const $scrollController = document.querySelector('.scroll-controller');
const $floatingWrap = document.querySelector('.floating-wrap');
const $faqBtn = document.querySelector('#faqBtn');
const $closeBtn = document.querySelector('#closeBtn');
const $floatingToggle = document.querySelector('.floating-toggle');
const $floatingAccdnTitle = $floatingToggle.querySelectorAll('.accdn__title');



/* ========== Swiper Slide ========== */
/* 메인 비주얼 */
var mainVisual = new Swiper("#mainVisual", {
  loop: true,
  effect: "fade",
   autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* 특별 코스 - 여름 숲스테이 */
var summerSwiper = new Swiper("#summerSwiper", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 2000
  },
});
summerSwiper.autoplay.stop(); // 자동재생 정지로 초기화

/* 특별 코스 - 가을 뮤직버스 */
var autumnSlide = new Swiper("#autumnSlide", {
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  allowTouchMove: false,
  slidesPerView: 'auto',
  speed: 5000,
});

/* 새로운 소식 */
let popupSlide = null;

function initPopupSlide(){
  if(popupSlide) return;

  popupSlide = new Swiper("#popupZone", {
    loop: true,
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  popupSlide.el.classList.remove('none-swiper');
}

function destroyPopupSlide(){
  if(!popupSlide) return;

  popupSlide.destroy(true, true);
  popupSlide = null;

  document.getElementById('popupZone').classList.add('none-swiper');
}

initPopupSlide();


/* 제휴 호텔 */
var hotelSwiper = new Swiper( "#hotelSwiper", {
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  allowTouchMove: false,
  slidesPerView: 'auto',
  speed: 5000,
});



/* ========== Execute function ========== */
// 페이지 최초 로드 시 포트폴리오 소개 모달 출력
window.addEventListener('load', function(){
  $('#portfolioModal').modal('show');
});

/* 마실 코스 필터 버튼 및 버스 애니메이션 상수 객체 */
const BUS_ANI_CONST = {
  DELAY_STEP: 500,
  BUS_LEFT_STEP: 112,
  BUS_TOP_OFFSET: 12,
};
const MASIL_THRESHOLD = 0.5;

let masilTimers = []; // 필터 버튼 꼬임 방지 위함

// 최초 1회 기본 실행
observeOnce($masilSec, playDefaultMasilAni, MASIL_THRESHOLD);

// 필터 버튼 클릭 시 해당 코스 애니메이션 실행
$filterMasil.forEach(filter => {
  filter.addEventListener('click', filterMasilClick);
});

/* 특별 코스 - 빵시투어 베이커리 블록 플로팅 이벤트 */
// 상수 객체
const BAKERY_CONST = {
  THRESHOLD: 0.5,
  DELAY_STEP: 500
};

// 최초 1회 기본 실행
observeOnce($bakeryWrap, floatBakery, BAKERY_CONST.THRESHOLD);

/* 특별 코스 - 숲스테이 백그라운드 클립 이벤트 */
const SUMMER_CONST = {
  THRESHOLD: 0.5,
};

// 초기 로드 시 bgclip 초기 상태 설정 후 최초 1회 bgclip 애니메이션 실행
$summerImg1.classList.add('is-primed');
observeOnce($specialSummer, playBgClipOnce, SUMMER_CONST.THRESHOLD);

/* 제휴 호텔 마우스 호버 시 정지 이벤트 */
hotelSwiper.el.addEventListener('mouseenter', hotelSwiperMouseEnter); 
hotelSwiper.el.addEventListener('mouseleave', hotelSwiperMouseLeave);

/* 스크롤 컨트롤러와 FAQ 플로팅 버튼이 보이는 타이밍 */
scrollFAQDisplay();
window.addEventListener('scroll', scrollFAQDisplay);

/* FAQ 플로팅 버튼 */
$faqBtn.addEventListener('click', faqAndCloseBtnClick($faqBtn, $closeBtn, `flex`));
$closeBtn.addEventListener('click', faqAndCloseBtnClick($closeBtn, $faqBtn, `none`));

/* FAQ 아코디언 이벤트 */
$floatingAccdnTitle.forEach(accdn => {
  accdn.addEventListener('click', floatingAccdnClick);
});



/* ========== Define function ========== */
/* IntersectionObserver 공통 함수 */
function observeOnce(targetEl, playFunc, reachPercent) {
  // targetEl : 관찰 대상 DOM 요소
  // playFunc : 해당 영역에 들어왔을 때 실행시킬 함수
  // reachPercent : 해당 영역에 몇 % 들어왔을 때 콜백함수 실행시킬지 결정

  if (!targetEl) return;  // targetEl 없을 시 return

  let hasPlayed = false;

  // IntersectionObserver 생성자
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;  // 해당 섹션이 intersection되지 않았다면 rerutn
      if (hasPlayed) return;  // hasPlayed = true면 return

      hasPlayed = true;
      playFunc();

      observer.disconnect();  // 1회 실행 후 감시 해제
    });
  }, {
    threshold: reachPercent
  });

  // 대상 요소에 대한 감시 실행
  observer.observe(targetEl);
}

/* 마실 코스 */
// 섹션 도달 시 최초 1회 실행 함수
function playDefaultMasilAni(){
  const checkedRadio = $masilSec.querySelector('input[name="filterMasil"]:checked');
  const firstRadio = $masilSec.querySelector('input[name="filterMasil"]');
  const radio = checkedRadio || firstRadio; // checkedRadio로 초기화, 없으면 firstRadio로 초기화

  if(!radio) return;  // radio 변수가 null이면 return

  const targetId = radio.dataset.target;

  runMasilAniByTargetId(targetId);
}

// 요일 필터 버튼 클릭 시 이벤트 실행 함수
function filterMasilClick(){
  const targetId = this.querySelector('input[type="radio"]').dataset.target;
  runMasilAniByTargetId(targetId);
}

// 요일 코스 화면 출력 애니메이션 함수
function runMasilAniByTargetId(targetId){
  clearMasilTimers();

  $masilCourse.forEach(course => {
    course.style.display = 'none';
    course.querySelectorAll('.masil').forEach(i => i.classList.remove('float'));

    if(course.id == targetId){
      course.style.display = 'flex';
      const $masilList = course.querySelectorAll('.masil');

      $masilList.forEach((masil, index) => {
        const tid = setTimeout(() => {
          masil.classList.add('float');
          if(index % 2 == 0) moveBus(masil, 0);
          else moveBus(masil, 1);
        }, index * BUS_ANI_CONST.DELAY_STEP);

        masilTimers.push(tid);  // 나중에 취소할 수 있도록 배열에 저장
      });
    }
  });
}

// 이전 타임아웃 취소 함수
function clearMasilTimers(){
  masilTimers.forEach(tid => clearTimeout(tid));
  masilTimers = [];
}

// 버스 이미지 이동 애니메이션 함수
function moveBus(masil, direction){
  const masilRect = masil.getBoundingClientRect();  // 마실코스 박스 좌표
  const wrapRect = $masilCourseWrap.getBoundingClientRect();  // 버스 트랙 출발점 좌표

  const busTop = masilRect.top - wrapRect.top + BUS_ANI_CONST.BUS_TOP_OFFSET;
  const busLeft = BUS_ANI_CONST.BUS_LEFT_STEP * direction;

  $busImg.style.top = `${busTop}px`;
  $busImg.style.left = `${busLeft}px`;
}

/* 특별 코스 - 빵시투어 베이커리 플로팅 함수 */
function floatBakery(){
  $bakeries.forEach((bakery, index) => {
    setTimeout(() => {
      bakery.classList.add('float');
    }, index * BAKERY_CONST.DELAY_STEP);
  });
}

/* 특별 코스 - 숲스테이 bgclip 애니메이션 함수 */
function playBgClipOnce(){
  $summerImg1.classList.add('bgclip');

  // 애니메이션 종료되면 bg clip 요소 제거
  // 1회만 실행하고 해당 이벤트 리스너 제거
  $summerImg1.addEventListener('animationend', bgclipAnimationEnd, { once: true }); 
}

function bgclipAnimationEnd(){
  $summerImg1.classList.remove('is-primed');
  summerSwiper.autoplay.start();  // 슬라이더 자동 재생 시작
}

/* 제휴 호텔 영역 */
let hotelTransform; // 스와이퍼 제어 위한 변수

function hotelSwiperMouseEnter(){
  hotelTransform = hotelSwiper.slidesEl.style.transform;

  hotelSwiper.slidesEl.style.transform = 'translate3d(' + hotelSwiper.slidesEl.getBoundingClientRect().left + 'px, 0px, 0px)'; 

  hotelSwiper.autoplay.stop();
}

function hotelSwiperMouseLeave(){
  hotelSwiper.slidesEl.style.transform = hotelTransform; 

  hotelSwiper.autoplay.start(); 
}

/* 스크롤 컨트롤러 & 플로팅 버튼 */
function scrollFAQDisplay(){
  const scrollTop = window.scrollY;
  const viewportHeight = document.getElementById('mainVisualSec').getBoundingClientRect().height;
  
  if(scrollTop <= viewportHeight){
    $scrollController.classList.remove('visibile');
    $floatingWrap.classList.remove('visibile');
  }
  else{
    $scrollController.classList.add('visibile');
    $floatingWrap.classList.add('visibile');
  }
}

function faqAndCloseBtnClick(activeRemove, activeAdd, displayOpt){
  // active를 remove할 대상, active를 add할 대상, display 속성값
  return function(){
    activeRemove.classList.remove('active');
    activeAdd.classList.add('active');

    $floatingToggle.style.display = displayOpt;
  };
}

function floatingAccdnClick(){
  let $parentAccdn = this.closest('.accdn');

  if($parentAccdn.classList.contains('active')){
    $parentAccdn.classList.remove('active');
  }
  else{
    $floatingAccdnTitle.forEach(i => {
      i.closest('.accdn').classList.remove('active');
    });
    $parentAccdn.classList.add('active');
  }
}



/* ========== Responsive - Execute function  ========== */
window.addEventListener('resize', screenResize);
screenResize();

function screenResize(){
  const screenW = window.innerWidth;
  if(screenW > MO_BREAK_POINT && screenW <= TAB_BREAK_POINT){
    enterTab();
  }
  else if(screenW <= MO_BREAK_POINT){
    enterMo();
  }
  else{
    enterPc();
  }
}

function enterTab(){
  /* 특별 코스 영역 버튼 스타일 변경 */
  specialBtnChange('btn--green', 'btn--yellow');

  /* 팝업존 슬라이드 해제 */
  destroyPopupSlide();

  /* 제휴 호텔 슬라이드 클릭 시 레이어 */
  hotelSlideActiveLayer();

  /* 시티투어 이용 안내 버튼 크기 변경 */
  busSecBtnChange('page-button-right', 'page-button-wide');
  
  /* 푸터 로고 슬라이드 해제 */
  if(window.footerSwiperAPI){  // footer가 완전히 load 되면 실행
    footerSwiperAPI.destroy();
  }
}

function enterMo(){
  /* 특별 코스 영역 버튼 스타일 변경 */
  specialBtnChange('btn--green', 'btn--yellow');

  /* 팝업존 슬라이드 초기화 */
  initPopupSlide();

  /* 제휴 호텔 슬라이드 클릭 시 레이어 */
  hotelSlideActiveLayer();

  /* 시티투어 이용 안내 버튼 크기 변경 */
  busSecBtnChange('page-button-right', 'page-button-wide');

  /* 푸터 로고 슬라이드 해제 */
  if(window.footerSwiperAPI) {
    footerSwiperAPI.destroy();
  }
}

function enterPc(){
  /* 특별 코스 영역 버튼 스타일 초기화 */
  specialBtnChange('btn--yellow', 'btn--green');

  /* 팝업존 슬라이드 초기화 */
  initPopupSlide();

  /* 시티투어 이용 안내 버튼 크기 변경 */
  busSecBtnChange('page-button-wide', 'page-button-right');

  /* 푸터 로고 슬라이드 초기화 */
  if(window.footerSwiperAPI) {
    footerSwiperAPI.init();
  }
}



/* ========== Responsive - Define function  ========== */
/* 특별 코스 내 버튼 변경 */
function specialBtnChange(clsRemove, clsAdd){
  // clsRemove : 제거할 클래스명, clsAdd : 추가할 클래스명
  $specialBtns.forEach(btn => {
    btn.classList.remove(clsRemove);
    btn.classList.add(clsAdd);
  });
}

/* 제휴 호텔 슬라이드 클릭 이벤트 */
function hotelSlideActiveLayer(){
  hotelSlideClick();
  hotelSlideOutClick();
}

function hotelSlideClick(){
  $hotelSlides.forEach(slide => {
    slide.addEventListener('click', function(){
      $hotelSlides.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    })
  });
}

function hotelSlideOutClick(){
  document.addEventListener('click', function(e){
    const $activeHotelSlide = document.querySelector('#hotelSwiper .swiper-slide.active');
    if($activeHotelSlide && !$activeHotelSlide.contains(e.target)){
      $activeHotelSlide.classList.remove('active');
    }
  });
}

/* 시티투어 이용 안내 버튼 크기 변경 */
function busSecBtnChange(clsRemove, clsAdd){
  $busSecPageBtn.forEach(btn => {
    btn.classList.remove(clsRemove);
    btn.classList.add(clsAdd);
  });
}