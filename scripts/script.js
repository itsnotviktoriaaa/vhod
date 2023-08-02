window.onload = function () {

    //задание 2
    let fullName = document.getElementById('fullName');

    const charOnlyRegEx = /^[a-zA-Zа-яёА-ЯЁ]+\s*$/;

    fullName.onkeydown = function (e) {
        let number = parseInt(e.key);
        if (!isNaN(number)) {
            return false;
        }
        if(!charOnlyRegEx.test(e.key)) return false;
    }

    //задание 3

    let userName = document.getElementById('userName');

    userName.onkeydown = function (event) {
        if (event.key === '.' || event.key === ',') {
            return false;
        }
    }

    //задание 4

    let checkboxForm = document.getElementById('checkboxForm');

    checkboxForm.onchange = function (e) {
        if (e.target.checked) {
            console.log('Согласен');
        }
        else {
            console.log('Не согласен');
        }
    }

    //задание 5

    let button = document.getElementsByTagName('button')[0];

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordRepeat = document.getElementById('passwordRepeat');

    let popup = document.getElementsByClassName('popup')[0];

    let fullNameError = $('#fullNameError');
    let userNameError = $('#userNameError');
    let emailError = $('#emailError');
    let passwordError = $('#passwordError');
    let passwordRepeatError = $('#passwordRepeatError');
    let checkStyleError = $('#checkStyleError');



    function registration () {
        fullNameError.hide();
        userNameError.hide();
        emailError.hide();
        passwordError.hide();
        passwordRepeatError.hide();
        checkStyleError.hide();
        $('.form-input').css('border-bottom', '1px solid #C6C6C4');

        validateForRegistration();


    }

    function validateForRegistration() {
        if (!fullName.value.match(/[a-zA-Zа-яёА-ЯЁ]+\s*/g)) {
            $(fullName).css('border-bottom', '1px solid red');
            fullNameError.show();
        } else if(!userName.value.match(/\w+-*/i)) {
            $(userName).css('border-bottom', '1px solid red');
            userNameError.show();
        } else if(!email.value.match(/^\w+@[a-zA-Z]{2,8}\.[a-zA-Z]{2,3}\s*$/)) {
            $(email).css('border-bottom', '1px solid red');
            emailError.show();
        } else if(!password.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/g)) {
            $(password).css('border-bottom', '1px solid red');
            passwordError.show();
        } else if (password.value !== passwordRepeat.value) {
            $(passwordRepeat).css('border-bottom', '1px solid red');
            passwordRepeatError.show();
        } else if (!checkboxForm.checked) {
            checkStyleError.show();
        } else {
            popup.style.display = 'flex';

            let infoUserNew = {
                name: $(fullName).val(),
                userName: $(userName).val(),
                email: $(email).val(),
                password: $(password).val()
            }

            let usersStorage = localStorage.getItem('users');

            let clients = []

            if (usersStorage) {
                clients = JSON.parse(usersStorage);
            }

            clients.push(infoUserNew);
            localStorage.setItem('users', JSON.stringify(clients));
        }
    }

    button.addEventListener('click', registration);

    let haveAccount = document.getElementsByClassName('main__sign-account-have')[0];
    let h1 = document.getElementsByTagName('h1')[0];

    function forHave(event) {
        h1.innerText = 'Log in to the system';
        let remove1 = document.getElementById('forRemove1');
        let remove2 = document.getElementById('forRemove2');
        let remove3 = document.getElementById('forRemove3');
        remove1.remove();
        remove2.remove();
        remove3.remove();
        let checkStyle = document.getElementById('checkStyle');
        checkStyle.remove();
        $(haveAccount).html('<a href="#">Registration</a>');
        button.innerText = 'Sign In';
        button.removeEventListener('click', registration);
        haveAccount.removeEventListener('click', forHave);

        function reload (event) {
            window.location.reload();
        }

        haveAccount.addEventListener('click', reload);
        button.addEventListener('click', login);
    }

    haveAccount.addEventListener('click', forHave)

    function login() {
        let userValue = $(userName).val();
        let passwordValue = $(password).val();

        let usersList = localStorage.getItem('users');
        let usersListArray = JSON.parse(usersList);

        let searchUserName = usersListArray.find(el => el.userName === userValue);

        let userNameNoFind = $('#userNameNoFind');
        userNameNoFind.hide();

        let passwordNoFind = $('#passwordNoFind');
        passwordNoFind.hide();

        if (!searchUserName) {
            userNameNoFind.show();
            $(userName).css('border-bottom', '1px solid red');
        }
        if (searchUserName) {
            let searchUserPassword = searchUserName.password;
            if (searchUserPassword !== passwordValue) {
                passwordNoFind.show();
                $(password).css('border-bottom', '1px solid red');
            } else {
                $(h1).text('Welcome, ' + searchUserName.name + '!');
                button.innerText = 'Exit';
                button.removeEventListener('click', login);
                function signInAccount () {
                    window.location.reload();
                }
                button.addEventListener('click', signInAccount);
                $('.main__sign-account-description').remove();
                $('#forRemoveAccount1').remove();
                $('#forRemoveAccount2').remove();
                haveAccount.remove();
            }
        }
    }



    let buttonOkInPopUp = document.getElementsByTagName('button')[1];

    function onClickOkInPopUp () {
        popup.style.display = 'none';

        fullName.value = null;
        userName.value = null;
        email.value = null;
        password.value = null;
        passwordRepeat.value = null;
        forHave();
    }

    buttonOkInPopUp.addEventListener('click', onClickOkInPopUp);


}