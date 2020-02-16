var date = function () {
    var d = new Date();
    var formatDate = "";

    formatDate += (d.getMonth() + 1) + "_";
    formatDate += d.getDate() + "_";
    formatDate += d.getFullYear();

    return formatDate
};

module.exports = date;