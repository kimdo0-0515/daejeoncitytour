/* Break Point Cont */
const TAB_BREAK_POINT = 1440;
const MO_BREAK_POINT = 768;



/* ========== DOM Element ========== */
const $costBtn = document.getElementById('costBtn');
const $costToggle = document.querySelector('.cost-guide__toggle');

const $filterWrapPageBtn = document.querySelector('.section__filter-wrap .page-button > div');
const $searchBtn = $filterWrapPageBtn.querySelector('#searchBtn');

const $selectpicker = document.querySelector('.selectpicker');
const $moPriceTable = document.querySelector('.toggle__table-wrap-mo .row-table');

let currentProduct = null;

const $reserveModal = document.getElementById('reserveModal');
const $modalDatepicker = document.getElementById('modal_datepicker');
const $reserveNameInput = document.getElementById('reserveNameInput');
const $reserveTelInput = document.getElementById('reserveTelInput');
const $reserveNumInput = document.getElementById('reserveNumInput');
const $reserveAgreeCheck = document.getElementById('reserveAgreeCheck');
const $reserveSubmitBtn = document.getElementById('reserveSubmitBtn');



/* ========== Execute function ========== */
/* 관광 상품 아코디언 메뉴 DOM 생성 */
createAccdn();
const $reserveAccdns = document.querySelectorAll('.reserve-accdn');
const $accdnTitles = document.querySelectorAll('.accdn__title');
const $accdnPageBtn = document.querySelectorAll('.accdn__content .page-button > div');
const $reserveBtns = document.querySelectorAll('.accdn__content .btn');

/* 요금 안내 토글 열림 닫힘 이벤트 */
$costBtn.addEventListener('click', costBtnClick);
document.addEventListener('click', costToggleOutClick);

/* 모바일 가격 토글창 드롭다운 선택 시 내용 변경 */
$selectpicker.addEventListener('change', selectpickerChange);

/* 아코디언 메뉴 열림 닫힘 이벤트 */
$accdnTitles.forEach(accdn => {
  accdn.addEventListener('click', accdnClick);
});

/* 검색 기능 */
$searchBtn.addEventListener('click', searchBtnClick);

/* 모달 오픈 시 투어 이름 자동 입력 및 데이트피커 초기화 */
$reserveBtns.forEach(btn => {
  btn.addEventListener('click', onReserveBtnClick);
});

/* 모달 닫을 때 입력값 초기화 */
$reserveModal.addEventListener('hidden.bs.modal', onReserveModalHidden);

/* 모달 완료 버튼 클릭 시 필수입력 여부 확인 */
$reserveSubmitBtn.addEventListener('click', checkRequiredInput);

/* 필수입력 표시 상태에서 값 입력 감지 */
$reserveNameInput.addEventListener('input', checkInputEvt);
$reserveTelInput.addEventListener('input', checkInputEvt);
$reserveNumInput.addEventListener('input', checkInputEvt);
$reserveAgreeCheck.addEventListener('input', checkInputEvt);



/* ========== Define function ========== */
function costBtnClick(e){
  e.stopPropagation(); // 이벤트가 DOM 트리를 따라 부모 요소로 전파되는 것 방지
  $costToggle.classList.toggle('is-open');
}

function costToggleOutClick(e){
  const isOpen = $costToggle.classList.contains('is-open');

  if(isOpen && !$costToggle.contains(e.target)){
    $costToggle.classList.remove('is-open');
  }
}

function selectpickerChange(e){
  const selectedValue = e.target.value;
  let selectedObj;

  for(let i = 0; i < priceObj.length; i++){
    if(selectedValue == priceObj[i].value){
      selectedObj = priceObj[i];
      break;
    }
  }

  $moPriceTable.querySelector('tr:nth-child(1) td').innerText = `${selectedObj.adult}`;
  $moPriceTable.querySelector('tr:nth-child(2) td').innerText = `${selectedObj.student}`;
  $moPriceTable.querySelector('tr:nth-child(3) td').innerText = `${selectedObj.discount}`;
  $moPriceTable.querySelector('tr:nth-child(4) td').innerText = `${selectedObj.group}`;
}

// 객체 정보로 아코디언 메뉴 생성 함수
function createAccdn(){
  for(let i = 0; i < productsObj.length; i++){
    const $div = document.createElement('div');
    $div.classList.add('reserve-accdn');
    $div.id = `${productsObj[i].id}`;
    $div.setAttribute('data-title', `${productsObj[i].title}`);
    $div.setAttribute('data-filter', `${productsObj[i].filter}`);

    $div.innerHTML = `
    <div class="accdn__title">
      <img src="${productsObj[i].imgPath}" alt="상품 썸네일">
      <div class="accdn__product">
        <div class="product__label-wrap title--kr-xs">
          ${productsObj[i].label}
        </div>
        <div class="product__title-wrap">
          <div class="title--kr-l">${productsObj[i].title}</div>
          <p class="body--kr-s">
            ${productsObj[i].schedule}
          </p>
        </div>
      </div>
      <i class="fa-solid fa-chevron-down icon--xlarge"></i>
      <div class="accdn__arrow-mo">
        <span>상세 일정</span>
        <i class="fa-solid fa-chevron-down icon--large"></i>
      </div>
    </div>
    <div class="accdn__content">
      <ul class="accdn__plan-wrap">
      </ul>
      <div class="page-button">
        <div class="page-button-right">
          <button class="btn btn--large btn--green" data-bs-toggle="modal" data-bs-target="#reserveModal"><span>예약하기</span></button>
        </div>
      </div>
    </div>`;

    document.querySelector('.section__list').appendChild($div);

    createPlan(i);
  }
}

function createPlan(i){
  for(let j = 0; j < productsObj[i].plan.length; j++){
    const $li = document.createElement('li');
    $li.classList.add('plan');

    $li.innerHTML = `
    <i class="fa-solid ${productsObj[i].plan[j].icon} icon--medium"></i>
    <span class="title--kr-xs">${productsObj[i].plan[j].time}</span>
    <p class="body--kr-m">${productsObj[i].plan[j].content}</p>`;

    document.querySelector(`#${productsObj[i].id} .accdn__plan-wrap`).appendChild($li);
  }
}

function searchBtnClick(e){
  e.preventDefault(); // 버튼의 submit 기능 방지

  const filterValue = document.querySelector('input[name="filterReserve"]:checked').value;
  
  // 선택된 날짜 유효성 확인
  const hasDate = filterPickedDate && filterPickedDate instanceof Date;
  
  // 우선 모두 숨김 및 검색 결과를 반환할 배열 생성
  $reserveAccdns.forEach(i => i.style.display = 'none');
  const searchResult = [];

  /* forEach에서 return으로 continue 기능 수행
  객체 배열에 대한 forEach로 조건에 만족하지 않는 것들은 건너뛰고
  해당되는 것들만 화면에 출력 */
  productsObj.forEach(product => {
    // 객체 요소의 filter값이 선택된 값이 다르면 continue
    if(filterValue != 'allCourse' && product.filter != filterValue) return;
    // 선택된 날짜가 유효하고 !(false), 즉 날짜 조건을 만족하지 못하면 continue
    if(hasDate && !isTourOnDate(product)) return;

    searchResult.push(document.getElementById(product.id));
  });

  if(searchResult.length === 0) swalNoSearchResult();
  else searchResult.forEach(i => i.style.display = 'block');
}

function isTourOnDate(product){
  const pickedMonth = window.filterPickedDate.getMonth() + 1;
  const pickedDay = window.filterPickedDate.getDay();

  return (product.month.includes(pickedMonth) && product.day.includes(pickedDay));
}

function accdnClick(){
  let parentAccdn = this.closest('.reserve-accdn');

  if(parentAccdn.classList.contains('active')){
    parentAccdn.classList.remove('active');
  }
  else{
    $accdnTitles.forEach(i => {
      i.closest('.reserve-accdn').classList.remove('active')
    });
    parentAccdn.classList.add('active');
  }
}

function onReserveBtnClick(){
  const parentAccdn = this.closest('.reserve-accdn');
  const productId = parentAccdn.id;

  // find: 콜백함수 조건을 만족하는 첫번째 요소만 반환
  currentProduct = productsObj.find(i => i.id === productId);

  $reserveModal.querySelector('.form-item:first-child input').value = parentAccdn.dataset.title;

  initModalDatepicker(currentProduct);
}

// 모달창의 데이트피커 초기화
function initModalDatepicker(product){
  // 옵션 변경 불가로 인해 destroy 후 재생성
  $('#modal_datepicker').datepicker('destroy');

  $('#modal_datepicker').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    showWeekDays: true,
    todayHighlight: true,
    orientation: 'bottom left',
    language: "ko",
    maxViewMode: "years",
    startDate: '+2d',  // 선택 가능한 시작날짜 (오늘로부터 2일 뒤)
    daysOfWeekDisabled: getDisabledDays(product.day), // 요일 비활성화
    beforeShowDay(date){  // 월 조건 포함한 최종 필터
      const month = date.getMonth() + 1;
      const day = date.getDay();

      const isMonthOk = product.month.includes(month);
      const isDayOk = product.day.includes(day);

      if(isMonthOk && isDayOk){
        return{
          enabled: true,
          classes: 'available-date',  // 강조용 클래스 추가
        }
      }

      return false;
    }
  });

  // 날짜로 검색 시 검색한 날짜가 예약 신청 폼에 미리 입력되어 있게 함
  if(window.filterPickedDate){
    $('#modal_datepicker')
      .datepicker('setDate', window.filterPickedDate); // setDate가 정석
  }
  
}

// 투어 상품의 미운행 요일 구하기
function getDisabledDays(allowedDays){
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  // 미운행 요일만 필터링해서 배열로 반환
  return allDays.filter(i => !allowedDays.includes(i));
}

// 모달 닫을 때 입력값들 초기화
function onReserveModalHidden(){
  window.modalPickedDate = null;
  currentProduct = null;

  // 입력값과 선택 상태 제거
  $('#modal_datepicker').datepicker('clearDates');

  $reserveNameInput.value = '';
  $reserveTelInput.value = '';
  $reserveNumInput.value = '0';
  $reserveAgreeCheck.checked = false;
}

function checkRequiredInput(){
  const reserveNameVal = $reserveNameInput.value;
  const reserveTelVal = $reserveTelInput.value;
  const reserveNumVal = Number($reserveNumInput.value);

  let isAgreeChecked = false;

  if($reserveAgreeCheck.checked) isAgreeChecked = true;
  else isAgreeChecked = false;

  if(!window.modalPickedDate) $modalDatepicker.classList.add('require');
  if(reserveNameVal == '') $reserveNameInput.classList.add('require');
  if(reserveTelVal == '') $reserveTelInput.classList.add('require');
  if(reserveNumVal === 0) $reserveNumInput.classList.add('require');
  if(isAgreeChecked == false) $reserveAgreeCheck.classList.add('require');

  const inputArray = [$modalDatepicker, $reserveNameInput, $reserveTelInput, $reserveNumInput, $reserveAgreeCheck];

  // some: 콜백 함수 조건을 만족하면 true 반환
  const hasRequire = inputArray.some(i => i.classList.contains('require'));
  if (hasRequire) return;

  // 모든 요소들에 require 클래스가 없다면 정상 제출하고 페이지 새로고침
  swalSubmitReserve();
}

function checkInputEvt(e){
  const t = e.target;

  // number
  if(t === $reserveNumInput){
    if(Number(t.value) > 0) t.classList.remove('require');
    return;
  }

  //checkbox
  if(t === $reserveAgreeCheck){
    if(t.checked) t.classList.remove('require');
    return;
  }

  //text, tel
  if(t.value.trim() !== '') t.classList.remove('require');
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
  costBtnChange('btn--small', 'btn--medium');
  filterWrapPageBtnChange('page-button-wide', 'page-button-right');
  accdnPageBtnChange('page-button-wide', 'page-button-right');
  modalInputSizeChange('input-field--small', 'input-field--medium');
  modalInputSizeChange('date-wrap--small', 'date-wrap--medium');
  modalInputSizeChange('number-wrap--small', 'number-wrap--medium');
}

function enterMo(){
  costBtnChange('btn--medium', 'btn--small');
  filterWrapPageBtnChange('page-button-right', 'page-button-wide');
  accdnPageBtnChange('page-button-right', 'page-button-wide');
  modalInputSizeChange('input-field--medium', 'input-field--small');
  modalInputSizeChange('date-wrap--medium', 'date-wrap--small');
  modalInputSizeChange('number-wrap--medium', 'number-wrap--small');
}

function enterPc(){
  costBtnChange('btn--small', 'btn--medium');
  filterWrapPageBtnChange('page-button-right', 'page-button-wide');
  accdnPageBtnChange('page-button-wide', 'page-button-right');
  modalInputSizeChange('input-field--small', 'input-field--medium');
  modalInputSizeChange('date-wrap--small', 'date-wrap--medium');
  modalInputSizeChange('number-wrap--small', 'number-wrap--medium');
}



/* ========== Responsive - Define function  ========== */
/* 요금 안내 버튼 크기 변경 */
function costBtnChange(clsRemove, clsAdd){
  $costBtn.classList.remove(clsRemove);
  $costBtn.classList.add(clsAdd);
}

/* 검색하기 버튼 너비 변경 */
function filterWrapPageBtnChange(clsRemove, clsAdd){
  $filterWrapPageBtn.classList.remove(clsRemove);
  $filterWrapPageBtn.classList.add(clsAdd);
}

/* 예약하기 버튼 너비 변경 */
function accdnPageBtnChange(clsRemove, clsAdd){
  $accdnPageBtn.forEach(i => {
    i.classList.remove(clsRemove);
    i.classList.add(clsAdd);
  });
}

/* 모달창 내 입력필드 변경 */
function modalInputSizeChange(clsRemove, clsAdd){
  const targets = $reserveModal.querySelectorAll('.' + clsRemove);
  targets.forEach(i => i.classList.add(clsAdd));
  targets.forEach(i => i.classList.remove(clsRemove));
}