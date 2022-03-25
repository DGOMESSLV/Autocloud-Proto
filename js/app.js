function expandLabels () {
    $('.tab-pane .form-control').each(function () {
        let value = $(this).val();

        if (value && value !== '' && value.length && value.length > 0) {
            var color = 'var(--gray)';

            if ($(this).parents('.bg-highlight').length > 0) color = '#262626';

            $(this).prev().css({
                top: '.8rem',
                background: color
            });
        }
    });
}

function showAlertModal(text) {
    $('#alert-modal .modal-body').text(text);

    $('.modal').each(function () {
        $(this).modal('hide');
    });

    $('#alert-modal').modal('show');
}

$(document).ready(() => {
    $('.carousel-item.active .row').scrollLeft(0);
    $('.carousel-item.active .row').css('scroll-behavior', 'smooth');

    $('.select2').each(function () {
        $(this).select2({
            minimumResultsForSearch: $(this).attr('data-select2-search') == 'disabled' ? -1 : 0
        });
    });

    $('.select2-arrow, #search-select2').click(function () {
        $(this).prev().prev().select2('open');
    })

    $('.desktop-sidebar').on('mouseover', function () {
        $(this).addClass('expanded', '2s');

        $('#sidebar-logo').attr('src', './assets/images/big-logo.png');
        $('#sidebar-logo').attr('width', '153');
    });

    $('.desktop-sidebar').on('mouseleave', function () {
        $(this).removeClass('expanded');

        $('#sidebar-logo').attr('src', './assets/images/small-logo.png');
        $('#sidebar-logo').removeAttr('width');
    });

    $('#eye-show').click(() => {
        let show = $('#eye-show').attr('data-show');

        if (show == 'true') {
            window.maskedValues = [
                $('#mask-1').text(),
                $('#mask-2').text(),
                $('#mask-3').text()
            ];

            $('#mask-1').text('R$ ·········');
            $('#mask-2').text('R$ ·········');
            $('#mask-3').text('R$ ·········');

            $('#eye-show').attr('data-show', 'false');
        } else {
            $('#mask-1').text(window.maskedValues[0]);
            $('#mask-2').text(window.maskedValues[1]);
            $('#mask-3').text(window.maskedValues[2]);

            $('#eye-show').attr('data-show', 'true');
        }

        $('#eye-show').toggleClass('fa-eye-slash fa-eye');
    });

    $('.tab-pane .form-control').change(() => expandLabels());

    $('.tab-toggler').click(function (e) {
        e.preventDefault();

        let $active = $('.tab-toggler[aria-selected="true"]');

        if ($active.attr('data-target') == $(this).attr('data-target'))
            return;

        $active.attr('aria-selected', 'false');
        $(this).attr('aria-selected', 'true');

        let targets = [
            $active.attr('data-target'),
            $(this).attr('data-target')
        ];

        $(targets[0]).removeClass('active show');
        $(targets[1]).addClass('active show');
    });

    $('.tab-pane .form-control, #fipe-modal .form-control').on('focusout blur', function () {
        let value = $(this).val();

        if (!value || value === '' || !value.length || value.length === 0) {
            $(this).prev().removeAttr('style');
        } else {
            $(this).prev().css('color', '#c0c0c0');
        }
    });

    $('.tab-pane .form-control, #fipe-modal .form-control').on('focusin', function () {
        var color = 'var(--gray)';

        if ($(this).parents('.bg-highlight').length > 0) color = '#262626';

        $(this).prev().css({
            transition: '.3s',
            top: '.8rem',
            background: color,
            color: 'rgb(var(--bs-primary-rgb))'
        });
    });

    $('.input-after').on('click', function () {
        $(this).prev().focus();

        if ($(this).prev().prop('tagName') == 'SELECT') {
            $(this).prev().click();
        }
    });

    expandLabels();

    $('.file-checker').click(function () {
        $(this).parent().toggleClass('active');
    });

    $('.help-modal-toggler, .fa-question-circle').click(() => $('#help-modal').modal('toggle'));

    $('.with-hidden:not(.collpase-row):not(button)').click(function (e) {
        let $target = $(e.target);
        let type = $target.prop('tagName').toLowerCase();

        if (type === 'button'
            || (type === 'i' && !$target.hasClass('fa-chevron-down'))
            || $target.hasClass('collpase-row')
            || $target.parents('collpase-row').length > 0
            || $target.hasClass('hidden-content')
            || $target.parents('.hidden-content').length > 0
            || ($target.hasClass('fa-chevron-down') && $target.parents('hidden-content').length > 0)
        ) {
            return;
        }

        $(this).find('.hidden-content').toggleClass('d-none');
    });

    $('.block-btn[data-type="edit"]').click(function () {
        $(this).toggleClass('fa-edit fa-check');

        if ($(this).attr('style') && $(this).attr('style').split(';').length > 2) {
            $(this).removeAttr('style');

            if ($(this).hasClass('pos-xs-absolute')) {
                $(this).css({
                    right: '20px'
                });
            }
        } else {
            $(this).css({
                background: 'rgb(var(--bs-primary-rgb))',
                fontSize: '1.2rem',
                color: '#fff',
                padding: '.4rem',
                transition: '0',
            });
        }
    });

    $('.file').click(function (e) {
        if ($(e.target).parents('.file-checker').length > 0 || $(e.target).hasClass('file-checker')) return null;

        $('#pdf-modal').modal('toggle');
    });

    $('.show-alert-modal').click(function () {
        let text = $(this).attr('data-text');

        showAlertModal(text);
    });

    $('.expand-collapse').click(function () {
        $(this).parent().parent().parent().next().toggleClass('expanded');
    });

    $('.expand-collapse-2').click(function () {
        $(this).parent().parent().next().toggleClass('expanded');

        $(this).parent().parent().parent().toggleClass('lancamentos-block-b');
    });

    $('.fa-thumbs-up').click(function () {
        if ($(this).css('transform') == 'matrix(-1, 0, 0, -1, 0, 0)') {
            $(this).css({transform: 'rotate(0deg)', transition: '.2s linear'});
        } else {
            $(this).css({transform: 'rotate(180deg)', transition: '.2s linear'});
        }
    });

    $('.sidebar-dropdown-toggler').parent().parent().parent().click(function (e) {
        e.preventDefault();

        const toggler = $(this).find('.sidebar-dropdown-toggler');
        const menu = $(this).find('.sidebar-dropdown-menu');

        let expanded = $(toggler).attr('aria-expanded') == 'true' ? 'false' : 'true';
        let hidden = expanded == 'true' ? 'false' : 'true';
        let height = hidden == 'true' ? '0' : '100%';
        let display = height == '0' ? 'none' : 'block';

        $(toggler).attr('aria-expanded', expanded);
        $(menu).attr('aria-hidden', hidden);

        $(menu).css('display', '');
        $(menu).css('height', '');

        $(menu).animate(
            { height, display },
            { duration: 300, easing: 'linear' }
        );
        $(menu).css('display', '');

        $(menu).css('height', '');
    });

    $('.sidebar-dropdown-menu').on('mouseover', function () {
        const root = $(this).parents('.side-item')[0];
        $(root).find('.icon').css('color', 'rgb(var(--bs-primary-rgb))');
    });

    $('.sidebar-dropdown-menu').on('mouseleave', function () {
        const root = $(this).parents('.side-item')[0];
        $(root).find('.icon').removeAttr('style');
    });

    $('.form-check-input').click(function (e) {
        e.preventDefault();
    });

    $('.form-switch .form-check-input').click(function () {
        $(this).toggleClass('checked')
    });

    $('.form-check .form-check-input').click(function () {
        $(this).toggleClass('checked')
    });

    $('.navbar-toggler').click(() => {
        let screenWidth = $(window).width();

        if (screenWidth >= 1200 && screenWidth <= 1800) {  // Media screen
            if (typeof $('.navbar').attr('style') === 'undefined') {
                $('body').css('overflow', 'hidden');
                $('.navbar').css('overflow', 'auto');
            } else {
                $('body').removeAttr('style');
                $('.navbar').removeAttr('style');
            }
        }
    });

    $('label').click(function () {
        let $next = $(this).next();

        if ($next.is('input')) {
            $next.focus();
        } else if ($next.hasClass('select2')) {
            $next.select2('open');
        }
    });

    $('.camera-icon').hover(() => {
        $('.carousel').trigger('mouseover');
    });

    $('.camera-icon').mouseleave(() => {
        $('.carousel').trigger('mousedown');
    });

    $('.carousel-control-next').click(() => {
        const context = $('.carousel-item.active .row');

        let currentScroll = $(context).scrollLeft();
        let increaseScrollAmount = $(context).find('.col-3').width();

        $(context).scrollLeft(currentScroll + increaseScrollAmount);
    });

    $('.carousel-control-prev').click(() => {
        const context = $('.carousel-item.active .row');

        let currentScroll = $(context).scrollLeft();
        let decreaseScrollAmount = $(context).find('.col-3').width();

        $(context).scrollLeft(currentScroll - decreaseScrollAmount);
    });

    $('.carousel-item .row .col-3').click(function () {
        let imgSrc = $(this).css('background-image').replace('url("', '').replace('")', '');

        $('#photo-modal img').attr('src', imgSrc);

        $('#photo-modal').modal('show');
    });

    $('#photo-modal-prev').click(function () {
        let imgSrc = 'url("' + $(this).parent().next().find('img').attr('src') + '")';

        $('.carousel-item .row .col-3').each(function () {
            if ($(this).css('background-image') == imgSrc && $(this).prev()) {

                let newSrc = $(this).prev().css('background-image').replace('url("', '').replace('")', '');
                $('#photo-modal img').attr('src', newSrc);
            }
        });
    });

    $('#photo-modal-next').click(function () {
        let imgSrc = 'url("' + $(this).parent().prev().find('img').attr('src') + '")';

        $('.carousel-item .row .col-3').each(function () {

            if ($(this).css('background-image') == imgSrc && $(this).next()) {
                let newSrc = $(this).next().css('background-image').replace('url("', '').replace('")', '');
                $('#photo-modal img').attr('src', newSrc);
            }
        });
    });

    $('.photo-modal .modal-dialog').click(e => {
        if ($(e.target).hasClass('modal-dialog') || $(e.target).hasClass('modal-content') || $(e.target).hasClass('modal-body')) {
            $('#photo-modal').modal('hide');
        }
    });

    $('.collapse-toggler').click(function () {
        let target = $(this).attr('href');
        let isExpanded = $(this).attr('aria-expanded') == 'true' ? 'false' : 'true';

        $(this).attr('aria-expanded', isExpanded);
        $(target).toggleClass('show');
    })

    $('.opt-check').on('click', function () {
        console.log('aquii');
        const el = $(this).parent().parent();
        let value = $(this).val();
        let state = $(this).hasClass('checked');

        console.log({
            el,
            value,
            state
        })

        if (state) {
            $('.checked-opts ul').append('<li>' + $(el).html() + '</li>');
        } else {
            $(`.checked-opts ul input.form-check-input[value="${value}"]`)
                .parent()
                .parent()
                .remove();
        }
    })

    $('table.datatables').each(function () {
        const attr = name => $(this).attr(`data-${name}`) && $(this).attr(`data-${name}`) == 'off' ? false : true;

        const language = ($(this).attr('data-datatables-language') ?? "en-us").replace('-', '_');

        $(this).DataTable({
            lengthChange: attr('use-show-n-entries'),
            paging: attr('paginate'),
            searching: attr('use-search-bar'),
            ordering: attr('enable-ordering'),
            info: attr('show-entries-range'),
            language: window.lang.datatables[language],
        });
    });
});
