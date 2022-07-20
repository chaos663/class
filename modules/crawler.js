import puppeteer from "puppeteer-core";
//puppeteer 다운 받은 것을 임포트 시킨다.
import os from 'os'
import fs from 'fs'

const macUrl = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
// Chrome browser로 실행시킬 것이기에 chrome.exe가 있는 경로를 입력
const whidowsUrl = 'C:/Program Files (x86)/Google/Chrome/Application/Chrome.exe'
const currentOs = os.type()
const launchConfig = {
  headless: false,
  defaultViewport: null,
  ignoreDefaultArgs: ['--disable-extensions'],
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--disable-extensions'],
  executablePath: currentOs == 'Darwin' ? macUrl : whidowsUrl
}

//강의 자료 중 여기까지 똑같이 가져온다.
// 전역변수 global
let browser = null
let page = null
let pageLength = 0
const pageSelector = `body > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(5) > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)`


//실행, init
const launch = async function () {  //비동기 처리
  browser = await puppeteer.launch(launchConfig); //실행할 때, 설정한 launchConfig를 넣는다. 그럼 chrome 브라우저가 실행이 된다.
  // 지역변수
  const pages = await browser.pages(); // 새로운 브라우저가 열린다.
  console.log(pages.length)
  page = pages[0]
  // 페이지 이동
  // 크롤링 할 페이지를 기입한다. 우리는 휴일지킴이약국을 기입힌다.

}
// url 찾차가기
const goto = async function (url) {
  return await page.goto(url)
}
// 팝업 닫기
const checkPopup = async function () {
  const pages = await browser.pages()
  //최신 문법 !  arr.at(-1)하면 맨 마지막 배열의 값을 가져올 수 있다.
  await pages.at(-1).close()
  //pages의 array 길이 찍어보기
  console.log(pages.length)
}

// name이라고 class 네임을 만듦, name드간 곳에 다 넣어주면 name 함수에서 받을 수 있음
const evalCode = async function (name) {
  console.log(`#continents > li.${name} > a`)
  await page.evaluate(function (name) {
    document.querySelector(`#continents > li.${name} > a`).click()
  }, name)
  // ${}하면 문자를 합칠 수 있다.
}
// 시군구 클릭
const evalCity = async function (sigungu) {
  // 해당 엘리먼트를 찾을때까지 기다림
  await page.waitForSelector(`#continents > li.songpa_gu > a`)
  await page.evaluate(function (sigungu) {
    document.querySelector(`#continents > li.songpa_gu > a`).click()
    // 두번 째 엘리먼트를 사용할 것이다.
  }, sigungu)
}

const getData = async function () {
  //페이지의 수 만큼 반복 ! 반복시켜서 클릭시킨다. 그리고 필요한 데이터를 뽑을 것이다.
  //현재 페이지가 1이니까 i는 1부터 시작해서 1씩 늘어나고 페이지수 만큼 반복
  for (let i = 1; i < pageLength; i++) {
    console.log('i:', i)
    await page.waitForSelector(pageSelector)
    // getPageLength의 부모와 같은 js path
    // 인자로 i가 들어가고 i를 return
    await page.evaluate(function (i,pageSelector) {
      document.querySelector(pageSelector).children[i].click() //1~7페이지까지 클릭이 일어나면서 페이지가 바뀐다.
    },i, pageSelector)
  }
}

// alert창 닫기
const alertClose = async function () {
  //page.on은 dialog라는게 뜨게 되면 반환하겠다라는 말
  await page.on('dialog', async function (dialog) {
    await dialog.accept()
  })
}

// page 갯수를 먼저 구해보자
const getPageLength = async function () {
  // 해당 샐렉터 기다림
  await page.waitForSelector(pageSelector) // 페이지를 나타내는 path의 부모

  pageLength = await page.evaluate(function (pageSelector) {
    const result = document.querySelector(pageSelector).children.length       //7 
    return result
    // result에 7이 담기니까 7이 반환된다.
  }, pageSelector)
  console.log('length:', pageLength)
  // 콘솔에 pageLength를 출력 !
}

// 여기서 변수에 함수 다 넣어서 export시키고 index.js에서 호출해서 사용 하는 구조 !
export {
  launch,
  goto,
  alertClose,
  checkPopup,
  evalCode,
  evalCity,
  getPageLength,
  getData
}



// document.querySelector("#printZone > table:nth-child(2) > tbody")
// document.querySelector("#printZone > table:nth-child(2) > tbody tr")
// // 부등호 > 근접한 테이블을 하나 찾겠다. 엘리멘탈 찾기 