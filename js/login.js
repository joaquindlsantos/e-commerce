function dataValidation(){
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const errorMsg = document.getElementById('errorMsg');

  loginBtn.addEventListener('click', () => {

    if(email.value == '' || password.value == ''){
      //alert('Porfavor llene ambos campos');
      errorMsg.style.color = 'red';
      errorMsg.style.paddingBottom = '10px';
      errorMsg.style.display = 'inline-block';

    }else{
      localStorage.setItem("userEmail",email.value);
      window.location.href = "index.html";
    }
  })
}

dataValidation();
