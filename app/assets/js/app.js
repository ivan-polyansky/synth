!(function ($) {

function dropdown(){
    $('body').on('click', function (event) {
        var eventInMenu = $(event.target).parents('.drpd');
        if (!eventInMenu.length) {
            $('.drpd-menu').removeClass('open');
        }
    });
    $('.drpd-tglr').on('click', function (event) {
        var drpd =  $(event.target).closest('.drpd');
        var menu =  $(event.target).closest('.drpd').find($('.drpd-menu'));
        if(menu.hasClass('open')){
            menu.removeClass('open');
        }else{
            menu.addClass('open');
        }
        
    });
}
dropdown();

function topMenuOpener(navId){
	var nav = $('#'+navId);
	var toggler = $('[data-open="'+navId+'"]');
	toggler.on('click',function () {
		if(nav.hasClass('open')){
			nav.removeClass('open')
			toggler.removeClass('open')
		}else{
			nav.addClass('open')
			toggler.addClass('open')
		}
	})
}
topMenuOpener('site-nav');

})(jQuery);