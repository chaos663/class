// crawler.js의 콘솔에 들어가는 스크립트를 짜보자 

// element를 잘 찾는 것이 관건, 부모 element를 잘 찾아서 뽑아와야 한다. class 이름은 ./ , id는 #을 붙인다.

var trArr = document.querySelectorAll("#printZone > table:nth-child(2) > tbody tr")
var returnData = []

for(var i=0; i < trArr.length; i++){
  debugger

  var currentTr = trArr[i]

  var name = currentTr.querySelector('td')?.innerText
  var address = currentTr.querySelectorAll('td')[2]?.innerText
  var tel = currentTr.querySelectorAll('td')[3]?.innerText
  var open = currentTr.querySelectorAll('td')[4]?.innerText
  var jsonData = {
    'name' : name,
    'address' : address,
    'tel' : tel,
    'open' : open
  }
  // 만약 key 이름과 value 이름이 같을 거면은 value만 입력해주면 그 value값의 이름으로 key값이 설정 된다.
  if(jsonData.address != undefined){
    returnData.push(jsonData)
    //push 함수는 배열에 데이터를 넣을 때 쓰는 함수
  }
}
console.log(returnData)
// ? 표를 붙여주는 것은 있으면 잡고 없으면 indifined를 출력해서 스킵시킨다. 그래서 오류를 피할 수 있다. 
//for 문으로 이름, 주소, 전화번호, 오픈 시간을 가져왔다.

//json 파일로 만들거다.















// 동기적 , 비동기적 코드

// function task(title){
//     setTimeout(function(){
//         console.log('a')
//     },3000)
//     setTimeout(function(){
//         console.log('b')
//     },1000)
// }

// //1000 >> 10초(밀리초 단위라서...)
// function coffeMachine (type, callback) {   //callback 함수 : 2 >> callback 지우개라고 하는데 늘어날수록 지연된다.(a끝나고 b,~c,d~ 실행하는 동작)
//     setTimeout(function(){
//         console.log(type,':done')
//         callback()
//     },2000)   // 함수 coffeeMachine이 도는데 걸리는 시간은 ~ 밀리초 이다.
// }

// coffeMachine('A', function(){
//     coffeMachine('B',function(){
//         coffeMachine('C',function(){

//         })
//     })
// })

// // 이걸 보완하기 위해서 나온 것이 Promise() 함수
// // 비동기적 함수 만들기
// function asyncTask(arg){
//     const promise = new Promise(function(resolve,reject){  //promise의 매개인자 resolve, reject
//         setTimeout(function(){
//             console.log(arg)
//             resolve()
//         }, 1000)
//     })    //promise에 Promise 함수를 넣자.
//     return promise      //promise를 return시키자 !
// }

// asyncTask('task a')
// asyncTask('task b')
// asyncTask('task c')
// asyncTask('task d')


// asyncTask('task 1')
// .then(function(){
//     return asyncTask('task 2')
// })
// .then(function(){
//     return asyncTask('task 3')
// })
// .then(function(){
//     return asyncTask('task 4')
// })


// // async await 함수(then을 붙인 것과 같이 실행이 된다. 즉,순차적으로 다음 task를 진행시키고 싶을 때 사용하면 된다.)
// await asyncTask('Task A')
// await asyncTask('Task B')
// await asyncTask('Task C')
// await asyncTask('Task D')

// // async 와 await를 쓰는 조건이 있다. 
// // (example) async가 promise()함수를 반환시키는 함수
// async function test(){
//     await asyncTask('task 1')  //원래 async의 함수 내에서 await는 실행이 됐어야 했는데
// }
//  await asyncTask() // 이거 처럼 그냥 함수 밖에서 await를 쓸 수 있게 되었다.





