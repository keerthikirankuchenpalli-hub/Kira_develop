const Adminauth = (req, res, next) => {
    console.log("Admin authentication middleware");
    const token = "xyz";
    const isAdminauthorized = token === "xyz";
    if (isAdminauthorized) {
        res.status(401).send("Unauthorized: Admin access required");
    } else {
        next();
    }
}

module.exports = {
    Adminauth,
};
