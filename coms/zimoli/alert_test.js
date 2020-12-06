function alert_test() {
    var page = document.createElement("div");
    page.innerHTML = `
    <button @click="alert('你好',this.innerText)">error</button>
    <button @click="alert('你好',this.innerText)">info</button>
    <button @click="alert('你好',this.innerText)">warn</button>
    <button @click="alert('你好',this.innerText)">#f2c</button>
    <button @click="alert('你好',this.innerText)">default</button>
    `;
    renderWithDefaults(page, { alert });
    return page;
}