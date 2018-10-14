function filterTime_test() {
    console.log(filterTime(new Date(new Date - 100)), `刚刚`);
    console.log(filterTime(new Date(new Date - 60000)), `h:mm`);
    console.log(filterTime(new Date(new Date - 86400000)), `M月d日 h:mm`);
    console.log(filterTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1))), `y年M月d日 h:mm`);
    return button("");
}