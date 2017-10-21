const getTargetHTML = function(elem) {

	const id     = elem.getAttribute('data-show-id')
	const target = document.querySelector(`[data-id="${ id }"]`)

	return target.outerHTML

}

Array.prototype.forEach.call(document.querySelectorAll('[data-show-id]'), function(elem) {

	const html = getTargetHTML(elem)

	elem.onclick = basicLightbox.create(html).show

})

document.querySelector('.button.callbacks').onclick = function(e) {

	const html = getTargetHTML(this)

	const instance = basicLightbox.create(html, {
		beforeShow  : (instance) => console.log('beforeShow', instance),
		afterShow   : (instance) => console.log('afterShow', instance),
		beforeClose : (instance) => console.log('beforeClose', instance),
		afterClose  : (instance) => console.log('afterClose', instance)
	})

	instance.show((instance) => console.log('finished show()', instance))

	setTimeout(() => {

		instance.close((instance) => console.log('finished close()', instance))

	}, 3000)

}

document.querySelector('.button.blocked').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		beforeClose: () => false
	}).show()

}

document.querySelector('.button.invalid').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		closable          : null,
		className         : null,
		beforeShow        : null,
		afterShow         : null,
		beforeClose       : null,
		afterClose        : null,
		beforePlaceholder : null,
		afterPlaceholder  : null
	}).show()

}

document.querySelector('.button.closable').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		closable: true
	}).show()

}

document.querySelector('.button.notclosable').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		closable: false
	}).show()

}

document.querySelector('.button.custom').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		beforePlaceholder : () => 'beforePlaceholder',
		afterPlaceholder  : 'afterPlaceholder'
	}).show()

}

document.querySelector('.button.classNames').onclick = function(e) {

	const html = getTargetHTML(this)

	basicLightbox.create(html, {
		className: 'classNames'
	}).show()

}

document.querySelector('.button.dynamic').onclick = function(e) {

	const html = `
		<h1>Dynamic Content</h1>
		<p>You can set the content of the lightbox with JS.</p>
	`

	basicLightbox.create(html).show()

}

const openStack = function(e) {

	const html     = '<a class="button" href="#">Open another lightbox on top</a>'
	const instance = basicLightbox.create(html)

	instance.element().querySelector('.button').onclick = openStack
	instance.show()

}

document.querySelector('.button.stack').onclick = openStack
