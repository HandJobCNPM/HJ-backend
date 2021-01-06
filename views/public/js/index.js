$('#show-profile').click(function () {
    if ($('#show-profile-panel').attr('show') == "false") {
        $('#show-profile-panel').attr('show', 'true')
    }
});

$('#show-profile-panel').click(function (e) {
    if (e.target === e.currentTarget) {
        $('#show-profile-panel').attr('show', 'false')
    }
});

$('#recruiter').click(function () {
    if ($('#personal-info').attr('show') === "true") {
        $('#personal-info').attr('show', "false")
    }

    $('#recruiter-info').attr('show', 'true')

    if ($('#freelancer-info').attr('show') === "true") {
        $('#freelancer-info').attr('show', 'false')
    }
})

$('#personal').click(function () {
    if ($('#recruiter-info').attr('show') === "true") {
        $('#recruiter-info').attr('show', "false")
    }

    $('#personal-info').attr('show', 'true')

    if ($('#freelancer-info').attr('show') === 'true') {
        $('#freelancer-info').attr('show', 'false')
    }
})

$('#freelancer').click(function () {
    if ($('#personal-info').attr('show') === 'true') {
        $('#personal-info').attr('show', 'false')
    }

    $('#freelancer-info').attr('show', 'true')

    if ($('#recruiter-info').attr('show') === 'true') {
        $('#recruiter-info').attr('show', 'false')
    }
})

const infos = ["name", "address", "email", "phone"]

infos.forEach(info => {
    $(function () {
        $(`#profile-${info}-hide`).text($(`#profile-${info}`).val());
        $(`#profile-${info}`).width($(`#profile-${info}-hide`).width());
    }).on('input', function () {
        $(`#profile-${info}-hide`).text($(`#profile-${info}`).val());
        $(`#profile-${info}`).width($(`#profile-${info}-hide`).width());
    });

    $(`#profile-${info}`).change(function () {
        $('#edit').attr('show', 'true')
        $('#edit').prop('disabled', false)
    })
});

$('#search').keypress(function (e) {
    if (e.which == 13) {
        $('#search-form').submit()
        return false;
    }
})

$('#image').click(function () {
    $('#upload-image').click()
})

$('#upload-image').change(function () {
    if ($(this).val() !== "") {
        $('#upload-form').submit()
        return false;
    }
})

$('#agree').click(function () {
    console.log('abc')
    if ($(this).prop('checked')) {
        $('#accept-contract').prop('disabled', false)
    } else {
        $('#accept-contract').prop('disabled', true)
    }
})