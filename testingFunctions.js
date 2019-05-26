console.log('checking connection')
let arr = []


// function fibo(n){n <= 1 ? console.log(n)  : console.log(fibo(n-1)+fibo(n-2)) }
// fibo(10)
// function fibonacci(n){
//     if (n===1){
//         console.log('w jedynce')
//         // arr.push(1)
//         return 
//     }else if(n===2){
//         arr.push(1)
//         console.log('wdwojce')
//         fibonacci(1)
//     }else{
//         arr.push(fibonacci(n-1)+fibonacci(n+2))
//         console.log('poza jedynka')
//     }       
// }
// function add(n){
//     for(let i=n ; i>0 ; i--){
//         arr.push(i)
//     }
// }
// // fibonacci(2)
// add(10)


// function fibo(n) {
//     if (n <= 1) {
//         // console.log(n)
//         arr.push(1)
//     } else {
//         arr.push(fibo(n - 2) + fibo(n - 1))
//     }
// }
// fibo(5)

// console.log(arr)

// function checking(e){
//     if(e === 0){
//         arr.push('in')
//     }else{
//         arr.push('else') 
//         checking(0)
//     }
// }

// const check = (e) =>{
//     if (e === 0) {
//         arr.push('in')
//     } else {
//         arr.push('else')
//         check(0)
//     }

// }
// check(1)

// function fib(n){
//     if (n===1 || n===2){
//         console.log(1)
//     }else{
//         console.log(fib(n-1)+fib(n-2))
//     }

// }
// fib(4)

var fibonacci_series = function (n) {
    if (n === 1) {
        return [0,1];
    }
    else {
        var s = fibonacci_series(n - 1);
        console.log(typeof(s))  
        s.push(s[s.length - 1] + s[s.length - 2]);
        console.log(s.length) 
        return s;
    }
};

console.log(fibonacci_series(4));

console.log(arr)