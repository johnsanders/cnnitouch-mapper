const typeText = (text: string, selector: string) => {
	const el = document.querySelector(selector) as HTMLInputElement;
	if (!el) return;
	el.focus();
	el.value = text;
};

export default typeText;
