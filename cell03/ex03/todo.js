var list;

window.onload = function() {
    list = document.getElementById("ft_list");
    
    var match = document.cookie.match(/ft_list=([^;]+)/);
    if (match) {
        var data = JSON.parse(decodeURIComponent(match[1]));
        for (var i = data.length - 1; i >= 0; i--) {
            addTodo(data[i]);
        }
    }
}

function newTodo() {
    var text = prompt("New task:");
    if (text && text.trim()) {
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

    list.prepend(div);
}

function saveCookie() {
    var todos = Array.from(list.children).map(div => div.innerHTML);
    
    var json = JSON.stringify(todos);
    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    
    document.cookie = `ft_list=${encodeURIComponent(json)}; expires=${date.toUTCString()}; path=/`;
}