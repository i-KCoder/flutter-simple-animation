var lang = { code: "", charCount: 0, breakCount: 2 };
let interval = 50;
let si;
let fileName = "index.html"

function input() {
    let fileType = $("#lng").val();
    switch (lang.code[lang.charCount]) {
        case "\n":
            lang.breakCount++;
            $("#line").html($("#line").html() + "<br><i class=\"number\">" + lang.breakCount + "</i>");
            if(fileType != 'txt'){
                $("#out").html($("#out").html() + '~ ');
            }else{
                $("#out").html($("#out").html() + '<br>');
            }
           
            break;
        case "\t":
            $("#out").html($("#out").html() + "<i></i>&nbsp;&nbsp;&nbsp;&nbsp;");
            break;
        case " ":
            $("#out").html($("#out").html() + "&nbsp;");
            break;
        case undefined:
            break;
        default:
            $("#out").html($("#out").html() + lang.code[lang.charCount]);
            break;
    }
    colorCode();
    lang.charCount++;
}

function colorCode() {
    let fileType = $("#lng").val();
    if (fileType != 'txt') {
        var e = $("#out").text().replace(/</g, "&lt;").replace(/>/g, "&gt;");

        languages[fileType].colors.map(function (t) {
            var r = t.regex.replacement || "$1";
            e = e.replace(new RegExp(t.regex.string, t.regex.flags), '<span class="' + t.class + '">' + r + "</span>")
        });
    }
    $("#out").html(e);
}

languages = {
    html: {
        colors: [{
            regex: {
                string: "([a-z]*=(.*?)(?=&gt;))",
                flags: "g"
            },
            class: "||attributes"
        }, {
            regex: {
                string: "(&lt;(/|)[a-zA-Z0-9]*)",
                flags: "g"
            },
            class: "||innerBrackets"
        }, {
            regex: {
                string: "(&gt;)",
                flags: "g"
            },
            class: "||lesserOrGreaterBrackets"
        }, {
            regex: {
                string: "(&lt;)",
                flags: "g"
            },
            class: "||lesserOrGreaterBrackets"
        }, {
            regex: {
                string: "(~)",
                flags: "g"
            },
            class: "||breakpoint"
        }],
    },
    css: {
        colors: [{
            regex: {
                string: "([{}])",
                flags: "g"
            },
            class: "||brackets"
        }, {
            regex: {
                string: "([a-zA-Z0-9-]*:)",
                flags: "g"
            },
            class: "||selectors"
        }, {
            regex: {
                string: "(#[a-zA-Z0-9]*)(?=(;| |\\r|\\n))",
                flags: "g"
            },
            class: "||numbers"
        }, {
            regex: {
                string: "(~)",
                flags: "g"
            },
            class: "||breakpoint"
        }],
    },
    javascript: {
        colors: [{
            regex: {
                string: "(var|const|let|if|else|document|window|do|forEach|for|return|switch|try|catch|function|continue|debugger|break|while|true|null|undefined|false|new|await|async|of)(?=( |;|\\.|{|}|\\=|\\(|\\)))(?!(| )<\\/(.*)>)",
                flags: "gi"
            },
            class: "||general"
        }, {
            regex: {
                string: "('(([a-zA-Z\\.,!\"§$%&/()-=?\\[\\]#`_ ])*?)')",
                flags: "gi"
            },
            class: "||strings"
        }, {
            regex: {
                string: '(`([a-zA-Z\\.,!"§$%&/()-=?\\[\\]#`_ ]*?)`)',
                flags: "gi"
            },
            class: "||strings"
        }, {
            regex: {
                string: '("([a-zA-Z\\.,!"§$%&/()-=?\\[\\]#`_ ]*?)")',
                flags: "gi"
            },
            class: "||strings"
        }, {
            regex: {
                string: "((\\.([a-zA-Z0-9]*))\\()",
                flags: "gi"
            },
            class: "||functions"
        }, {
            regex: {
                string: "([\\(\\)])",
                flags: "gi"
            },
            class: "||functions"
        }, {
            regex: {
                string: "([{}\\[\\]])",
                flags: "g"
            },
            class: "||brackets"
        }, {
            regex: {
                string: "(\\/\\*((.|\\n|\\r)*)\\*\\/|\\/\\/(.*))",
                flags: "g"
            },
            class: "||comments"
        }, {
            regex: {
                string: "(~)",
                flags: "g"
            },
            class: "||breakpoint"
        }],
    }
}

function init() {
    $("#out").html("");
    $("#line").html("<i class=\"number\">1</i><br><i class=\"number\">2</i>");
    $("#out").html("<br>");
    var to = lang.charCount;
    lang.charCount = 0;
    lang.breakCount = 2;
    while (lang.charCount < to) {
        input()
    }
}

window.addEventListener('load', async () => {
    init();
    $("#fileName").text(fileName);
    $("body").keyup(input);
    $("input#speed").change(function () {
        if ($(this).val() > 0 || $(this).val() !== null) {
            interval = $(this).val();
        }
        clearInterval(si);
        si = setInterval(input, interval);
    });

    $("select#lng").change(function () {
        if ($(this).val() == "html") {
            fileName = "index.html"
        } else if ($(this).val() == "css") {
            fileName = "style.css"
        } else if ($(this).val() == "javascript") {
            fileName = "script.js"
        }
        $("#fileName").text(fileName);
    });

    $("button#autorun").click(function () {
        window.lang.breakCount = 2;
        window.lang.charCount = 0;
        $("#out").html("");
        $("#line").html("<i class=\"number\">1</i><br><i class=\"number\">2</i>");
        $("#out").html("<br>");
        lang.code = "  " + $("textarea#clientCode").val()
        clearInterval(si);
        si = setInterval(input, interval);
    })
})
