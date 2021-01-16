$(document).ready(function () {
    
    $("#q").keyup(searchCountry);
    function searchCountry()  {
        const code = $(this).val();
        $(".fa-search").hide();
        $("#countries").hide();
        if(code == "" ){
        $("#countries").fadeIn("show");
        $("#search").empty();
        $(".fa-search").fadeIn("show");
        return false;
        }
        if(isNaN(code)){
        let message = "<p class='p-5 h1'>Veuiller saisir un code valable svp</p>";
        $("#search").html(`<div class='text-danger text-center'>${ message }</div>`);
        return false;
        }
        else{
            $("#search").empty();
            $.ajax({
                type: "GET",
                url: `https://restcountries.eu/rest/v2/callingcode/${code}`,
                data: "json",
                success: function (data) {
                    displayCountriesResult(data);
                },
                error: function () {
                    notFoundCountry(code);
                }
            }); 
        }
    }

    function displayCountriesResult(data){
    $.each(data, function (i,elt) { 
        const ligne = `
            <div class="row mt-5 mb-5 d-flex justify-content-center ">
            <div class="col-md-4 border border-primary ">
            <img src="${elt.flag}" alt="${elt.name}" class="img-fluid border border-primary img-thumbnail mt-3 p-2 rounded">
            <h3 class="mt-2 text-center title">${elt.name}</h3>
        </div>
        <div class="col-md-6 border border-primary ">
            <h2 class="title">Details</h2>
            <table class="table">
                <tr>
                    <th>Capital</th>
                    <td>${elt.capital}</td>
                </tr>
                <tr>
                <th>Region</th>
                <td>${elt.region}</td>
            </tr>
            <tr>
            <th >Subregion</th>
                <td class="w-50">${elt.subregion}</td>
            </tr>
            <tr>
                <th>Population</th>
                <td>${elt.population}</td>
            </tr>
            </table>
        </div>
      </div>`
     $("#search").append(ligne)
    });  
    }

    function notFoundCountry(code) {
        console.clear();
        $("#search").append("<div class='jumbotron'></div>");
        $(".jumbotron").html(`
        <div class="row">
            <div class="col-md-4">
            <img src="img/error_country_no_found.png" width="400px" class="img-fluid" alt="">
            </div>
            <div class="col-md-6">
            <h2> Aucun pays  pour le code <span class="text-danger">"${code}"</span>  </h2>
            <h6> Désolé, aucun résultat ne correspond à votre recherche. </h6>
            <ul>
                <li><p>Merci de vérifier l'orthographe de votre recherche.</p></li>
                <li><p>Essayez de rechercher des codes existants</p></li>
            </ul>
            </div>
        </div>`);
    }

}) 
