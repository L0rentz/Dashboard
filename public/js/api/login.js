$('#f1').submit(function(e)
{
    e.preventDefault();
    $.post('http://qwertyasdfgh.rozblog.com/New_Post',
           formDataAsJSON, //use eg. jquery form plugin
           function(data)
           {
               window.location = 'somewhere';
           }
    );
});