(function(doc) {
	const ul = doc.getElementById('users'),
		url = `https://randomuser.me/api/?results=100`,
		searchInput = doc.getElementById('search'),
		itemClass = 'panel-block',
		jsClass = 'js-list-item';

	const createItem = (el) => doc.createElement(el);

	const append = (parent, el) => parent.appendChild(el);

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const user = data.results;

			return user.map((user) => {
				const li = createItem('li');

				li.innerHTML = `${user.name.first} ${user.name.last}`;
				append(ul, li)
					.setAttribute('class', `${itemClass} ${jsClass}`);
			})
		});

	searchInput.onkeydown = function(e) {
		let timeout = null;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const items = doc.getElementsByClassName(jsClass),
				listArray = [];

			for (let i = 0; i < items.length; i++) {
				listArray.push(items[i]);
			}

			listArray.filter((item) => {
				const inputValue = e.target.value,
					expression = new RegExp(inputValue, 'g'),
					hideClass = 'inactive';

				if (item.textContent.match(expression)) {
					item.classList.remove(hideClass);
				} else {
					item.classList.add(hideClass);
				}
			});
		});
	};
})(document);