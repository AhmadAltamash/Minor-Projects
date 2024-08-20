const input = document.querySelector("#input")
let copyText = document.querySelector("#copy")

copyText.addEventListener("click", () =>{
    navigator.clipboard.writeText(input.value)
    alert("Password Copied");
    input.value = ""
})

const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = lowercase.map(letter => letter.toUpperCase());
const numbers = '1234567890'.split("");
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?/~`".split("");

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// function forLowerCase(){
// const lc = document.querySelector("#lc");
// let value_lc = "";
// lc.addEventListener("click", () => {
//     if(lc.checked)
//     {
//         value_lc += lowercase[Math.floor(Math.random() * lowercase.length)];
//     }
//     else{
//         value_lc = "";
//     }
// });
// const button = document.querySelector("#button")
// button.addEventListener("click", ()=>{

//     if(value_lc.length === 0)
//     {
//         alert("Please select at least one option");
//     }
//     else
//     {
//         let password = "";
//         for(let i=0; i<16; i++)
//         {
//             password += lowercase[Math.floor(Math.random() * lowercase.length)];
//         }
//         input.value = password
//     } 
// })
// }
// forLowerCase()

// function forUpperCase(){
//     const uc = document.querySelector("#uppercase");
//     let value_uc = "";
//     uc.addEventListener("click", () => {
//         console.log("checked")
//         if(uc.checked)
//         {
//             value_uc += uppercase[Math.floor(Math.random() * uppercase.length)];
//         }
//         else{
//             value_uc = "";
//         }
//     });
//     const button = document.querySelector("#button")
//     button.addEventListener("click", ()=>{
    
//         if(value_uc.length === 0)
//         {
//             alert("Please select at least one option");
//         }
//         else
//         {
//             let password = "";
//             for(let i=0; i<16; i++)
//             {
//                 password += uppercase[Math.floor(Math.random() * uppercase.length)];
//             }
//             input.value = password
//         } 
//     })
// }
// forUpperCase()

// function forNumbers(){
//     const num = document.querySelector("#numbers");
//     let value_num = "";
//     num.addEventListener("click", () => {
//         console.log("checked")
//         if(num.checked)
//         {
//             value_num += numbers[Math.floor(Math.random() * numbers.length)];
//         }
//         else{
//             value_num = "";
//         }
//     });
//     const button = document.querySelector("#button")
//     button.addEventListener("click", ()=>{
    
//         if(value_num.length === 0)
//         {
//             alert("Please select at least one option");
//         }
//         else
//         {
//             let password = "";
//             for(let i=0; i<16; i++)
//             {
//                 password += numbers[Math.floor(Math.random() * numbers.length)];
//             }
//             input.value = password
//         } 
//     })
// }
// forNumbers()

// function forSymbols(){
//     const sym = document.querySelector("#symbols");
//     let value_sym = "";
//     sym.addEventListener("click", () => {
//         console.log("checked")
//         if(sym.checked)
//         {
//             value_sym += symbols[Math.floor(Math.random() * symbols.length)];
//         }
//         else{
//             value_sym = "";
//         }
//     });
//     const button = document.querySelector("#button")
//     button.addEventListener("click", ()=>{
    
//         if(value_sym.length === 0)
//         {
//             alert("Please select at least one option");
//         }
//         else
//         {
//             let password = "";
//             for(let i=0; i<16; i++)
//             {
//                 password += symbols[Math.floor(Math.random() * symbols.length)];
//             }
//             input.value = password
//         } 
//     })
// }
// forSymbols()

function generatePassword() {
    const lc = document.querySelector("#lc").checked;
    const uc = document.querySelector("#uppercase").checked;
    const num = document.querySelector("#numbers").checked;
    const sym = document.querySelector("#symbols").checked;
    const removeDup = document.querySelector("#exc-duplicate").checked;
    const addSpace = document.querySelector("#spaces").checked;

    if (!lc && !uc && !num && !sym) {
        alert("Please select at least one option");
        return;
    }

    let passwordPool = [];
    if (lc) 
    {
        passwordPool = passwordPool.concat(lowercase);
    }
    if (uc) 
    {
       passwordPool = passwordPool.concat(uppercase);
    }
    if (num)
    {
        passwordPool = passwordPool.concat(numbers);
    } 
    if (sym)
    {
        passwordPool = passwordPool.concat(symbols);
    } 

    let password = "";
    for (let i = 0; i < 16; i++) {
        password += getRandomElement(passwordPool);
    }

    if (removeDup) {
        password = removeDuplicates(password);
    }

    if (addSpace) {
        password = addSpaces(password);
    }

    input.value = password;
}

function removeDuplicates(str) {
    let lowerCaseSeen = new Set();
    return str.split('').filter((char) => {
        let lowerChar = char.toLowerCase();
        if (lowerCaseSeen.has(lowerChar)) {
            return false;
        } else {
            lowerCaseSeen.add(lowerChar);
            return true;
        }
    }).join('');
}


function addSpaces(str) {
    return str.replace(/(.{8})(?!$)/g, "$1 ");
}

const button = document.querySelector("#button")
button.addEventListener("click", ()=>{
    generatePassword()
})

function checker(){
var password = document.querySelector(".strength-checker input")
let power = document.querySelector(".power")
password.oninput = ()=>{
    let point = 0
    let value = password.value
    let widthpower = ['1%','20%', '40%', '60%', '80%', '100%']
    let background = [
        '#e33535',
        '#ff9999',
        '#ffcc99',
        '#ffff99',
        '#ccff99',
        '#80c33d',
    ]

    if(value.length >= 6 ){
        let arrayTest = [
            /[0-9]/,
            /[a-z]/,
            /[A-Z]/,
            /[0-9a-zA-z]/,
            /[!@#$%^&*()_+\-=[\]{};':|"]/
        ];
        arrayTest.forEach(item => {
            if(item.test(value)){
                point += 1
            }
        })
    }
    power.style.width = widthpower[point];
    power.style.background = background[point];
}
}
checker()

function toggles(){
let toggleon = document.querySelector("#toggle")
let toggleoff = document.querySelector("#sp2")

toggleon.addEventListener("click", ()=>{
    let visible = document.querySelector(".strength-checker")
    visible.style.opacity = "1"
})
toggleoff.addEventListener("click", ()=>{
    let visible = document.querySelector(".strength-checker")
    visible.style.opacity = "0"
})
}
toggles()