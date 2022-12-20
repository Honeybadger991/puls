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
});