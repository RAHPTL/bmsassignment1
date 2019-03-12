(function (window, document){
    'use strict';
    window.app = {};

    app.selectors = {
        checkBtn: document.getElementById('check'),
        inputVal: document.getElementById('input-number'),
        result: document.getElementById('result'),
        unique: document.getElementById('unique'),
        duplicate: document.getElementById('duplicate')
    }

    app.ds = {
        numData: [],
        duplicate: [],
        unique: []
    }

    app.init = function(){
        console.log("INIT");
        app.selectors.checkBtn.addEventListener('click', app.handleButton);
    }

    app.handleButton = function() {
        var inputVal = app.selectors.inputVal.value;
        if (!inputVal) { alert("Please Enter a Number or a Range"); return; }
        if (/,/gm.test(inputVal)) {
            var numbers = inputVal.split(',');
            numbers.forEach(function (chunk) {
                app.processVal(chunk);
            });
        } else {
            app.processVal(inputVal);
        }
        app.ds.unique = app.getUnique();
        app.updateUI();
    }

    app.updateUI = function() {
        app.selectors.result.innerText = app.ds.numData.toString();

        if (app.ds.unique.length > 0) {
            app.selectors.unique.innerText = app.ds.unique.toString();
        } else {
            app.selectors.unique.innerText = "Unique Will Show Here";
        }
        if (app.ds.duplicate.length > 0) {
            app.selectors.duplicate.innerText = app.ds.duplicate.toString();
        } else {
            app.selectors.duplicate.innerText = "Duplicate Will show here";
        }
    }

    app.processVal = function(data) {
        if (/\-/gm.test(data)) {
            var range = data.split("-");
            var min = parseInt(range[0]);
            var max = parseInt(range[1]);
            for (var i = min; i <= max; i++) {
                if (app.ds.numData.indexOf(i) >= 0) {
                    app.ds.duplicate.push(i);
                } else {
                    app.ds.numData.push(i);
                }
            }
        } else {
            var num = parseInt(data);
            var i = app.ds.numData.indexOf(num);
            if (i >= 0) {
                app.ds.duplicate.push(num);
            } else {
                app.ds.numData.push(num);
            }
        }
    }

    app.getUnique = function() {
        return app.ds.numData.filter(function (n) {
            return app.ds.duplicate.indexOf(n) === -1;
        });
    }

    app.init();
})(window,document);