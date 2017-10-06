const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');

var file = 'data_cwur.json';

scrapeIt("http://cwur.org/2016.php", {
    // Fetch the articles
    articles: {
        listItem: ".table > tbody > tr"
        , data: {

            // Get the title
            title: "td:nth-child(2)" // body > div.container > div.row > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > a
            , rank: "td:nth-child(1)" //body > div.container > div.row > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)
            , country: "td:nth-child(3)" //body > div.container > div.row > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)
            , alumni_employment: "td:nth-child(6)"
            , national_rank: "td:nth-child(4)"
            , quality_of_education: "td:nth-child(5)"
            , quality_of_faculty: "td:nth-child(7)"
            , publications: "td:nth-child(8)"
            , influence: "td:nth-child(9)"
            , citations: "td:nth-child(10)"
            , broad_impact: "td:nth-child(11)"
            , patents: "td:nth-child(12)"
            , score: "td:nth-child(13)"
        }
    }

}, (err, page) => {
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        console.error(err);
    });
});
