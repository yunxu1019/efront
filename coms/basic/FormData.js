var FormData = this.FormData;
if (!FormData) {
    FormData = function FormData() {
        this.form = {};
    }

    FormData.prototype.append = function (key, value) {
        this.form[key] = value;
    };

    FormData.prototype.toString = function () {
        return serialize(this.form);
    };
}