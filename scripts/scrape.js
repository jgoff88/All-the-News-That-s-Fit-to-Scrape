// scrape script
// ================

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com/", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $("article").each(function (i, element) {
            var head = $(this).children(".balancedHeadline").text().trim();
            var sum = $(this).children(".ghost").text().trim();

            if (head && sum) {
                //Using regex for text
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dateToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dateToAdd);
            }
            cb(articles);
        });
    });
};
module.exports = scrape;