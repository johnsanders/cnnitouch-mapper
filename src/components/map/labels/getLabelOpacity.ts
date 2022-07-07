const getLabelOpacity = (mode: 'edit' | 'render', visible: boolean) => {
	if (mode === 'render') return visible ? '1' : '0';
	if (mode === 'edit') return visible ? '1' : '0.3';
	return '1';
};
export default getLabelOpacity;
