(() => {
    function d(e) {
        for (var t = e + "=", c = document.cookie.split(";"), o = 0; o < c.length; o++) {
            for (var a = c[o]; a.charAt(0) === " ";) a = a.substring(1);
            if (a.indexOf(t) === 0) return a.substring(t.length, a.length)
        }
        return ""
    }

    function u(e, t, c) {
        var o = new Date;
        o.setTime(o.getTime() + c * 24 * 60 * 60 * 1e3);
        var a = "expires=" + o.toUTCString();
        document.cookie = e + "=" + t + ";" + a + ";path=/"
    }

    if (!d("sitevisitor")) {
        let e = new Object, t = new Date(Date().toLocaleString("de-DE", {timeZone: "Europe/Sofia"}));
        e.referer = document.referrer, e.request = location.pathname.substring(1), e.time = t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + ("0" + t.getSeconds()).slice(-2), u("sitevisitor", btoa(JSON.stringify(e)), 365)
    }

    function g(e) {
        document.querySelector(e).innerHTML = '<div class="loading mb-2" style="display: block;"></div>'
    }

    function y(e) {
        e.forEach(function (t) {
            t.addEventListener("click", function (c) {
                c.preventDefault();
                let o = this.getAttribute("data-append");
                this.getAttribute("data-silent") || g(o);
                let a = new FormData;
                a.append("ajax", "true"), window.fetch(this.href, {
                    method: "POST",
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                    body: a
                }).then(r => {
                    if (r.ok) return r.text();
                    throw new Error(`${r.status} ${r.statusText}`)
                }).then(r => {
                    let n = document.querySelector(o);
                    n.innerHTML = r, f(n)
                }).catch(r => {
                    console.log(r)
                })
            })
        })
    }

    // function w(e) {
    //     e.forEach(function (t) {
    //         t.addEventListener("submit", function (c) {
    //             c.preventDefault();
    //             let o = this.getAttribute("data-append"), a = document.querySelector("#hero"),
    //                 r = document.querySelector(".search-bar");
    //             a && a.remove(), r.classList.contains("d-none") || r.classList.add("d-none"), this.getAttribute("data-silent") || g(o);
    //             let n = new FormData(this);
    //             n.append("ajax", "true"), fetch(this.getAttribute("action"), {
    //                 method: "POST",
    //                 headers: {"X-Requested-With": "XMLHttpRequest"},
    //                 body: n
    //             }).then(i => {
    //                 if (i.ok) return i.text();
    //                 throw new Error(`${i.status} ${i.statusText}`)
    //             }).then(i => {
    //                 let s = document.querySelector(o);
    //                 s.innerHTML = i, f(s)
    //             }).catch(i => {
    //                 console.log(i)
    //             })
    //         })
    //     })
    // }

    // function f(e) {
    //     y(e.querySelectorAll(".ajaxlink")), w(e.querySelectorAll(".ajaxform"))
    // }

    // f(document);
    var m = document.querySelector(".scroll-top");
    if (m) {
        let e = function () {
            window.scrollY > 100 ? m.classList.add("active") : m.classList.remove("active")
        };
        window.addEventListener("load", e), document.addEventListener("scroll", e), m.addEventListener("click", window.scrollTo({
            top: 0,
            behavior: "smooth"
        }))
    }
    var p = document.querySelector(".search-bar-toggle");
    p && p.addEventListener("click", () => {
        document.querySelector(".search-bar").classList.toggle("d-none")
    });
    var L = document.querySelector(".mobile-nav-show"), S = document.querySelector(".mobile-nav-hide");
    document.querySelectorAll(".mobile-nav-toggle").forEach(e => {
        e.addEventListener("click", function (t) {
            t.preventDefault(), q()
        })
    });

    function q() {
        document.querySelector("body").classList.toggle("mobile-nav-active"), L.classList.toggle("d-none"), S.classList.toggle("d-none")
    }

    var k = document.querySelectorAll(".navbar .nav-categories > a");
    k.forEach(e => {
        e.addEventListener("click", function (t) {
            document.querySelector(".mobile-nav-active") && (t.preventDefault(), this.classList.toggle("active"), this.nextElementSibling.classList.toggle("nav-categories-active"))
        })
    });

    function v(e) {
        window.scrollTo({
            top: document.querySelector(e).offsetTop - document.querySelector("#header").offsetHeight,
            behavior: "smooth"
        })
    }

    document.querySelectorAll(".scrollto").forEach(e => e.addEventListener("click", function (t) {
        document.querySelector(this.hash) && (t.preventDefault(), v(this.hash))
    }));

    document.addEventListener("DOMContentLoaded", () => {
        "use strict";
        document.querySelectorAll(".php-email-form").forEach(function (o) {
            o.addEventListener("submit", function (a) {
                a.preventDefault();
                let r = this, n = r.getAttribute("action");
                if (!n) {
                    c(r, "The form action property is not set!");
                    return
                }
                r.querySelector(".loading").classList.add("d-block"), r.querySelector(".error-message").classList.remove("d-block"), r.querySelector(".sent-message").classList.remove("d-block");
                let s = new FormData(r);
                t(r, n, s)
            })
        });

        function t(o, a, r) {
            fetch(a, {method: "POST", body: r, headers: {"X-Requested-With": "XMLHttpRequest"}}).then(n => {
                if (n.ok) return n.text();
                throw new Error(`${n.status} ${n.statusText} ${n.url}`)
            }).then(n => {
                if (o.querySelector(".loading").classList.remove("d-block"), n.trim() == "OK") o.querySelector(".sent-message").classList.add("d-block"), o.reset(); else throw new Error(n || "Form submission failed and no error message returned from: " + a)
            }).catch(n => {
                c(o, n)
            })
        }

        function c(o, a) {
            o.querySelector(".loading").classList.remove("d-block"), o.querySelector(".error-message").innerHTML = a, o.querySelector(".error-message").classList.add("d-block")
        }
    });
    document.querySelectorAll(".members-nav a").forEach(function (e) {
        e.addEventListener("click", function (t) {
            document.querySelector(".members-nav a.active").classList.remove("active"), this.classList.add("active")
        })
    });
})();
