$(document).ready(function () {

    //
    //
    //
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initpage();

    function initpage() {
        //empty article container and run AJAX request for unsaved headlines.
        articleContainer.empty();
        $.get("/api/headlines?saved=true")
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

    function createTemplate(article) {
        //
        //
        var template =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn-success save'>",
                "Save article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));
        template.data("_id", article._id);
        return template;
    }

    function renderEmpty() {
        var empty =
            $(["<div class='alert alert-warning' role='alert'>",
                "<h4>Oops! There are no new articles for today.</h4>",
                "</div>"
            ].join(""));
    }

    function handleNoteSave() {
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function () {
                bootbox.hideAll();
            });
        }
    }

    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>X</button>",
                    "</li>"
                ].join(""));
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    function handleNoteDelete() {
        var noteToDelete = $(this).data("_id");
        $.ajax({
            method: "DELETE",
            url: "/api/notes/" + noteToDelete,
        }).then(function (data) {
            bootbox.hideAll();

        });
    }

    function handleArticleNotes() {
        var currentArticle = $(this).parents(".panel").data();
        $.get("/api/notes" + currentArticle._id).then(function (data) {
            var modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' col='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>",
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentArticle._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        });
    }
});