var referer_proxy = {
    "/": "/" + process.env.APP || "",
};
referer_proxy[""] = referer_proxy["/"];
module.exports = referer_proxy;