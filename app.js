document.addEventListener('DOMContentLoaded', init);
function init() {
    var selectors = {
        checkBtn: document.getElementById('check'),
        inputVal: document.getElementById('input-number'),
        result: document.getElementById('result'),
        unique: document.getElementById('unique'),
        duplicate: document.getElementById('duplicate'),
    }

    var ds = {
        numData: [],
        duplicate: [],
        unique: []
    }

    selectors.checkBtn.addEventListener('click', handleButton);
    function handleButton() {
        var inputVal = selectors.inputVal.value;
        if (!inputVal) { alert("Please Enter a Number or a Range"); return; }
        if (/,/gm.test(inputVal)) {
            var numbers = inputVal.split(',');
            numbers.forEach(function (chunk) {
                processVal(chunk);
            });
        } else {
            processVal(inputVal);
        }
        ds.unique = getUnique();
        updateUI();
    }

    function updateUI() {
        selectors.result.innerText = ds.numData.toString();

        if (ds.unique.length > 0) {
            selectors.unique.innerText = ds.unique.toString();
        } else {
            selectors.unique.innerText = "Unique Will Show Here";
        }
        if (ds.duplicate.length > 0) {
            selectors.duplicate.innerText = ds.duplicate.toString();
        } else {
            selectors.duplicate.innerText = "Duplicate Will show here";
        }
    }

    //function to get ds.duplicates from single / multiple input
    function processVal(data) {
        if (/\-/gm.test(data)) {
            var range = data.split("-");
            var min = parseInt(range[0]);
            var max = parseInt(range[1]);
            for (var i = min; i <= max; i++) {
                if (ds.numData.indexOf(i) >= 0) {
                    ds.duplicate.push(i);
                } else {
                    ds.numData.push(i);
                }
            }
        } else {
            var num = parseInt(data);
            var i = ds.numData.indexOf(num);
            if (i >= 0) {
                ds.duplicate.push(num);
            } else {
                ds.numData.push(num);
            }
        }
    }
    //compar with data and get ds.unique values
    function getUnique() {
        return ds.numData.filter(function (n) {
            return ds.duplicate.indexOf(n) === -1;
        });
    }
}