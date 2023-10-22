/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
(function(){
  const spanEl = document.querySelector("main h2 span");
  // 타이핑 효과로 바뀌는 문구 종류
  const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
  let index = 0;
  // 한글자씩 쪼개서 저장
  let currentTxt = txtArr[index].split("");
  function writeTxt(){
    // 쪼갠 배열의 한글자씩을 맨 앞의 요소부터 추출하고 삭제
    spanEl.textContent  += currentTxt.shift(); 
    // 출력할 글자가 남아있는지 체크
    if(currentTxt.length !== 0){ 
      // 랜덤 함수를 이용해 문구가 출력되는 시간을 매번 달라지게 만듬
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    }else{
      // 모두 출력된 문구를 가져옴
      currentTxt = spanEl.textContent.split("");
      // 3초뒤 텍스트 지우는 함수 호출 
      setTimeout(deleteTxt, 3000);
    }
  }
  // 텍스트 삭제 함수
  function deleteTxt(){
    // 이미 출력된 문구가 저장된 currentTxt에서 끝 글자부터 리턴하고 삭제하는 pop()
    currentTxt.pop();
    // 맨 끝 글자가 삭제된 나머지 한글자씩 쪼개져있던 문구를 하나로 합침
    spanEl.textContent = currentTxt.join("");
    // 문구가 모두 삭제됬는지 체크
    if(currentTxt.length !== 0){
      setTimeout(deleteTxt, Math.floor(Math.random() * 100))
    }else{
      // 문구가 다 삭제되고 끝났으니 다음 문구 불러오기
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      writeTxt();
    }
  }
  writeTxt();
})();
/* end text_iife.js */

/* scroll_request.js */
/* 스크롤을 위아래로 움직이면 header 태그에 active 클래스를 추가하거나 삭제하기 */
const headerEl = document.querySelector("header");
window.addEventListener('scroll', function(){
  // 스크롤 이벤트 최적화 메소드
  requestAnimationFrame(scrollCheck);
});
function scrollCheck(){
  let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  // 스크롤이 맨 위에 있지 않으면 active 클래스 추가
  if(browerScrollY > 0){
    headerEl.classList.add("active");
  }
  // 스크롤 위치가 맨 위면 추가 됬던 active 클래스 삭제
  else{
    headerEl.classList.remove("active");
  }
}
/* end scroll_request.js */

/* move.js */
// 헤더 영역의 메뉴를 클릭하면 부드럽게 이동하기
/* 애니메이션 스크롤 이동 */
const animationMove = function(selector){
  // 이동할 곳 정보 가져오기
  const targetEl = document.querySelector(selector);
  // 현재 브라우저의 스크롤 위치
  const browserScrollY = window.pageYOffset;
  // 가져온 정보에서 이동할 위치 뽑아오기
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // 스크롤 부드럽게 이동
  window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};
// 헤더 영역의 메뉴 버튼에 스크롤 이동 이벤트 연결하기
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e){
    const target = this.dataset.target;
    animationMove(target);
  });
}
/* End move.js */