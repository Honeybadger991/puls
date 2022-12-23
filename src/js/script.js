$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 600,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png"></img></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    
    function toggleSlide(product) {
        $(product).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-product__content').eq(i).toggleClass('catalog-product__content_active');
                $('.catalog-product__list').eq(i).toggleClass('catalog-product__list_active');
            })
        });
    };

    toggleSlide('.catalog-product__link');
    toggleSlide('.catalog-product__back');

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow')
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });

    $('.button_product').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-product__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow')
        })
    });

    function valid(form){
        $(form).validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Введите Ваше имя",
            phone: "Введите Ваш номер телефона",
            email: {
              required: "Введите Ваш адрес почты",
              email: "Введите Вашу почту в формате name@domain.com"
            }
          }
    });
    }

    valid('#consultation-form');
    valid('#consultation form');
    valid('#order form');
    
    $('input[name=phone]').mask("(999) 999-9999");

    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 1300){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});