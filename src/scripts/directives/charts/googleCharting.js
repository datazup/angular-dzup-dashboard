if (GoCharting == null || typeof (GoCharting) != "object") {
    var GoCharting = new Object();
}

GoCharting.init = function (callback) {
    if (!GoCharting.initialized)
    $.getScript("//www.google.com/jsapi", function (data, textStatus, jqxhr) {        
        if (!GoCharting.initialized)
        $.getScript("//maps.googleapis.com/maps/api/js?key=AIzaSyBcN_5QR5tr8Crt8Pfar3-P-ehyGNKpH64", function (data, textStatus, jqxhr) {  
            if (!GoCharting.initialized)
            google.load("visualization", "1", {
                packages: ["geochart"],
                "callback": function () {
                    GoCharting.initialized = true;

                    if (callback)
                        callback();
                }
            });
        });
    });
};
/* topic charting */
GoCharting.getChartByType = function (options, docElement) {
    var chart = null;
    if (options.chartType) {
        if (options.chartType === 'areaChart') {
            chart = new google.visualization.AreaChart(docElement);
        } else if (options.chartType === 'tableChart') {
            chart = new google.visualization.Table(docElement);
        } else {
            chart = new google.visualization.ColumnChart(docElement);
        }
    } else {
        chart = new google.visualization.ColumnChart(docElement);
    }
    return chart;
};

GoCharting.normalizeStateAbbreviation = function(country, stateAbbreviation){

    if (!this.normalizedStates){
        this.normalizedStates = {
            KR: {
                KR01: 'KR-11',
                KR02: 'KR-26',
                KR03: 'KR-27',
                KR04: 'KR-28',
                KR05: 'KR-29',
                KR06: 'KR-30',
                KR07: 'KR-31',
                KR08: 'KR-41',
                KR09: 'KR-42',
                KR10: 'KR-43',
                KR11: 'KR-44',
                KR12: 'KR-45',
                KR13: 'KR-46',
                KR14: 'KR-47',
                KR15: 'KR-48',
                KR16: 'KR-49',
                KR17: 'KR-50'
            },
            US:{
                AL: 'AL',		
                AK: 'AK',
                AZ: 'AZ',
                AR: 'AR',
                CA: 'CA',
                CO: 'CO',
                CT: 'CT',
                DE: 'DE',
                DC: 'DC',
                FL: 'FL',
                GA: 'GA',
                HI: 'HI',
                ID: 'ID',
                IL: 'IL',
                IN: 'IN',
                IA: 'IA',
                KS: 'KS',
                KY: 'KY',
                LA: 'LA',
                ME: 'ME',
                MD: 'MD',
                MA: 'MA',
                MI: 'MI',
                MN: 'MN',
                MS: 'MS',
                MO: 'MO',
                MT: 'MT',
                NE: 'NE',
                NV: 'NV',
                NH: 'NH',
                NJ: 'NJ',
                NM: 'NM',
                NY: 'NY',
                NC: 'NC',
                ND: 'ND',
                OH: 'OH',
                OK: 'OK',
                OR: 'OR',
                PA: 'PA',
                RI: 'RI',
                SC: 'SC',
                SD: 'SD',
                TN: 'TN',
                TX: 'TX',
                UT: 'UT',
                VT: 'VT',
                VA: 'VA',
                WA: 'WA',
                WV: 'WV',
                WI: 'WI',
                WY: 'WY'
            }
        }
    }
    return this.normalizedStates[country][stateAbbreviation];
};

GoCharting.resolveStateName = function(country, stateAbreviation){
    if (!this.countryStates){
        this.countryStates = {
            US: {
                AL: 'Alabama',		
                AK: 'Alaska',
                AZ: 'Arizona',
                AR: 'Arkansas',
                CA: 'California',
                CO: 'Colorado',
                CT: 'Connecticut',
                DE: 'Delaware',
                DC: 'Washington DC',
                FL: 'Florida',
                GA: 'Georgia',
                HI: 'Hawaiʻi',
                ID: 'Idaho',
                IL: 'Illinois',
                IN: 'Indiana',
                IA: 'Iowa',
                KS: 'Kansas',
                KY: 'Kentucky',
                LA: 'Louisiana',
                ME: 'Maine',
                MD: 'Maryland',
                MA: 'Massachusetts',
                MI: 'Michigan',
                MN: 'Minnesota',
                MS: 'Mississippi',

                MO: 'Missouri',
                MT: 'Montana',
                NE: 'Nebraska',
                NV: 'Nevada',

                NH: 'New Hampshire',
                NJ: 'New Jersey',

                NM: 'New Mexico',
                NY: 'New York',
                NC: 'North Carolina',


                ND: 'North Dakota',
                OH: 'Ohio',
                OK: 'Oklahoma',
                OR: 'Oregon',
                PA: 'Pennsylvania',
                RI: 'Rhode Island',

                SC: 'South Carolina',
                SD: 'South Dakota',
                TN: 'Tennessee',
                TX: 'Texas',

                UT: 'Utah',
                VT: 'Vermont',
                VA: 'Virginia',
                WA: 'Washington',

                WV: 'West Virginia',
                WI: 'Wisconsin',
                WY: 'Wyoming'
                
            },
            KR: {
                'KR-11': 'Seoul',
                'KR-26': 'Busan',
                'KR-27': 'Daegu',
                'KR-28': 'Incheon',
                'KR-29': 'Gwangju',
                'KR-30': 'Daejeon',
                'KR-31': 'Ulsan',
                
                'KR-41': 'Gyeonggi',
                'KR-42': 'Gangwon',
                'KR-43': 'N Chungcheong',
                'KR-44': 'S Chungcheong',
                'KR-45': 'N Jeolla',
                'KR-46': 'S Jeolla',
                'KR-47': 'N Gyeongsang',
                'KR-48': 'S Gyeongsang',
                'KR-49': 'Jeju',
                'KR-50': 'Sejong'
            }
        };    
    }
    
    return this.countryStates[country][stateAbreviation];    
};

GoCharting.drawTopicsChart = function (rawData, options) {
    function drawVisualization() {

        //--------------------------------------------------------------------------------------------
        // firstRow should be all Topics names from all dates
        // first Col in all next rows should be DateTime value as string


        var insertIfNotExists = function (newValue, arr) {
            if (arr.indexOf(newValue) === -1) {
                arr.push(newValue);
            }
        };

        var getTermObjValue = function (term, termArrObjs) {
            var tt = null;
            angular.forEach(termArrObjs, function (termValue, termKey) {
                //debugger;
                if (term === termKey) {
                    tt = termValue;
                }
            });

            return tt;
        };

        var prepareDate = function (data) {
            var allTerms = [];

            var fullPreparedData = [];

            angular.forEach(data, function (value, key) {
                angular.forEach(value.terms, function (termValue, termKey) {
                    insertIfNotExists(termKey, allTerms);
                });
            });
            console.log('allTerms: ' + JSON.stringify(allTerms));
            //fullPreparedData.push(allTerms);

            angular.forEach(data, function (value, key) {
                var newArrayRow = [];
                var d = new Date(Date.parse(value.key));
                var mm = moment(d);
                var momentedDate = moment(value.key);
                
                var dt = momentedDate.format(options.dtFormat || 'MM/DD/YYYY');//Date.parse(value.key);// (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                newArrayRow.push(dt);
                angular.forEach(allTerms, function (existingTerm) {
                    var termObjValue = getTermObjValue(existingTerm, value.terms);
                    if (termObjValue)
                        newArrayRow.push(termObjValue);
                    else
                        newArrayRow.push(0);
                });
                fullPreparedData.push(newArrayRow);
            });
            //arr.splice(2, 0, "Lene");
            allTerms.splice(0, 0, options.intervalName);
            fullPreparedData.splice(0, 0, allTerms);
            return fullPreparedData;
        };

        var topicTrendingData = prepareDate(rawData);

        console.log('preparedData: ' + JSON.stringify(topicTrendingData));
        var dtChart = google.visualization.arrayToDataTable(topicTrendingData);
        // Create and draw the visualization.
        var docElement = document.getElementById('visualization');
        var chart = GoCharting.getChartByType(options, docElement);
        
        chart.draw(dtChart, {
            title: options.chartTitle,
            height: 600,
            isStacked: options.isStacked || false,
            hAxis: {
                title: options.intervalName
            }
        });
    };


    //google.setOnLoadCallback(drawVisualization);

    if (!GoCharting.initialized) {
        GoCharting.init(function () {
            drawVisualization();
        });
    } else {
        drawVisualization();
    }

};
/* end of topic charting */
GoCharting.drawGeoLocationMainChart = function (rawData, options, container,  regionClick, initCallback) {
    
    function drawChart(preparedData, options){
        var dtChart = google.visualization.arrayToDataTable(preparedData);
        //var container = document.getElementById('visualization');
        var chart = new google.visualization.GeoChart(container);    
        chart.clearChart();
        
        function normalizedRegion(obj){
           // console.log('normalized obj: '+JSON.stringify(obj));
            regionClick(obj);
        };
        
        function regionClicked(obj){           
            normalizedRegion(obj.region);
        };

        function selected(){              
            var selection = chart.getSelection();
          //  console.log('select obj: '+JSON.stringify(selection));
            var selected = dtChart.getValue(selection[0].row, 0);
            normalizedRegion(selected);                            
        };
        
        google.visualization.events.addListener(chart, 'select', selected);
        google.visualization.events.addListener(chart, 'regionClick', regionClicked);
    
        
        chart.draw(dtChart, options);  
    };
    function prepareData(data){
        var firstRowColumns = ['Country', 'Value'];
        var dataArray = [];
        dataArray.push(firstRowColumns);
        for (var i=0;i<data.countries.length;i++){
            var countryObj = data.countries[i];

            var obj = [];
            obj.push(countryObj.country);
            obj.push(countryObj.value);
            dataArray.push(obj);
        }
        
        return dataArray;
    };
    function drawVisualization() {
      var preparedData = prepareData(rawData);
        drawChart(preparedData, options);        
    };    
    
    if (!GoCharting.initialized) {
        GoCharting.init(function () {
            drawVisualization();
            if (initCallback)
                initCallback();
        });
    } else {
        drawVisualization();
        if (initCallback)
            initCallback();
    }  
};

GoCharting.drawGeoLocationStatesChart = function (rawData, container, options, regionClick) {
    
    function drawChart(preparedData, options){
        var dtChart = google.visualization.arrayToDataTable(preparedData);
      //  var container = document.getElementById('visualization');
        var chart = new google.visualization.GeoChart(container);    
        chart.clearChart();
        
        
        function normalizedRegion(obj){
           // console.log('normalized obj: '+JSON.stringify(obj));
            regionClick(obj);
        };
        
        function regionClicked(obj){           
            normalizedRegion(obj.region);
        };

        function selected(){              
            var selection = chart.getSelection();
          //  console.log('select obj: '+JSON.stringify(selection));
            var selected = dtChart.getValue(selection[0].row, 0);
            normalizedRegion(selected);                            
        };
        
        if (regionClick){        
            google.visualization.events.addListener(chart, 'select', selected);
            google.visualization.events.addListener(chart, 'regionClick', regionClicked);
        }
       
        chart.draw(dtChart, options);  
    };
    function prepareData(data){
        var firstRowColumns = ['State', 'Name', 'Value'];
        var dataArray = [];
        dataArray.push(firstRowColumns);
        for (var i=0;i<data.length;i++){
            var countryObj = data[i];
            var obj = [];
            obj.push(countryObj.state);
            obj.push(countryObj.name);
            obj.push(countryObj.value);
            dataArray.push(obj);
        }
        
        return dataArray;
    };
    function drawVisualization() {
      var preparedData = prepareData(rawData);
        drawChart(preparedData, options);        
    };    
    
    if (!GoCharting.initialized) {
        GoCharting.init(function () {
            drawVisualization();
        });
    } else {
        drawVisualization();
    }  
};

GoCharting.drawGeoLocationCityChart = function (rawData, container, options) {
    
    function drawChart(preparedData, options){
        var dtChart = google.visualization.arrayToDataTable(preparedData);
       // var container = document.getElementById('visualization');
        var chart = new google.visualization.GeoChart(container);    
        chart.clearChart();
       
        chart.draw(dtChart, options);  
    };
    function prepareData(data){
        var firstRowColumns = ['City', 'Count'];
        var dataArray = [];
        dataArray.push(firstRowColumns);
        for (var i=0;i<data.cities.length;i++){
            var countryObj = data.cities[i];
            var obj = [];
            obj.push(countryObj.city);
            obj.push(countryObj.count);
            dataArray.push(obj);
        }
        
        return dataArray;
    };
    function drawVisualization() {
      var preparedData = prepareData(rawData);
        drawChart(preparedData, options);        
    };    
    
    if (!GoCharting.initialized) {
        GoCharting.init(function () {
            drawVisualization();
        });
    } else {
        drawVisualization();
    }  
};