jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) {
            return b
        }
        if (t == d) {
            return b + c
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) {
            return b
        }
        if ((t /= d) == 1) {
            return b + c
        }
        if (!p) {
            p = d * 0.3
        }
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a)
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) {
            return b
        }
        if ((t /= d) == 1) {
            return b + c
        }
        if (!p) {
            p = d * 0.3
        }
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a)
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) {
            return b
        }
        if ((t /= d / 2) == 2) {
            return b + c
        }
        if (!p) {
            p = d * (0.3 * 1.5)
        }
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a)
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b
        } else {
            if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b
            } else {
                if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b
                }
            }
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) {
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b
        }
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
});
/* Search*/
var searchFormConfig = {
    summaryPost: true,
    resultThumbnail: true,
    fallbackThumb: "http://1.bp.blogspot.com/-41xX9MKBr-w/U1Tt0T8gNRI/AAAAAAAABZw/SocPS0qeq1k/s50-c/Noim.png",
    thumbSize: 50,
    summaryLength: 100
};
(function (c) {
    var a = c("#ajax-search-form"),
        d = a.find(":text");
    config = searchFormConfig;
    a.append('<div id="search-result"></div>');
    var b = c("#search-result");
    a.on("submit", function () {
        var e = d.val();
        b.slideDown(500, "easeOutBounce").html("Loading...");
        c.ajax({
            url: "http://www.bulshitman.blogspot.com/feeds/posts/summary?alt=json-in-script&q=" + e + "&max-results=5",
            type: "get",
            dataType: "jsonp",
            success: function (q) {
                var p = q.feed.entry,
                    m, l, o, n, g = "";
                if (p !== undefined) {
                    g = "<h4>Search results for keyword &quot;" + e + "&quot;</h4>";
                    g += '<a class="close" href="/">&times;</a><ul>';
                    for (var k = 0; k < p.length; k++) {
                        var f = new RegExp(e, "ig"),
                            o = p[k].title.$t.replace(f, "<mark>" + e + "</mark>");
                        for (var h = 0; h < p[k].link.length; h++) {
                            if (p[k].link[h].rel == "alternate") {
                                n = p[k].link[h].href
                            }
                        }
                        if (config.summaryPost === true) {
                            if ("content" in p[k]) {
                                m = p[k].content.$t
                            } else {
                                if ("summary" in p[k]) {
                                    m = p[k].summary.$t
                                } else {
                                    m = ""
                                }
                            }
                        }
                        if (config.resultThumbnail === true) {
                            if ("media$thumbnail" in p[k]) {
                                l = p[k].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + config.thumbSize + "-c")
                            } else {
                                l = config.fallbackThumb
                            }
                        }
                        m = m.replace(/<\S[^>]*>/g, "");
                        if (m.length > config.summaryLength) {
                            m = m.substring(0, config.summaryLength) + "..."
                        }
                        m = m.replace(f, "<mark>" + e + "</mark>");
                        g += '<li><a href="' + n + '" target="_blank"><span><img src="' + l + '" alt="" /></span><h5>' + o + "</h5></a><p>" + m + "</p></li>"
                    }
                    g += "</ul>";
                    b.html(g)
                } else {
                    b.html('<a class="close" href="/">&times;</a><strong>No result!</strong>')
                }
            },
            error: function () {
                b.html('<a class="close" href="/">&times;</a><strong>Error loading feed.</strong>')
            }
        });
        return false
    });
    a.on("click", ".close", function () {
        b.slideUp(500, "easeInExpo");
        return false
    })
})(jQuery);
