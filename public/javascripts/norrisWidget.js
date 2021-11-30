function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendNorrisCategories(id, json)
{
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Select your categorie");
    container.empty();
    let $categorie = $('<select id="categorie" name="categorie" class="custom-select"></select>');
    for (let i = 0; i < json.length; i++) {
        $categorie.append(`<option value="`+ json[i] +`">`+ capitalizeFirstLetter(json[i]) +`</option>`);
    }
    container.append('<p>This widget retrieves a random chuck norris joke from a given category.</p>')
    container.append($categorie);
    container.append(`<button type="button" class="btn btn-outline-dark btn-sm" style="width: 100%" onClick="validateButtonNorris('`+ id + `')">Validate</button>`);
    setRefresher($("#" + id).find('.refresher'), `getNorrisContent('`+ id +`')`);
}

function validateButtonNorris(id)
{
    let categorie = $("#" + id).find('#categorie');
    console.log("categorie: " + categorie.val());
    getNorrisByCategory(id, categorie.val());
}

function appendNorrisJoke(id, json)
{
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append(capitalizeFirstLetter(json.categories[0]) + " Norris joke");
    container.empty();
    container.append(`<div style="justify-content: center; display: flex;"><img src="`+ json.icon_url +`"></img></div>`);
    container.append(`<blockquote><p id="joke_value">`+ json.value +`</p></blockquote>`);
}

function getNorrisWidgetContent(id)
{
    getNorrisCategories(id, appendNorrisCategories);
}