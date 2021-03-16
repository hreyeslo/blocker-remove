// CONFIG

const nodes = {
	'marca': [
		{
			type: 'class',
			value: 'fc-ab-root'
		},
		{
			type: 'id',
			value: 'didomi-host'
		}
	]
};

// METHODS

function getSite(config) => {
	console.log(config);
	const site = 'marca';
	return site;
}

function remove(items = []){
	items.forEach(item => {
		const method = item.type === 'class' ? 'getElementsByClassName' : 'getElementById';
		const nodes = document[method](item.value);
		if(item.type === 'class' && nodes && nodes.length > 0){
			Array.from(nodes).forEach(node => node.remove());
		}else if(nodes.remove){
			nodes.remove();
		}
	});
	document.body.style.setProperty("overflow", "auto", "important");
}

function runSelector(){
	window.requestAnimationFrame(function(){
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
		xhr.setRequestHeader("Content-Type", "*/*");
		xhr.onload = function () {
			const config = JSON.parse(xhr.responseText);
			const site = getSite(config);
			try{
				remove(config.nodes[site]);
			}catch(e){
				console.error('Config error');
			}
		}
		xhr.send();
	});
}

window.addEventListener("load", runSelector);