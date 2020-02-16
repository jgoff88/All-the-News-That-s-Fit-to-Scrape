$(document).ready(function () {

    //
    //
    //
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initpage();

    function initpage() {
        //empty article container and run AJAX request for unsaved headlines.
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function (data) {
                //If headlines exist, render to page.
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    //Else render message explaining we have no articles.
                    renderEmpty();
                }
            });
    }

    function renderArticles(artilces) {
        //This function appenmds HTML with article data to the page
        var articleTemplate = [];
        for (var i = 0; i < artilces.length; i++) {
            articleTemplate.push(createTemplate(artilces[i]));
        }
        articleContainer.append(articleTemplate);
    }

    function renderEmpty() {
        var empty =
            $(["<div class='alert alert-warning' role='alert'>",
                "<h4>Oops! There are no new articles for today.</h4>",
                "</div>"
            ].join(""));
    }
});