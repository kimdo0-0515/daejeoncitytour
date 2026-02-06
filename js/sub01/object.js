/* 상품별 일정표 객체 배열 */
const productsObj = [
  { // 화요 마실코스
    id: 'accdn01',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [2],
    imgPath: 'img/sub01/masil_garden.jpg',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '화요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 화요일 운영',
    plan: [ // plan별 아이콘, 시간, 내용
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-sun-plant-wilt',
        time: '10:30 ~ 11:30',
        content: '명상정원'
      },
      { icon: 'fa-utensils',
        time: '12:00 ~ 13:00',
        content: '중식(중앙시장)'
      },
      { icon: 'fa-landmark',
        time: '13:30 ~ 14:30',
        content: '뿌리공원/한국족보박물관'
      },
      { icon: 'fa-person-hiking',
        time: '15:00 ~ 16:15',
        content: '상소동산림욕장'
      },
      { icon: 'fa-bus-simple',
        time: '16:45',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '대전트래블라운지 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전시청 남문광장 하차'
      }
    ]
  },
  { // 수요 마실코스
    id: 'accdn02',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [3],
    imgPath: 'img/sub01/masil_temi.png',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '수요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 수요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-caret-right',
        time: '10:10 ~ 11:30',
        content: '테미오래'
      },
      { icon: 'fa-utensils',
        time: '11:40 ~ 13:00',
        content: '중식(중앙시장)'
      },
      { icon: 'fa-monument',
        time: '13:30 ~ 15:00',
        content: '국립대전현충원'
      },
      { icon: 'fa-palette',
        time: '15:20 ~ 16:00',
        content: '대전시립미술관'
      },
      { icon: 'fa-bus-simple',
        time: '16:40',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '대전트래블라운지 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전시청 남문광장 하차'
      }
    ]
  },
  { // 목요 마실코스
    id: 'accdn03',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [4],
    imgPath: 'img/sub01/masil_jangtaesan.jpg',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '목요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 목요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-mountain',
        time: '10:50 ~ 12:00',
        content: '장태산자연휴양림'
      },
      { icon: 'fa-utensils',
        time: '12:00 ~ 13:30',
        content: '중식(인근식당)'
      },
      { icon: 'fa-landmark',
        time: '14:10 ~ 15:10',
        content: '대전근현대사전시관'
      },
      { icon: 'fa-school',
        time: '15:20 ~ 16:20',
        content: '한밭교육박물관'
      },
      { icon: 'fa-bus-simple',
        time: '16:40',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '대전트래블라운지 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전시청 남문광장 하차'
      }
    ]
  },
  { // 금요 마실코스
    id: 'accdn04',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [5],
    imgPath: 'img/sub01/masil_nature.jpg',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '금요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 금요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-sun-plant-wilt',
        time: '10:40 ~ 12:00',
        content: '명상정원/대청호자연생태관'
      },
      { icon: 'fa-utensils',
        time: '12:30 ~ 13:50',
        content: '중식(중앙시장)'
      },
      { icon: 'fa-palette',
        time: '14:10 ~ 15:00',
        content: '대전시립미술관'
      },
      { icon: 'fa-tree',
        time: '15:10 ~ 16:20',
        content: '한밭수목원'
      },
      { icon: 'fa-bus-simple',
        time: '16:45',
        content: '대전시청 남문광장 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전트래블라운지 하차'
      }
    ]
  },
  { // 토요 마실코스
    id: 'accdn05',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [6],
    imgPath: 'img/sub01/masil_tree.jpg',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '토요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 토요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-tree',
        time: '10:10 ~ 11:50',
        content: '한밭수목원'
      },
      { icon: 'fa-utensils',
        time: '12:00 ~ 13:20',
        content: '중식(대전문화예술단지)'
      },
      { icon: 'fa-person-hiking',
        time: '13:50 ~ 15:00',
        content: '계족산 황톳길체험'
      },
      { icon: 'fa-music',
        time: '15:00 ~ 15:50',
        content: '클래식 음악회'
      },
      { icon: 'fa-bus-simple',
        time: '16:45',
        content: '대전시청 남문광장 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전트래블라운지 하차'
      }
    ]
  },
  { // 일요 마실코스
    id: 'accdn06',
    filter: 'masilCourse',
    month: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    day: [0],
    imgPath: 'img/sub01/masil_euneung.jpg',
    label: '<span class="product__label--green">마실 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '일요 마실 코스',
    schedule: '하절기(7~8월)를 제외한 매주 일요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '09:30',
        content: '대전시청 남문광장 출발'
      },
      { icon: 'fa-bus-simple',
        time: '10:00',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-sun-plant-wilt',
        time: '10:30 ~ 11:50',
        content: '명상정원/대청호자연생태관'
      },
      { icon: 'fa-utensils',
        time: '12:20 ~ 13:30',
        content: '중식(으능정이 문화의 거리)'
      },
      { icon: 'fa-mountain',
        time: '14:20 ~ 15:50',
        content: '장태산 자연휴양림'
      },
      { icon: 'fa-bus-simple',
        time: '16:40',
        content: '한화생명 볼파크 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:00',
        content: '대전트래블라운지 하차'
      },
      { icon: 'fa-bus-simple',
        time: '17:30',
        content: '대전시청 남문광장 하차'
      }
    ]
  },
  { // 대전 빵시투어
    id: 'accdn07',
    filter: 'specialCourse',
    month: [9, 10, 11, 12],
    day: [0, 6],
    imgPath: 'img/sub01/bakery_seongsimdang.png',
    label: '<span class="product__label--yellow">특별 코스</span>',
    title: '대전 빵시투어',
    schedule: '9~12월 매주 토·일요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '13:00',
        content: '대전역 동광장 출발'
      },
      { icon: 'fa-bread-slice',
        time: '13:00 ~ 18:00',
        content: '대전 5개 구 빵소 투어'
      },
      { icon: 'fa-bus-simple',
        time: '18:00',
        content: '대전역 동광장 하차'
      }
    ]
  },
  { // 여름 숲스테이
    id: 'accdn08',
    filter: 'specialCourse',
    month: [7, 8, 9],
    day: [6],
    imgPath: 'img/sub01/forest_1.jpg',
    label: '<span class="product__label--yellow">특별 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '여름 숲스테이',
    schedule: '7~9월 매주 토요일 1박 2일 일정으로 운영',
    plan: [
      { icon: 'fa-map',
        time: '11:00 ~ 12:00',
        content: '국립대전숲체원 에코티어링'
      },
      { icon: 'fa-utensils',
        time: '12:30 ~ 14:00',
        content: '중식(채소비빔밥&된장찌개)'
      },
      { icon: 'fa-kitchen-set',
        time: '14:30 ~ 15:30',
        content: '블루베리 콩포트 만들기 체험'
      },
      { icon: 'fa-vihara',
        time: '15:40 ~ 16:20',
        content: '봉덕사 관람'
      },
      { icon: 'fa-caret-right',
        time: '16:30 ~ 17:30',
        content: '방동저수지 수변공원'
      },
      { icon: 'fa-utensils',
        time: '18:00 ~ 19:00',
        content: '석식'
      },
      { icon: 'fa-bed',
        time: '19:00 ~ 익일 08:00',
        content: '숙박'
      },
      { icon: 'fa-utensils',
        time: '08:00 ~ 09:00',
        content: '조식'
      },
      { icon: 'fa-caret-right',
        time: '10:00 ~',
        content: '으능정이 문화의 거리 관람 후 개별 귀가'
      }
    ]
  },
  { // 가을 뮤직버스
    id: 'accdn09',
    filter: 'specialCourse',
    month: [10],
    day: [6],
    imgPath: 'img/sub01/autumn_3.jpg',
    label: '<span class="product__label--yellow">특별 코스</span><span class="product__label--brown">해설 동행</span>',
    title: '가을 뮤직버스',
    schedule: '10월 매주 토요일 운영',
    plan: [
      { icon: 'fa-bus-simple',
        time: '18:10',
        content: '대전트래블라운지 출발'
      },
      { icon: 'fa-radio',
        time: '18:10 ~ 19:40',
        content: '신청곡과 사연 청취'
      },
      { icon: 'fa-person-walking',
        time: '19:40 ~ 20:20',
        content: '방동 윤슬거리 데크길 산책'
      },
      { icon: 'fa-mug-saucer',
        time: '20:30 ~ 21:20',
        content: '윤슬거리 카페 정원'
      },
      { icon: 'fa-bus-simple',
        time: '22:00',
        content: '대전역 하차'
      }
    ]
  }
];



/* 모바일 토글 - 코스 상품별 가격 객체 배열 */
const priceObj = [
  {
    value: 'priceAll',
    adult: '10,000',
    student: '8,000',
    discount: '7,000',
    group: '7,000'
  },
  {
    value: 'priceBread',
    adult: '5,000',
    student: '4,000',
    discount: '4,000',
    group: '4,000'
  },
  {
    value: 'priceTwice',
    adult: '17,000',
    student: '14,000',
    discount: '12,000',
    group: '12,000'
  },
  {
    value: 'priceThree',
    adult: '23,000',
    student: '19,000',
    discount: '16,000',
    group: '16,000'
  }
];