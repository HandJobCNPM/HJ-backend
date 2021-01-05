const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let signupName = false;
let signupEmail = false;
let signupPassword = false;
let signupConfirmPassword = false;

const setDisableSignup = () => {
    if (signupName && signupEmail && signupPassword && signupConfirmPassword) {
        $('#signup').prop('disabled', false)
    } else {
        $('#signup').prop('disabled', true)
    }
}

$('#signup-name').blur(function () {
    const name = $(this).val()

    if (name.length > 0) {
        $(this).attr('fill', 'valid')
        signupName = true;
    } else {
        $(this).attr('fill', 'invalid')
        $('#signup-name-error').text('Empty input field')
        signupName = false;
    }

    setDisableSignup()
})

$('#signup-name').focus(function () {
    $(this).attr('fill', '')
    $('#signup-name-error').text('')
})

$('#signup-email').blur(function () {
    const email = $(this).val()

    if (emailRegex.test(email)) {
        $(this).attr('fill', 'valid')
        signupEmail = true;
    } else {
        $(this).attr('fill', 'invalid')
        $('#signup-email-error').text('Invalid email')
        signupEmail = false;
    }

    setDisableSignup()
})

$('#signup-email').focus(function () {
    $(this).attr('fill', '')
    $('#signup-email-error').text('')
})

$('#signup-password').blur(function () {
    const password = $(this).val()

    if (password.length > 8) {
        $(this).attr('fill', 'valid')
        signupPassword = true;
    } else {
        $(this).attr('fill', 'invalid')
        $('#signup-password-error').text('Too short password')
        signupPassword = false;
    }

    setDisableSignup()
})

$('#signup-password').focus(function () {
    $(this).attr('fill', '')
    $('#signup-password-error').text('')
})

$('#signup-password-confirm').blur(function () {
    const password = $(this).val()

    if (password.length > 8 && password === $('#signup-password').val()) {
        $(this).attr('fill', 'valid')
        signupConfirmPassword = true;
    } else {
        $(this).attr('fill', 'invalid')
        $('#signup-confirm-password-error').text('Not matching password')
        signupConfirmPassword = false;
    }

    setDisableSignup()
})

$('#signup-password-confirm').focus(function () {
    $(this).attr('fill', '')
    $('#signup-confirm-password-error').text('')
})