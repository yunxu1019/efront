function main() {
    var page = div();
    page.innerHTML = SpeechRecognition_test;
    var rec = new SpeechRecognition;
    rec.onresult = function (event) {
        console.log('result', event);
    };
    rec.onerror = function (event) {
        console.log("error", event);
    };
    rec.maxAlternatives = 5;
    rec.continuous = true;
    rec.lang = 'zh-CN';
    on('remove')(page, () => rec.abort());
    render(page, {
        listening: false,
        swaped() {
            if (this.listening) {
                rec.start();
            } else {
                rec.abort();
            }
            console.log(rec);
        },
        textarea,
        swap,
    })
    return page;
}