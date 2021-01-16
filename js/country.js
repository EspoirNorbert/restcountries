$(document).ready(function () {

    $("#africa").click(function (e) { 
      e.preventDefault();
      displayAfricaCountries();
    });

    function displayAfricaCountries() {
      $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/region/africa",
            dataType: "json",
            success: function (data) {
              $("#search").empty();
                $.each(data, function (i, elt) {
                    const ligne = `<tr>
                        <td class="pt-5">${ elt.name }</td>
                        <td class="pt-5">${ elt.capital }</td>
                        <td class="pt-5">${ elt.currencies[0].name }</td>
                        <td class="col-sm-2 w-25">
                        <img title="${ elt.name }" src="${ elt.flag }" width="100" class="img-fluid d-block m-3 mx-auto	border rounded " alt="${elt.name}">
                        </td>
                  </tr>`;
                  $("#countries").show();
                  $("#q").val("");
                  $("#myCountriesTable").append(ligne);
                  window.history.pushState("","","");
                  })},
            error: function () {
              $("#countries").empty();
              $("#countries").html(`<div class="d-flex bg-light justify-content-center align-content-center">
              <div class="row">
                <div class="col-md-4">
                <img src="img/fa.png" class="img-fluid" alt="error fail">
              </div>
              <div class="col-md-8">
                <h1 class="text-danger mt-5">Request failed: Error </h1>
                <a href="" class="d-flex justify-content-center btn btn-primary">Retry again</a>
            </div>
            </div>
            </div>`);
            }
        }); 
    }
}) 
