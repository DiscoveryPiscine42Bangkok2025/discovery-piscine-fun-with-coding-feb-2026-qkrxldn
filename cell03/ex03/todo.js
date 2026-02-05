var list;

window.onload = function() {
    list = document.getElementById("ft_list");
    
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();

        if (c.indexOf("ft_list=") == 0) {
            var val = c.substring(8);
            if (val) {
                var data = JSON.parse(decodeURIComponent(val));
        
                for (var j = data.length - 1; j >= 0; j--) {
                    addTodo(data[j]);
                }
            }
        }
    }
}

function newTodo() {
    var text = prompt("New task:");
    if (text && text.trim() !== "") {
        addTodo(text);
        saveCookie();
    }
}

function addTodo(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    
    div.onclick = function() {
        if (confirm("Delete?")) {
            this.remove();
            saveCookie(); 
        }
    };

    list.insertBefore(div, list.firstChild);
}

function saveCookie() {
    var todos = [];
    var items = list.children;
    
    for (var i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }
    
    var json = JSON.stringify(todos);
    
    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = "ft_list=" + encodeURIComponent(json) + "; expires=" + date.toUTCString() + "; path=/;";
}