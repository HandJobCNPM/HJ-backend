const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let loginEmail = false;
let loginPassword = false;

$('#login-email').blur(function () {
    const email = $(this).val()

    if (emailRegex.test(email)) {
        $(this).attr('fill', 'valid')
        loginEmail = true;

        if (loginPassword) {
            $('#login').prop('disabled', false)
        }
    } else {
        $(this).attr('fill', 'invalid')
        $('#login-email-error').text('Invalid email')
        loginEmail = false;

        if (!loginPassword) {
            $('#login').prop('disabled', true)
        }
    }
})

$('#login-email').focus(function () {
    $(this).attr('fill', '')
    $('#login-email-error').text('')
})

$('#login-password').blur(function () {
    const password = $(this).val()

    if (password.length > 8) {
        $(this).attr('fill', 'valid')
        loginPassword = true;

        if (loginEmail) {
            $('#login').prop('disabled', false)
        }
    } else {
        $(this).attr('fill', 'invalid')
        $('#login-password-error').text('Too short password')
        loginPassword = false;

        if (!loginEmail) {
            $('#login').prop('disabled', true)
        }
    }
})

$('#login-password').focus(function () {
    $(this).attr('fill', '')
    $('#login-password-error').text('')
})