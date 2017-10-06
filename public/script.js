google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawGeoChart);
google.charts.setOnLoadCallback(drawColumnChart);

function drawColumnChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var uniqueCount = [], uniquePub = [], uniquePatents = [];
            for (var i = 0; i < jsonData.length; i++) {
                uniqueCount.push(jsonData[i].country)
                uniquePub.push(parseInt(jsonData[i].publications));
                uniquePatents.push(parseInt(jsonData[i].patents))
            }
            var count = [], pb = [], pt = [], sk = [];
            k = 0;
            uniqueCount.forEach(function (i) {
                count[i] = (count[i] || 0) + 1;
                if (sk.indexOf(i) < 0) {
                    sk.push(i);
                    pb.push(uniquePub[k]);
                    pt.push(uniquePatents[k]);
                }
                else{
                    var b = sk.indexOf(i);
                    pt[b] = pt[b] + uniquePatents[k];
                    pb[b] = pb[b] + uniquePub[k]
                }
                k++;
            });
            var ar = ["Country", "Publications", "Patents"];
            var arr = [];
            arr.push(ar);

            for (var b = 0; b < sk.length; b++) {
                arr.push([sk[b], pb[b], pt[b]])
            }
            var data = google.visualization.arrayToDataTable(arr);
            var options = {
                title: 'Universities',
                hAxis: { title: 'Countries', titleTextStyle: { color: 'red' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    })


}

function drawGeoChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {

            var uniqueCount = [];
            for (var i = 0; i < jsonData.length; i++) {
                uniqueCount.push(jsonData[i].country);
            }
            var count = {};
            uniqueCount.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

            var ar = [['Country', 'Count']]

            Object.keys(count).forEach(function (key) {
                var arr = [key, count[key]]
                ar.push(arr)

            });
            var data = google.visualization.arrayToDataTable(ar);


            var chart = new google.visualization.GeoChart(document.getElementById('region_map_div'));
            chart.draw(data, null);
        }
    })


}

function drawTable() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'rank');
            data.addColumn('string', 'title');
            data.addColumn('string', 'country');
            data.addColumn('string', 'alumni_employment');
            data.addColumn('string', 'national_rank');
            data.addColumn('string', 'quality_of_education');
            data.addColumn('string', 'quality_of_faculty');
            data.addColumn('string', 'publications');
            data.addColumn('string', 'influence');
            data.addColumn('string', 'citations');
            data.addColumn('string', 'broad_impact');
            data.addColumn('string', 'patents');
            data.addColumn('string', 'score');

            for (var i = 0; i < jsonData.length; i++) {

                data.addRow([
                    jsonData[i].rank,
                    jsonData[i].title,
                    jsonData[i].country,
                    jsonData[i].alumni_employment,
                    jsonData[i].national_rank,
                    jsonData[i].quality_of_education,
                    jsonData[i].quality_of_faculty,
                    jsonData[i].publications,
                    jsonData[i].influence,
                    jsonData[i].citations,
                    jsonData[i].broad_impact,
                    jsonData[i].patents,
                    jsonData[i].score,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawTable();
    drawGeoChart();
    drawColumnChart();
});
