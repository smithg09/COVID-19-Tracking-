$(document).ready(() => {
    
    var total_affected = '';
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "39aab58bacmsh45e95b51e2e09edp153d37jsn8653f04c899d"
        }
    }).then(response => { return response.json() }).then(response => {
        var all_stat = response.countries_stat
        console.log(all_stat)
        all_stat.forEach(countries => {
            var main_card = document.getElementById("main_card");

            var card_body = document.createElement("div");
            card_body.setAttribute("class", "card-body p-0 border-top")
            main_card.appendChild(card_body)

            var blog_comments = document.createElement("div");
            blog_comments.setAttribute("class", "blog-comments__item d-flex p-3")
            card_body.appendChild(blog_comments)

            var blog_content = document.createElement("div");
            blog_content.setAttribute("class", "blog-comments__content")
            blog_comments.appendChild(blog_content)

            var blog_meta = document.createElement("div");
            blog_meta.setAttribute("class", "blog-comments__meta text-muted")
            blog_content.appendChild(blog_meta)

            var a_tag = document.createElement("a");
            a_tag.setAttribute("class", "text-secondary");
            a_tag.setAttribute("style", "font-size:1.3rem");
            a_tag.setAttribute("href", "#");
            a_tag.innerText = countries.country_name
            blog_meta.appendChild(a_tag)

            var contain = document.createElement("div");
            contain.setAttribute("class", "contain")
            blog_content.appendChild(contain)

            var p1 = document.createElement("p");
            p1.setAttribute("class", "m-0 my-1 mb-2 c_prim");
            p1.innerText = "Total Cases: " + countries.cases
            contain.appendChild(p1)

            var p2 = document.createElement("p");
            p2.setAttribute("class", "m-0 my-1 mb-2 c_danger");
            p2.innerText = "Total Deaths: " + countries.deaths 
            contain.appendChild(p2)

            var p3 = document.createElement("p");
            p3.setAttribute("class", "m-0 my-1 mb-2 c_relief");
            p3.innerText = "Total Recovered: " + countries.total_recovered
            contain.appendChild(p3)

        });
        

    }).catch(err => {
        console.log(err);
    });

});