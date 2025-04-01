function validateForm() {
    try {
        let selectedPrefix = document.querySelector('input[name="prefix"]:checked').value;
        console.log(selectedPrefix);
    }catch (error) {
        alert("กรุณาเลือกคำนำหน้าชื่อ");
        return false;
    }

    let fname = document.getElementById("fname").value;
    if (!(2 <= fname.length && fname.length <= 20)) {
        alert("กรุณากรอกชื่อเป็นตัวอักษร ความยาวระหว่าง 2-20 ตัวอักษร")
        return false;
    }

    let lname = document.getElementById("lname").value;
    if (!(2 <= lname.length && lname.length <= 20)) {
        alert("กรุณากรอกนามสกุลเป็นตัวอักษร ความยาวระหว่าง 2-20 ตัวอักษร")
        return false;
    }

    let code = document.getElementById("code").value;
    if (code.length != 13) {
        alert("กรุณากรอกหมายเลขบัตรประชาชนให้ครบจำนวน 13 หลัก")
        return false;
    }

    let address = document.getElementById("address").value;
    if (address.length < 15) {
        alert("กรุณากรอกข้อมูลที่อยู่ความยาวไม่ต่ำกว่า 15 ตัวอักษร");
        return false;
    }

    let subdistrict = document.getElementById("subdistrict").value;
    if (subdistrict.length < 2) {
        alert("กรุณากรอกข้อมูลตำบล/แขวงความยาวไม่ต่ำกว่า 15 ตัวอักษร");
        return false;
    }

    let district = document.getElementById("district").value;
    if (district.length < 2) {
        alert("กรุณากรอกข้อมูลอำเภอ/เขตความยาวไม่ต่ำกว่า 15 ตัวอักษร");
        return false;
    }

    let province = document.getElementById("province").value;
    if (province == "00") {
        alert("กรุณาเลือกจังหวัด");
        return false;
    }

    let postCode = document.getElementById("postcode").value;
    let isValid = /^[0-9]{5}$/.test(postCode)
    // console.log(isValid); 
    if (!isValid) {
        alert("กรุณากรอกรหัสไปรษณีย์เป็นตัวเลข 5 หลัก");
        return false;
    }

    alert('กรอกข้อมูลสำเร็จ!');
}