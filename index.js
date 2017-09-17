const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');

var file = 'data.json';

// Promise interface
// scrapeIt("http://ionicabizau.net", {
//     title: ".header h1"
//     , desc: ".header h2"
//     , avatar: {
//         selector: ".header img"
//         , attr: "src"
//     }
// }).then(page => {
//     console.log(page);
//     jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
//         console.error(err)
//     })

// });
// Callback interface
scrapeIt("http://ionicabizau.net", {
    // Fetch the articles
    articles: {
        listItem: ".article"
        , data: {

            // Get the article date and convert it into a Date object
            createdAt: {
                selector: ".date"
                , convert: x => new Date(x)
            }

            // Get the title
            , title: "a.article-title"

            // Nested list
            , tags: {
                listItem: ".tags > span"
            }

            // Get the content
            , content: {
                selector: ".article-content"
                , how: "html"
            }
        }
    }

    // Fetch the blog pages
    , pages: { 
        listItem: "li.page"
        , name: "pages"
        , data: {
            title: "a" //body > div.container > div.header > ul > // li.page.active > a
            , url: {
                selector: "a"
                , attr: "href"
            }
        }
    }

    // Fetch some other data from the page
    , title: ".header h1"
    , desc: ".header h2"
    , avatar: {
        selector: ".header img"
        , attr: "src"
    }
}, (err, page) => {
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        console.error(err);
    });
});
