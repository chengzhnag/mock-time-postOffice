const localDate = function(v) {
	const d = new Date(v || Date.now());
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d.toISOString();
}

module.exports = {
	localDate
};
