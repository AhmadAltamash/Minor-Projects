let qr = document.querySelector("figure img")
let input = document. querySelector("input")
let main = document.querySelector('main')

document.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(input.value == '') {
        main.classList.add('error');
        setTimeout(()=>{
            main.classList.remove('error');
        },1000)
    }
    else
    {
    let api = 'https://api.qrserver.com/v1/create-qr-code/';
    
    qr.src = api + '?size=500X500&data=' + input.value
    }
})