const DEFAULT_USER_IMG = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';
const profileForm = document.getElementById('userProfileForm');
const btnSubmit = document.getElementById('btnSaveChanges');
const InputFirstName = document.getElementById('inputFirstName');
const InputSecondName = document.getElementById('inputSecondName');
const InputFirstSurname = document.getElementById('inputFirstSurname');
const InputSecondSurname = document.getElementById('inputSecondSurname');
const InputEmail = document.getElementById('inputEmail');
const InputTelephoneNumber = document.getElementById('inputTelephoneNumber');
const InputProfileImg = document.getElementById('inputProfileImg');


document.addEventListener('DOMContentLoaded', function (e) {
  updateInputsValue();
  updateProfileImage();
  profileForm.addEventListener('submit', function (event) {
    
    if (!profileForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    else {
      saveUserProfile();
      updateProfileImage();
    }

    profileForm.classList.add('was-validated')
  }, false)
  InputProfileImg.addEventListener('change', () => {
  
    const file = InputProfileImg.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
  
    fr.addEventListener('load', () => {
      const url = fr.result
      localStorage.setItem('userProfileImg', url);
    })
  
  })

})

function userProfileValidation() {

}

function updateInputsValue() {
  InputFirstName.value = localStorage.getItem('userFirstName');
  InputSecondName.value = localStorage.getItem('userSecondName');
  InputFirstSurname.value = localStorage.getItem('userFirstSurname');
  InputSecondSurname.value = localStorage.getItem('userSecondSurname');
  InputEmail.value = localStorage.getItem('userEmail');
  InputTelephoneNumber.value = localStorage.getItem('userTelephoneNumber');
}


function saveUserProfile() {
  const userFirstName = InputFirstName.value;
  localStorage.setItem('userFirstName', userFirstName);

  const userSecondName = InputSecondName.value;
  localStorage.setItem('userSecondName', userSecondName);

  const userFirstSurname = InputFirstSurname.value;
  localStorage.setItem('userFirstSurname', userFirstSurname);

  const userSecondSurname = InputSecondSurname.value;
  localStorage.setItem('userSecondSurname', userSecondSurname);

  const userEmail = InputEmail.value;
  localStorage.setItem('userEmail', userEmail);

  const userTelephoneNumber = InputTelephoneNumber.value;
  localStorage.setItem('userTelephoneNumber', userTelephoneNumber);


}


function updateProfileImage() {
  
  const url = localStorage.getItem('userProfileImg');
  console.log(url);
  if(url){
    const img = new Image();
    img.src = url;
  
    document.getElementById('imgThumbnail').src = img.src;

  }
  else{
    document.getElementById('imgThumbnail').src ='/img/default-profile-picture.jpg';
  }


}