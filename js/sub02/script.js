/* Break Point Cont */
const TAB_BREAK_POINT = 1440;
const MO_BREAK_POINT = 768;

const ROWS_PER_PAGE = 10;
const NUM_PER_PAGE_GROUP = 3;



/* ========== Initial Execute & Setting ========== */
let currentGroup = 0; // 페이지 그룹의 인덱스
let currentPage = 0;  // 페이지 숫자의 인덱스

// PC와 Tab, Mo 버전의 테이블 행 생성
createTable();
createMobileTable();



/* ========== DOM Element ========== */
const $table = document.querySelector('.column-table--yellow');
const $tableMo = document.querySelector('.table--mobile');

const $trs = $table.querySelectorAll('tbody tr');
const $mobilePosts = $tableMo.querySelectorAll('.post--mobile');
const $fixedPosts = $table.querySelectorAll('.fixed-post');
const $mobileFixedPosts = $tableMo.querySelectorAll('.fixed-post');

const postCount = $trs.length;  // 전체 게시글 수
const fixedCount = $fixedPosts.length;  // 고정 게시글 수
let pageCount = Math.ceil((postCount - fixedCount) / (ROWS_PER_PAGE - fixedCount)); //페이지 개수
let groupCount = Math.ceil(pageCount / NUM_PER_PAGE_GROUP); // 페이지 그룹 개수

const $arrowToPrev = document.querySelector('.table-page .fa-angle-left');
const $arrowToNext = document.querySelector('.table-page .fa-angle-right');
let $pageBtns = [];

const $searchToggle = document.querySelector('.table-top__toggle');
const $openToggleBtn = document.getElementById('openToggleBtn');
const $cancelBtn = document.getElementById('cancelBtn');
const $toggle_searchBtn = document.getElementById('toggle_searchBtn');
const $searchBtn = document.getElementById('searchBtn');

const $inputSearch = document.getElementById('inputSearch');

// 페이징 출력 대상 게시글들의 배열
let viewTrs = [];
let viewMobilePosts = [];

let isSearchMode = false;



/* ========== Execute function ========== */
// 공지 개수 카운트
//countPost();

// 기본 조회 모드로 렌더링
setNormalView();

// 이전, 다음 화살표 클릭
$arrowToPrev.addEventListener('click', arrowToPrevClick);
$arrowToNext.addEventListener('click', arrowToNextClick);

// 모바일 - 검색 토글 열림 닫힘 이벤트
$openToggleBtn.addEventListener('click', openToggleBtnClick);
document.addEventListener('click', toggleOutClick);
$cancelBtn.addEventListener('click', cancelBtnClick);

// 검색 버튼 클릭 이벤트
$searchBtn.addEventListener('click', onSearchClick);
$toggle_searchBtn.addEventListener('click', function(){
  $searchToggle.classList.remove('is-open');
  onSearchClick();
});
$searchToggle.addEventListener('submit', function(e){
  e.preventDefault();   // 리로드 막기
  onSearchClick();
});



/* ========== Define function ========== */
/* PC, Tab 버전 테이블에 행 생성 */
function createTable(){
  for(let i = 0; i < postObj.length; i++){
    const $row = document.createElement('tr');

    $row.innerHTML = `
    <th scope="row">${postObj[i].no}</th>
    <td class="post__title">${postObj[i].title}</td>
    <td class="post__writer">${postObj[i].writer}</td>
    <td class="post__date">${postObj[i].date}</td>`;

    document.querySelector('.column-table--yellow tbody').appendChild($row);
  }

  addClassToFixedPost('tr');
}

/* 모바일 버전 테이블에 행 생성 */
function createMobileTable(){
  for(let i = 0; i < postObj.length; i++){
    const $div = document.createElement('div');
    $div.classList.add('post--mobile');

    $div.innerHTML = `
    <div class="title--kr-xs">
      <div class="post__num">${postObj[i].no}</div>
      <div class="post__title">${postObj[i].title}</div>
    </div>
    <div class="body--kr-s">
      <span class="post__writer">${postObj[i].writer}</span>
      <span class="post__date">${postObj[i].date}</span>
    </div>`;

    document.querySelector('.table--mobile').appendChild($div);
  }

  addClassToFixedPost('.post--mobile');
}

/* 고정 행에 고정 클래스명 추가 */
function addClassToFixedPost(parentElem){
  const $megaphones = document.querySelectorAll('.fa-bullhorn');

  $megaphones.forEach(i => {
    const $fix = i.closest(parentElem);

    if($fix){
      $fix.classList.add('fixed-post');
    }
    else return;
  });
}

/* 페이지 숫자 버튼 생성 */
function renderPageBtns(){
  const $wrap = document.querySelector('.page__num-wrap');

  // 새로고침, 검색 결과 렌더 시마다 초기화 필요
  $wrap.innerHTML = ``;

  for(let i = 1; i <= pageCount; i++){
    $wrap.innerHTML += `<div class="page__number">${i}</div>`;
  }

  $pageBtns = [...document.querySelectorAll('.page__number')];

  // 페이지 버튼 클릭 시 해당되는 행 출력
  $pageBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      currentPage = idx;
      displayRow(currentPage);
    });
  });
}

/* 페이지에 해당되는 행들 화면에 출력 */
function displayRow(idx){
  const trsArray = [...$trs];
  const moArray = [...$mobilePosts];

  // 우선 게시글 전부 숨김
  trsArray.forEach(i => i.style.display = 'none');
  moArray.forEach(i => i.style.display = 'none');

  // 일반 모드일 때 고정글 노출
  if(!isSearchMode){
    trsArray.forEach(i => {
      if(i.classList.contains('fixed-post')) i.style.display = '';
    });
    moArray.forEach(i => {
      if(i.classList.contains('fixed-post')) i.style.display = '';
    });
  }
  
  // 페이징 대상에서 현재 페이지 slice
  // 페이지별 시작 게시글과 끝 게시글의 인덱스 번호
  const perPage = isSearchMode? ROWS_PER_PAGE : (ROWS_PER_PAGE - fixedCount);
  const start = perPage * idx;
  const end = start + perPage;

  // 현재 페이지에 해당하는 행만 표시
  viewTrs.slice(start, end).forEach(i => i.style.display = '');
  viewMobilePosts.slice(start, end).forEach(i => i.style.display = '');

  addClassToActivePageBtn(idx);
}

/* 클릭, 활성화된 페이지 숫자 버튼에 activ 클래스 추가 */
function addClassToActivePageBtn(idx){
  $pageBtns.forEach(i => i.classList.remove('active'));
  $pageBtns[idx].classList.add('active');
}

/* 페이지 번호 그룹지어 화면에 출력 */
function displayPageGroup(idx){
  $pageBtns.forEach(i => i.style.display = 'none');

  // 페이지 그룹 내 시작 페이지와 끝 페이지의 인덱스 번호
  const start = NUM_PER_PAGE_GROUP * idx;
  const end = start + NUM_PER_PAGE_GROUP - 1;

  const pageBtnsArray = [...$pageBtns];
  const activePageGroupArr = pageBtnsArray.slice(start, end + 1);

  activePageGroupArr.forEach(i => i.style.display = 'block');

  // 현재 보여지는 그룹의 인덱스 번호
  currentGroup = start / NUM_PER_PAGE_GROUP;

  disabledArrow();
}

/* 공지 개수 카운트 */
function countPost(count){
  document.getElementById('postCount').innerText = count;
}

/* 일반 조회 모드 설정(고정글 유지) */
function setNormalView(){
  isSearchMode = false;

  const trsArray = [...$trs];
  const moArray = [...$mobilePosts];

  // 고정글이 아니면서 페이지에 보여져야 할 행들로 배열 구성
  viewTrs = trsArray.filter(i => !i.classList.contains('fixed-post'));
  viewMobilePosts = moArray.filter(i => !i.classList.contains('fixed-post'));

  // 고정글 제외하고 한 페이지에 보여야 하는 게시글 수
  const normalPerPage = ROWS_PER_PAGE - fixedCount; // 7
  pageCount = Math.max(1, Math.ceil(viewTrs.length / normalPerPage));
  groupCount = Math.ceil(pageCount / NUM_PER_PAGE_GROUP);

  currentPage = 0;
  currentGroup = 0;

  renderPageBtns();
  displayRow(0);  // 초기 렌더링 위해 0 대입
  displayPageGroup(0);
  countPost(postCount);
}

/* 검색 모드 설정(고정글 해제) */
function setSearchView(matchedTrs, matchedMo){
  isSearchMode = true;

  viewTrs = matchedTrs;
  viewMobilePosts = matchedMo;

  pageCount = Math.max(1, Math.ceil(viewTrs.length / ROWS_PER_PAGE));
  groupCount = Math.ceil(pageCount / NUM_PER_PAGE_GROUP);

  currentPage = 0;
  currentGroup = 0;

  renderPageBtns();
  displayRow(0);  // 초기 렌더링 위해 0 대입
  displayPageGroup(0);
  countPost(matchedTrs.length);
}

/* 이전 화살표 클릭 이벤트 */
function arrowToPrevClick(){
  currentPage = currentGroup * NUM_PER_PAGE_GROUP - 1;
  displayRow(currentPage);
  displayPageGroup(--currentGroup);
  disabledArrow();
}

/* 다음 화살표 클릭 이벤트 */
function arrowToNextClick(){
  currentPage = (currentGroup + 1) * NUM_PER_PAGE_GROUP;
  displayRow(currentPage);
  displayPageGroup(++currentGroup);
  disabledArrow();
}

/* 이전, 다음 페이지 없을 때 화살표 스타일 */
function disabledArrow(){
  $arrowToPrev.classList.remove('page--disabled');
  $arrowToNext.classList.remove('page--disabled');

  if(currentGroup == 0){
    $arrowToPrev.classList.add('page--disabled');
  }
  else if(currentGroup == groupCount - 1){
    $arrowToNext.classList.add('page--disabled');
  }
  else return;
}

/* 검색 토글 열림 닫힘 이벤트 */
function openToggleBtnClick(e){
  e.stopPropagation();
  $searchToggle.classList.toggle('is-open');
}

function toggleOutClick(e){
  const isOpen = $searchToggle.classList.contains('is-open');

  if(isOpen && !$searchToggle.contains(e.target)){
    $searchToggle.classList.remove('is-open');
    $inputSearch.value = '';
  }
}

function cancelBtnClick(){
  $searchToggle.classList.remove('is-open');
}

/* 검색 버튼 클릭 이벤트 */
function onSearchClick(){
  const keyword = $inputSearch.value.trim();

  if(!keyword){ // 검색어 없을 시 일반 모드로 복귀하고 함수 종료
    setNormalView();
    return;
  }

  const kw = keyword.toLowerCase();

  const trsArray = [...$trs];
  const moArray = [...$mobilePosts];

  // 검색 결과 게시글 배열
  const matchedTrs = [];
  const matchedMo = [];

  postObj.forEach((post, idx) => {
    const title = String(post.title).toLowerCase();
    const writer = String(post.writer).toLowerCase();

    let ok = false; // 검색 결과 유무 판별

    if(selectedValue == 'allKeyword'){
      ok = title.includes(kw) || writer.includes(kw);
    }
    else if(selectedValue == 'titleKeyword'){
      ok = title.includes(kw);
    }
    else if(selectedValue ==  'writerKeyword'){
      ok = writer.includes(kw);
    }

    // postObj의 각 항목을 forEach로 돌다가 검색 결과가 없으면 해당 post는 넘어감
    if(!ok) return; 

    // 검색어를 포함한 게시글만 결과 배열에 push
    if(trsArray[idx]) matchedTrs.push(trsArray[idx]);
    if(moArray[idx]) matchedMo.push(moArray[idx]);
  });

  setSearchView(matchedTrs, matchedMo);
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

};

function enterMo(){
  
};

function enterPc(){
  
};



/* ========== Responsive - Define function  ========== */