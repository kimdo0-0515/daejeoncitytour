/* ========== Number Field ========== */
const $numFields = document.querySelectorAll('[class*="number-wrap"]');

$numFields.forEach(wrap => {
  const input = wrap.querySelector('input[type="number"]');
  const minus = wrap.querySelector('.fa-minus');
  const plus = wrap.querySelector('.fa-plus');

  // 버튼 클릭
  minus.addEventListener('click', () => stepAndClamp(input, -1));
  plus.addEventListener('click', () => stepAndClamp(input, +1));

  // 직접 타이핑: 실시간으로 숫자 형태만 정리 (선택)
  input.addEventListener('input', () => {
    // 사용자가 값을 지워 빈값이 된 경우 허용
    if (input.value === '') return;

    // input 태그의 값이 NaN이면 바로 빈 문자열로 변경
    const n = Number(input.value);
    if (Number.isNaN(n)) input.value = '';
  });

  // 직접 타이핑: 최종 보정(포커스 아웃/엔터)
  input.addEventListener('change', () => clampValue(input));
});

function stepAndClamp(input, dir){
  // step 속성 없으면 1로
  const stepAttr = input.getAttribute('step');
  const step = stepAttr ? Number(stepAttr) : 1;

  const cur = readNumber(input);  // 현재값
  const next = cur + (dir * step);  // 버튼 조작된 값

  input.value = String(next); // input 태그에 값 반영
  clampValue(input);  // min max 범위를 넘는 경우 보정 필요

  //값 변경 후 input 이벤트 강제 발생
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function clampValue(input) {
  const min = input.min === '' ? -Infinity : Number(input.min);
  const max = input.max === '' ? Infinity : Number(input.max);

  // 빈 값이면 min으로 보정하거나 0으로 보정
  if (input.value === '') {
    input.value = String(Number.isFinite(min) ? min : 0);
    return;
  }

  let n = readNumber(input);
  if (n < min) n = min;
  if (n > max) n = max;

  input.value = String(n);
}

function readNumber(input) {
  const n = input.valueAsNumber;
  if (!Number.isNaN(n)) return n;

  const parsed = Number(input.value);
  return Number.isNaN(parsed) ? 0 : parsed;
}