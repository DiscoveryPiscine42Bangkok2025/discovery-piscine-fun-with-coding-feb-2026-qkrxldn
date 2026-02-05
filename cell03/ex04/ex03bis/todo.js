$(document).ready(function() {
    var $list = $("#ft_list");

    var match = document.cookie.match(/ft_list=([^;]+)/);
    if (match) {
        var data = JSON.parse(decodeURIComponent(match[1]));
        for (var i = data.length - 1; i >= 0; i--) {
            addTodo(data[i]);
        }
    }

    $("#newBtn").click(function() {
        var text = prompt("New task:");
        if (text && text.trim()) {
            addTodo(text);
            saveCookie();
        }
    });

    function addTodo(text) {
        var $div = $("<div>").text(text);
        
        $div.click(function() {
            if (confirm("Delete?")) {
                $(this).remove();
                saveCookie(); 
            }
        });

        $list.prepend($div);
    }

    function saveCookie() {
        var todos = [];
        $list.children().each(function() {
            todos.push($(this).text());
        });
        
        var json = JSON.stringify(todos);
        var date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        
        document.cookie = `ft_list=${encodeURIComponent(json)}; expires=${date.toUTCString()}; path=/`;
    }
});