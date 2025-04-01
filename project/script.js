//change background
window.addEventListener('scroll', () => {
    var bar = document.getElementById('bar');
    var font = document.getElementById('topic');
    if (window.scrollY > 100) {
        document.body.style.backgroundColor = 'rgba(60, 42, 30, 1)';
        bar.style.position = 'fixed';
        font.style.color = 'white';

    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.backgroundImage = 'none';
        bar.style.position = 'unset';
        font.style.color = 'rgba(69, 35, 9, 1)';
    }
});

//random
let picBase = "image/"
function randomMenu() {
    const container = document.getElementById('pop-random');
    container.innerHTML = "";

    for (let i=0; i<1; i++) {
        let numRandom1 = Math.floor(Math.random()*4);
        let picURL1 = picBase + numRandom1 + '.png';
        
        let div1 = document.createElement('div');
        div1.className = 'pop';

        let img1 = document.createElement('img');
        img1.src = picURL1;

        let p1 = document.createElement('p');
        let txt1 = "";
        if (numRandom1 == '0') {
            txt1 = 'OREO MILKSHAKE';
        } else if (numRandom1 == '1') {
            txt1 = 'CAPPUCCINO';
        } else if (numRandom1 == '2') {
            txt1 = 'MINT CHOCOLATE';
        } else if (numRandom1 == '3'){
            txt1 = 'ICED CHOCOLATE';
        }

        let numRandom2 = parseInt(Math.floor(Math.random()*4)) + 4;
        let picURL2 = picBase + numRandom2 + '.png';
        
        let div2 = document.createElement('div');
        div2.className = 'pop';

        let img2 = document.createElement('img');
        img2.src = picURL2;

        let p2 = document.createElement('p');
        let txt2 = "";
        if (numRandom2 == '4') {
            txt2 = 'CREME BRULEE';
        }else if (numRandom2 == '5') {
            txt2 = 'COOKIE';
        }else if (numRandom2 == '6') {
            txt2 = 'CHOCOLATE CROISSANT';
        }else if (numRandom2 == '7') {
            txt2 = 'EGG TART';
        }

        p1.textContent = `${txt1}`;
        div1.appendChild(img1);
        div1.appendChild(p1);

        p2.textContent = `${txt2}`;
        div2.appendChild(img2);
        div2.appendChild(p2);

        container.appendChild(div1);
        container.appendChild(div2);
    }
}

//button option
function toMenu(id) {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
}

//onclick minus (-)
function minus(button) {
    const count = button.parentElement.querySelector('.count'); //return parent element ของ count = control
    // querySelector = first matching element
    // console.log(count.value);
    if (count.value != '1') {
        count.value = parseInt(count.value) - 1;
    }
}

//onclick plus (+)
function plus(button) {
    const count = button.parentElement.querySelector('.count');
    count.value = parseInt(count.value) + 1;
}

//onclick addToCart
const checkout_list = [];
function addToCart(button) {
    const menu = button.closest('.menu'); //<div class='menu'>...</div>
    const menu_name = menu.querySelector('.name').textContent;
    const price = parseInt(menu.querySelector('.price').textContent.match(/\d+/)[0]);
    const count = parseInt(menu.querySelector('.count').value);
    const totalElement = document.getElementById('total');
    const notiElement = document.getElementById('noti');

    //price
    const total = parseInt(totalElement.textContent.match(/\d+/)[0]);
    totalElement.innerHTML = `TOTAL: ${total + (count * price)} BAHT`;

    //order
    checkout_list.push({"menu": `${menu_name}`, "price": `${price}`, "amount": `${count}`});

    //noti
    const noti = parseInt(notiElement.textContent);
    notiElement.innerHTML = `${noti + count}`;
    // console.log(checkout_list);
}


//onclick check out
function checkOut() {
    const pop = document.getElementById('pop-up');
    const totalpop = document.getElementById('total-pop');
    const total = parseInt(document.getElementById('total').textContent.match(/\d+/)[0]);

    totalpop.innerHTML = `TOTAL: ${total} BAHT`;
    pop.style.display = 'flex';

    //order
    const tbody = document.getElementById('tbody');
    tbody.innerHTML ="";
    for (i of checkout_list) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i.menu}</td>
            <td>${i.price}</td>
            <td>x${i.amount}</td>
        `;

        tbody.appendChild(tr);
    }
}

//close pop up
function closePopup() {
    document.getElementById('pop-up').style.display = 'none';   
}

//confirm check out
function confirm() {
    const totalElement = document.getElementById('total');
    const noti = document.getElementById('noti');
    const order = document.getElementById('tbody');
    // console.log(noti.textContent);
    if (noti.textContent == '0') {
        Swal.fire({
            title: 'Please select a menu first :)',
            icon: 'error',
            confirmButtonText: 'Ok',
            backdrop: true
        });
        document.getElementById('pop-up').style.display = 'none';
    } else {
        Swal.fire({
            title: 'Checkout Successful',
            text: 'Thank you for your order!',
            icon: 'success',
            confrmButtonText: 'OK',
            backdrop: true
        });
        totalElement.innerHTML = `TOTAL: 0 BAHT`;
        noti.innerHTML = '0';
        document.getElementById('pop-up').style.display = 'none';
        order.innerHTML = "";
        checkout_list.length = 0;
        // console.log(checkout_list);
    }
}