var FormData = this.FormData;
if (!FormData) {
    FormData = function FormData() {
        this.form = Object.create(null);
    }

    FormData.prototype.append = function (key, value) {
        if (!this.form[key]) this.form[key] = [];
        this.form[key] = value;
    };

    FormData.prototype.toString = function () {
        return serialize(this.form);
    };
    FormData.prototype.keys = function () {
        return Object.keys(this.form);
    };
    FormData.prototype.getAll = function (k) {
        return this.form[k] ? this.form[k].slice() : [];
    };
    FormData.prototype.get = function (k) {
        return this.form[k] ? this.form[k][0] : null;
    };
}