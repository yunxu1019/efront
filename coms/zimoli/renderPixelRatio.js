var renderPixelRatio = devicePixelRatio > 1 && window.innerWidth > 360 && window.innerHeight > 360 ? .86 : .75;
if (document.querySelector && devicePixelRatio > 1 && /Linux/.test(navigator.platform) && navigator.maxTouchPoints > 0) {
    let ratio = +(1000000 / devicePixelRatio + .5 | 0) / 1000000;
    document.querySelector("meta[name=viewport]").setAttribute("content", `width=device-width,target-densitydpi=device-dpi,user-scalable=no,initial-scale=${ratio},maximum-scale=${ratio}`);
    renderPixelRatio *= devicePixelRatio;
}
