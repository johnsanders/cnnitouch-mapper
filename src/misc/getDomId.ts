const getDomId = (type: string, id: string) => `${type}-${id.split('-')[0]}`;
export default getDomId;
