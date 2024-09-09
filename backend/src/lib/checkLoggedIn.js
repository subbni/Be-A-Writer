const checkLoggedIn = async (req, res, next) => {
	if (!req.state.member) {
		return res.status(401).end(); // UNAUTHORIZED
	}
	return next();
};

export default checkLoggedIn;
