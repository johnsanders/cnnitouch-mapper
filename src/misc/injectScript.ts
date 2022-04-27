const injectScript = (url: string) =>
	new Promise<void>((resolve, reject) => {
		const script: any = document.createElement('script');
		script.type = 'text/javascript';
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					script.onreadystatechange = null;
					resolve();
				}
			};
		} else {
			script.onload = resolve;
		}
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	});

export default injectScript;
