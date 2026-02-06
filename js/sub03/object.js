/* 리뷰 객체 배열 */
const reviewObj = [
  {
    id: 'review01',
    title: '대전시티투어 너무 좋았어요',
    writer: '김*진',
    date: '2026-01-08',
    rating: 'rating--blue',
    content: '대전시티투어 덕분에 하루가 꽉 찼어요. 상소동산림욕장이 시원해서 사진도 잔뜩 찍었고, 잠깐 들른 족보박물관도 전시가 깔끔해 좋더라고요. 빵집에선 갓 나온 크로와상이 고소했고, 점심으로 중앙시장에서 돌솥밥도 먹었습니다. 가이드님도 친절했고, 다음번엔 친구랑 같이 올게요~!',
    img01: 'img/sub03/place01.jpg',
    img02: 'img/sub03/bread01.jpg',
    img03: 'img/sub03/food01.jpg'
  },
  {
    id: 'review02',
    title: '시티투어를 다녀와서',
    writer: '정*석',
    date: '2025-12-21',
    rating: 'rating--red',
    content: '코스 자체는 좋았는데 마이크 음량이 너무 작아서 해설이 잘 안들렸어요. 오늘 코스 중에는 테미오래가 제일 좋았어요. 대전특색 음식이라고 해서 민물고기매운탕도 처음 먹어봤는데 정말 맛있었습니다. 다음엔 특별 코스도 한 번 돌아보고 싶습니다.',
    img01: 'img/sub03/place02.jpg',
    img02: 'img/sub03/bread02.jpg',
    img03: 'img/sub03/food02.jpg'
  },
  {
    id: 'review03',
    title: '12월 4일 목요 마실 코스 후기입니다',
    writer: '김*준',
    date: '2025-12-16',
    rating: 'rating--blue',
    content: '친구랑 목요 마실 코스 신청했는데 코스 구성이 의외로 좋았어요. 대전근현대사전시관에는 사진 스팟도 많았고, 투어 끝나고 하차해서 야구장에서 경기도 봤어요. 저녁에는 가이드님이 추천해주신 냉면집도 가봤는데 너무 맛있었어요. 추천합니다!',
    img01: 'img/sub03/bread03.jpg',
    img02: 'img/sub03/place03.jpg',
    img03: 'img/sub03/food03.jpg'
  },
  {
    id: 'review04',
    title: '버스 탑승 인원 확인 좀 해주세요',
    writer: '박*민',
    date: '2025-12-03',
    rating: 'rating--red',
    content: '출발 인원을 따로 체크하지 않는지 버스를 놓칠 뻔 했어요. 이런 부분은 개선이 필요한 거 같습니다. 그래도 한밭수목원은 걷기 편하고, 미술관도 조용해서 힐링 됐습니다. 점심은 두부두루치기였는데 칼국수 사리까지 추가하니 배도 부르고 정말 맛있었습니다.',
    img01: 'img/sub03/bread04.jpg',
    img02: 'img/sub03/place04.png',
    img03: 'img/sub03/food04.jpg'
  },
  {
    id: 'review05',
    title: '부모님 모시고 투어한 후기',
    writer: '김*형',
    date: '2025-11-27',
    rating: 'rating--blue',
    content: '부모님 모시고 갔는데 일정이 무리 없어서 다행이었어요. 버스에서 신청곡도 틀어주고 사연도 소개해줘서 라디오 듣는 것 같아 좋았어요. 통기타 공연도 보고 저녁으로 추천받은 설렁탕집과 마카롱집도 들렀습니다. 부모님이 다음엔 야경 코스도 가보자고 하셔서 뿌듯했네요.',
    img01: 'img/sub03/place05.jpg',
    img02: 'img/sub03/bread05.jpg',
    img03: 'img/sub03/food05.jpg'
  },
  {
    id: 'review06',
    title: '또 여행하고 싶은 대전',
    writer: '정*현',
    date: '2025-11-15',
    rating: 'rating--blue',
    content: '대전이 이렇게 힐링되는 도시인지 몰랐어요. 대전문화예술단지가 잘 조성되어 있어서 사진도 많이 찍었어요! 점심으로는 돌솥밥에 갈비를 먹었는데 조합이 최고였습니다.일정도 빡빡하지 않아 여유롭게 둘러보고 식사할 수 있었어요. 다음에는 다른 코스도 돌아보고 싶어요.',
    img01: 'img/sub03/food06.jpg',
    img02: 'img/sub03/bread06.jpg',
    img03: 'img/sub03/place06.jpg'
  },
  {
    id: 'review07',
    title: '너무 만족스러웠던 대전 여행!!!',
    writer: '이*용',
    date: '2025-11-10',
    rating: 'rating--blue',
    content: '그 유명하다는 빵시투어! 짧은 시간 동안 빵집 5군데 돌면서 소금빵이랑 튀김소보로 엄청 맛봤습니다. 저녁으로는 대전역 근처에서 삼계탕 먹었는데 진짜 너무 맛있더라구요. 빵시투어 하나만 보고 대전 와도 좋을 거 같아요. 다음에 또 올게요.',
    img01: 'img/sub03/place07.jpg',
    img02: 'img/sub03/bread07.jpg',
    img03: 'img/sub03/food07.jpg'
  },
  {
    id: 'review08',
    title: '빵시투어 대기가 좀 많이 길었어요',
    writer: '이*형',
    date: '2025-10-28',
    rating: 'rating--red',
    content: '빵시투어 코스 구성인 빵집들이 모두 인기가 있는지 대기줄이 너무 길었어요. 제대로 고르지도 못하고 급하게 막 담았네요. 시간 좀 더 늘려주시면 좋을 거 같아요..그래도 산 빵들 다 맛있었고 칼국수랑 수육 조합 추천받은 것도 맛있어서 기분 좋게 대전 여행 마무리했어요.',
    img01: 'img/sub03/bread08.jpg',
    img02: 'img/sub03/food08.jpg',
    img03: 'img/sub03/place08.jpg'
  },
  {
    id: 'review09',
    title: '일요 마실코스 후기',
    writer: '조*록',
    date: '2025-10-12',
    rating: 'rating--blue',
    content: '여자친구랑 갔는데 자연에서 힐링하는 느낌이라 좋았습니다. 장태산자연휴양림에서 시간 오래 보냈는데 정말 여유로웠어요. 지인들한테 선물로 돌릴 도넛도 샀고, 저녁에 먹은 칼국수는 지금까지 먹어본 것 중에 제일 맛있었습니다. 안내도 친절해서 편했고, 다음에도 기회 되면 또 오고 싶네요.',
    img01: 'img/sub03/place09.jpg',
    img02: 'img/sub03/food09.jpg',
    img03: 'img/sub03/bread09.jpg'
  },
  {
    id: 'review10',
    title: '여름 숲스테이 추천합니다',
    writer: '김*영',
    date: '2025-10-08',
    rating: 'rating--blue',
    content: '1박 코스가 있다길래 궁금해서 애들이랑 신청해봤습니다. 아이들이 블루베리 콩포트 만들기 체험을 좋아하더라고요^^ 채식 식단도 마음에 들었고 자연 속에서 제대로 쉬다 가네요. 투어 끝나고 닭도리탕 먹었는데 여기도 추천합니다!',
    img01: 'img/sub03/bread10.jpg',
    img02: 'img/sub03/food10.jpg',
    img03: 'img/sub03/place10.jpg'
  },
];