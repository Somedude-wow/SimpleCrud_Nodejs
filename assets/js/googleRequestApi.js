var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://www.google.com}`,
        "method" : "PUT",
        "data" : data
    }

    console.log(request)

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })
