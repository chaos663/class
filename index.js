import { launch, alertClose, goto, checkPopup, evalCode, evalCity, getPageLength, getData, writeFile } from './modules/crawler.js'
//crawlling 할 js 파일을 import 시켜준다.
//mac 은 자동완성이 command + i 이다.

async function main() {
  // 브라우저 실행
  await launch()
  // 페이지 이동
  await goto('https://www.pharm114.or.kr/main.asp')
  // 팝업 닫기
  await checkPopup()
  // await alertClose()
  // url로 바로 가도되고
  // await goto('https://www.pharm114.or.kr/common_files/sub2_page2.asp?addr1=%BC%AD%BF%EF%C6%AF%BA%B0%BD%C3')
  // 시 클릭
  await evalCode('seoul')
  // 구 클릭
  await evalCity('kangnam_gu')
  // 경고창 닫기
  await alertClose()
  // 페이지 길이 구하기
  await getPageLength()
  // 페이지 수만큼 반복
  await getData()
  // 크롤링 한 데이터를 json 파일로 저장
  await writeFile()
}
main()
