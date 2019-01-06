let header = document.getElementById('header');
var headerNav = document.getElementById('header__nav');
window.onscroll = function () {

	if (window.pageYOffset > 50) {
		header.classList.add('header__solid');
		headerNav.classList.add('header__solid');
	} else {
		header.classList.remove('header__solid');
		headerNav.classList.remove('header__solid');
	}
};