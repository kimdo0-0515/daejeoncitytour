/* Break Point Cont */
const TAB_BREAK_POINT = 1440;
const MO_BREAK_POINT = 768;



/* ========== DOM Element ========== */
const $reviewCount = document.getElementById('reviewCount');



/* ========== Execute function ========== */
/* 리뷰 DOM 생성 */
createReview();
const $reviews = document.querySelectorAll('.review');
const $thumbsIcons = document.querySelectorAll('.review__rating i');
const $arrowBtns = document.querySelectorAll('.review__arrow-mo');

/* 전체 리뷰 개수 카운트 */
countReview();

/* 모바일 - 더보기 버튼 클릭 */
$arrowBtns.forEach(btn => {
  btn.addEventListener('click', arrowBtnClick);
});



/* ========== Define function ========== */
// 객체 정보로 리뷰 UI 생성
function createReview(){
  for(let i = 0; i < reviewObj.length; i++){
    const $div = document.createElement('div');
    $div.classList.add('review');
    $div.id = `${reviewObj[i].id}`;

    $div.innerHTML = `
    <div class="review__text-wrap">
      <div class="title--kr-s">${reviewObj[i].title}</div>
      <div class="review__info body--kr-s">
        <div class="review__write">
          <span class="writer">${reviewObj[i].writer}</span>
          <span class="date">${reviewObj[i].date}</span>
        </div>
        <div class="review__rating ${reviewObj[i].rating}">
          <i class="fa-solid icon--large"></i>
          <span></span>
        </div>
      </div>
      <div class="review__content">${reviewObj[i].content}</div>
      <div class="review__arrow-mo">
        <span>더보기</span>
        <i class="fa-solid fa-chevron-down icon--large"></i>
      </div>
    </div>
    <div class="review__img-wrap">
      <img src="${reviewObj[i].img01}" alt="리뷰 이미지">
      <img src="${reviewObj[i].img02}" alt="리뷰 이미지">
      <img src="${reviewObj[i].img03}" alt="리뷰 이미지">
    </div>`;

    document.querySelector('.content').appendChild($div);

    createRating(i);
  }
}

function createRating(i){
  const $reviewRating = document.getElementById(`${reviewObj[i].id}`).querySelector('.review__rating');

  const isLike = $reviewRating.classList.contains('rating--blue');

  if(isLike){
    $reviewRating.querySelector('i').classList.add('fa-thumbs-up');
    $reviewRating.querySelector('span').innerText = '이 투어를 추천해요';
  }
  else{
    $reviewRating.querySelector('i').classList.add('fa-thumbs-down');
    $reviewRating.querySelector('span').innerText = '개선이 필요해요';
  }
}

function countReview(){
  $reviewCount.innerText = $reviews.length;
}

function arrowBtnClick(){
  const $reviewContent = this.previousElementSibling;

    if($reviewContent.classList.contains('active')){
      $reviewContent.classList.remove('active');
      this.querySelector('span').innerText = '더보기';
    }
    else{
      $reviewContent.classList.add('active');
      this.querySelector('span').innerText = '닫기';
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
  thumbsIconsSizeChange();
}

function enterMo(){
  thumbsIconsSizeChange();
}

function enterPc(){
  thumbsIconsSizeChange();
}



/* ========== Responsive - Define function  ========== */
/* 엄지 아이콘 크기 변경 */
function thumbsIconsSizeChange(){
  $thumbsIcons.forEach(icon => {
    if(icon.classList.contains('icon--large')){
      icon.classList.remove('icon--large');
      icon.classList.add('icon--medium');
    }
    else{
      icon.classList.remove('icon--medium');
      icon.classList.add('icon--large');
    }
  });
}
