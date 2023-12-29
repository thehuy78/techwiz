var app = angular.module("app", ["ngSanitize", "ngRoute", "slickCarousel"]);

app.run(function ($rootScope, $http, $window, $location) {
  $rootScope.list = [];
  $rootScope.search_list = [];
  $rootScope.input;

  $http.get("./json/product.json").then(function (a) {
    $rootScope.list = a.data.plant;
    // start set page news
    $rootScope.pagesize = 6;
    $rootScope.totalPages = Math.ceil($rootScope.list.length / $rootScope.pagesize);
    $rootScope.currentPage = 0;
    $rootScope.pages = [];
    for (let i = 0; i < $rootScope.totalPages; i++) {
      $rootScope.pages[i] = $rootScope.list.slice(i * $rootScope.pagesize, (i + 1) * $rootScope.pagesize);
    }
    // end

    $http.get("./json/product.json").then(function (a) {
      $rootScope.product_detail = a.data.plant;
    });
  });

  window.addEventListener("scroll", function () {
    const mainNav = document.querySelector(".main-nav");
    if ($window.pageYOffset == 0) {
      mainNav.classList.remove("shadow");
      mainNav.classList.remove("sticky-top");
      mainNav.classList.remove("nav-animation");
    }

    if ($window.pageYOffset > 120) {
      mainNav.classList.add("shadow");
      mainNav.classList.add("sticky-top");
      mainNav.classList.add("nav-animation");
    }
  });

  $rootScope.list_blog = [];
  $rootScope.search_list_blog = [];
  $rootScope.input_blog;
  $http.get("./json/blog.json").then(function (a) {
    $rootScope.list_blog = a.data;
    // start set page news
    $rootScope.pagesize_blog = 4;
    $rootScope.totalPages_blog = Math.ceil($rootScope.list_blog.length / $rootScope.pagesize_blog);
    $rootScope.currentPage_blog = 0;
    $rootScope.pages_blog = [];
    for (let i = 0; i < $rootScope.totalPages_blog; i++) {
      $rootScope.pages_blog[i] = $rootScope.list_blog.slice(i * $rootScope.pagesize_blog, (i + 1) * $rootScope.pagesize_blog);
    }
    // end
  });

  $http.get("./json/blog.json").then(function (a) {
    $rootScope.ds = a.data;
  });

  $rootScope.visitedCount;
  $rootScope.currentOnline;

  // window.addEventListener("load", function () {
  //   if (localStorage.getItem("visitedCount") == null) {
  //     localStorage["visitedCount"] = 99;
  //   }

  //   if (localStorage.getItem("currentOnline") == null) {
  //     localStorage["currentOnline"] = 1;
  //   }

  //   $rootScope.visitedCount = parseInt(localStorage["visitedCount"]) + 1;
  //   $rootScope.currentOnline = parseInt(localStorage["currentOnline"]) + 1;

  //   localStorage.setItem("visitedCount", $rootScope.visitedCount);
  //   localStorage.setItem("currentOnline", $rootScope.currentOnline);
  // });

  // window.addEventListener("unload", function () {
  //   if (localStorage.getItem("currentOnline") == null) {
  //     localStorage["currentOnline"] = 12;
  //   }

  //   if ($rootScope.currentOnline <= 1) return;
  //   $rootScope.currentOnline = parseInt(localStorage["currentOnline"]) - 1;

  //   localStorage.setItem("currentOnline", $rootScope.currentOnline);
  // });

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (localStorage.getItem("visitedCount") == null) {
      localStorage["visitedCount"] = 99;
    }

    if (localStorage.getItem("currentOnline") == null) {
      localStorage["currentOnline"] = 1;
    }

    $rootScope.visitedCount = parseInt(localStorage["visitedCount"]) + 1;
    $rootScope.currentOnline = parseInt(localStorage["currentOnline"]) + 1;

    localStorage.setItem("visitedCount", $rootScope.visitedCount);
    localStorage.setItem("currentOnline", $rootScope.currentOnline);
  });

  $rootScope.$on("$destroy", function () {
    if (localStorage.getItem("currentOnline") == null) {
      localStorage["currentOnline"] = 12;
    }

    if ($rootScope.currentOnline <= 1) return;
    $rootScope.currentOnline = parseInt(localStorage["currentOnline"]) - 1;

    localStorage.setItem("currentOnline", $rootScope.currentOnline);
  });

  $rootScope.currentUser;

  if (localStorage.getItem("currentUser") == null) {
    $rootScope.currentUser = "";
  } else {
    $rootScope.currentUser = localStorage.getItem("currentUser");
  }

  $rootScope.logoutCurrentUser = function () {
    $rootScope.currentUser = "";
    localStorage.setItem("currentUser", "");
    $location.path("/");
    localStorage.setItem("totalCartItem", 0);
    $rootScope.totalCartItem = 0;
  };

  $rootScope.totalCartItem = +localStorage.getItem("totalCartItem") || 0;

  var cnt = 1;
  var chatBox = document.getElementById("chat-box");
  $rootScope.sendMessage = function () {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;
    if (message.trim() !== "") {
      displayMessage(message);
      messageInput.value = "";
      setTimeout(function () {
        var adminResponse =
          "Your message has been received. We will respond as soon as possible !";
        displayMessageAdmin(adminResponse);
      }, 1000);
    }
  }

  var clickCount1 = 0;
  var clickCount2 = 0;
  $rootScope.clickcheckbox = function () {
    var chatbox1 = document.getElementById("chatbox_1");
    var chatbox2 = document.getElementById("chatbox_2");
    var chatboxvalue = chatbox1.textContent;
    var goiy = document.getElementById("goi_y");
    var khoiaomess = document.querySelector(".khoiao__mess");
    displayMessage(chatboxvalue);
    setTimeout(function () {
      var adminResponse = "";
      if (chatboxvalue == "Hotline ?") {
        adminResponse = "Hotline: 0909.009.009.";
        chatbox1.style.display = "none";
      }
      if (chatboxvalue.trim() == "Hello !") {
        adminResponse = "Hello!";

      }

      displayMessageAdmin(adminResponse);
    }, 1000);
    clickCount1++;
    clickCount2++;

    if (clickCount1 === 1) {
      chatbox1.innerHTML = "Hotline ?";
      chatbox2.style.display = "inline-block"
      chatbox2.innerHTML = "Address ?"
    }


    sethottline()





  }


  $rootScope.clickcheckbox2 = function () {
    var chatbox2 = document.getElementById("chatbox_2");
    var chatboxvalue = chatbox2.textContent;
    var goiy = document.getElementById("goi_y");
    var khoiaomess = document.querySelector(".khoiao__mess");
    displayMessage(chatboxvalue);
    setTimeout(function () {
      var adminResponse = "";
      if (chatboxvalue == "Address ?") {
        adminResponse = "CN1: 590 CMT8 P11,Q3,TPHCM<p style=\"padding: 0;margin: 0;\">CN2: 391A Nam Kỳ Khởi Nghĩa, Võ Thị Sáu, Quận 3, HCM</p><p style=\"padding: 0;margin: 0;\">CN3: 62 Đường 36, Hiệp Bình Phước, Vạn Phúc, Thủ Đức</p>";
        chatbox2.style.display = "none";
      }

      displayMessageAdmin(adminResponse);
    }, 1000);
    clickCount2++;
    if (clickCount2 === 1) {
      chatbox2.innerHTML = "Address ?";
    }
  }
  var set_time;
  function sethottline() {
    if (clickCount1 == 1) {
      set_time = setTimeout(function () {
        adminResponse = "Please leave your phone number, we will contact you as soon as possible!";
        displayMessageAdmin(adminResponse);
      }, 7000)
    }

  }


  function displayMessage(message) {
    var newMessage = document.createElement("p");
    var newMessagebox = document.createElement("div");
    newMessage.innerHTML = message;
    newMessage.classList = "mess_new";
    newMessagebox.classList = "mess_new_container";
    newMessagebox.appendChild(newMessage);
    chatBox.appendChild(newMessagebox);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  function displayMessageAdmin(message) {
    var newMessageAdmin = document.createElement("p");
    newMessageAdmin.innerHTML = message;
    newMessageAdmin.classList = "mess_new_admin";
    chatBox.appendChild(newMessageAdmin);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  var messageInput = document.getElementById("message-input");
  messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      $rootScope.sendMessage();
    }
  });

  $rootScope.showChatButton = "<<"

  $rootScope.showContainerChat = function () {
    var chatbox1 = document.getElementById("chatbox_1");
    var chatbox2 = document.getElementById("chatbox_2");

    const chatContainer = document.querySelector(".container__chatbox");
    chatContainer.classList.toggle("click-show-chat");


    if ($rootScope.showChatButton == "<<") {
      $rootScope.showChatButton = "x"
    } else {
      $rootScope.showChatButton = "<<";
      chatBox.innerHTML = "";
      chatbox1.style.display = "inline-block";
      chatbox2.style.display = "none";
      clickCount1 = 0;
      clickCount2 = 0;
      chatbox1.innerHTML = "Hello !"
      clearTimeout(set_time);


    }
  }

});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/blogInfo", {
      templateUrl: "./html/blog-info.html",
    })
    .when("/productList", {
      templateUrl: "./html/product.html",
    })
    .when("/product_detail", {
      templateUrl: "./html/product_detail.html",
    })
    .when("/cart", {
      templateUrl: "./html/cart.html",
    })
    .when("/blog", {
      templateUrl: "./html/blog-list.html",
    })
    .when("/blog-infor", {
      templateUrl: "./html/blog-infor.html",
    })
    .when("/feedback", {
      templateUrl: "./html/feedback.html",
    })
    .when("/pay", {
      templateUrl: "./html/pay.html",
    })
    .when("/login", {
      templateUrl: "./html/Login.html",
    })
    .when("/register", {
      templateUrl: "./html/Register.html",
    })
    .when("/contactus", {
      templateUrl: "./html/contactus.html",
    })
    .when("/sitemap", {
      templateUrl: "./html/site-map.html",
    })
    .otherwise({
      templateUrl: "./html/home.html",
    });
});

app.filter("searchBlog", function () {
  return function (list_blog, a) {
    if (a) {
      var filteredList = [];
      for (let i = 0; i < list_blog.length; i++) {
        if (list_blog[i].title.toLowerCase().indexOf(a.toLowerCase()) !== -1) {
          filteredList.push(list_blog[i]);
        }
      }
      return filteredList;
    }
  };
});

app.filter("search", function () {
  return function (list, input, size, price, typeplant) {
    if (input === undefined && (size === undefined || size === "all") && price === undefined && typeplant === undefined) {
      return list;
    }

    if (input === undefined && size !== "all" && size !== undefined && price === undefined && typeplant === undefined) {
      var filteredList = [];
      for (let i = 0; i < list.length; i++) {
        if (size === list[i].size) {
          filteredList.push(list[i]);
        }
      }
      return filteredList;
    }
    if (input === undefined && (size === "all" || size === undefined) && price === undefined && typeplant !== undefined) {
      var filteredList = [];

      for (let i = 0; i < list.length; i++) {
        if (typeplant === list[i].type) {
          filteredList.push(list[i]);
        }
        console.log(filteredList);
      }
      return filteredList;
    }
    if (input === undefined && size !== "all" && size !== undefined && price === undefined && typeplant !== undefined) {
      var filteredList = [];
      for (let i = 0; i < list.length; i++) {
        if (size === list[i].size && list[i].type === typeplant) {
          filteredList.push(list[i]);
        }
      }
      return filteredList;
    }
    if (input === undefined && (size === undefined || size === "all") && price !== undefined && typeplant === undefined) {
      var filteredList = [];
      if (price === "lower10") {
        for (let i = 0; i < list.length; i++) {
          if (list[i].price < 10) {
            filteredList.push(list[i]);
          }
        }

        return filteredList;
      }
      if (price === "upper10") {
        for (let i = 0; i < list.length; i++) {
          if (list[i].price > 10) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "5-10") {
        for (let i = 0; i < list.length; i++) {
          if (list[i].price < 10 && list[i].price > 5) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
    }
    if (input === undefined && size !== "all" && size !== undefined && price !== undefined && typeplant === undefined) {
      var filteredList = [];
      if (price === "lower10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price < 10) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "upper10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price > 10) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "5-10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price < 10 && list[i].price > 5) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
    }
    if (input === undefined && (size === "all" || size === undefined) && price !== undefined && typeplant !== undefined) {
      var filteredList = [];
      if (price === "lower10") {
        for (let i = 0; i < list.length; i++) {
          if (typeplant === list[i].type && list[i].price < 10) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "upper10") {
        for (let i = 0; i < list.length; i++) {
          if (typeplant === list[i].type && list[i].price > 10) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "5-10") {
        for (let i = 0; i < list.length; i++) {
          if (typeplant === list[i].type && list[i].price < 10 && list[i].price > 5) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
    }
    if (input === undefined && size !== "all" && size !== undefined && price !== undefined && typeplant !== undefined) {
      var filteredList = [];
      if (price === "5-10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price < 10 && list[i].price > 5 && typeplant === list[i].type) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "upper10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price > 10 && typeplant === list[i].type) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (price === "lower10") {
        for (let i = 0; i < list.length; i++) {
          if (size === list[i].size && list[i].price < 10 && typeplant === list[i].type) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
    }
    if (input !== undefined && typeof input === "string" && input !== "") {
      var filteredList = [];
      if ((size === undefined || size === "all") && price === undefined && typeplant === undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price !== undefined && typeplant === undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price === undefined && typeplant === undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price === undefined && typeplant !== undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price !== undefined && typeplant !== undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price === undefined && typeplant !== undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].type === typeplant) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (size !== undefined && size !== "all" && price !== undefined && typeplant === undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price !== undefined && typeplant !== undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price > 10 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && list[i].price > 5 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
    }

    //------------------------------------------------------------

    if (input !== undefined && typeof input === "string" && input === "") {
      var filteredList = [];
      if ((size === undefined || size === "all") && price === undefined && typeplant === undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price !== undefined && typeplant === undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price === undefined && typeplant === undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price === undefined && typeplant !== undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if ((size === undefined || size === "all") && price !== undefined && typeplant !== undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].type === typeplant && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price === undefined && typeplant !== undefined) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].type === typeplant) {
            filteredList.push(list[i]);
          }
        }
        return filteredList;
      }
      if (size !== undefined && size !== "all" && price !== undefined && typeplant === undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price > 10) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && list[i].price > 5) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
      if (size !== undefined && size !== "all" && price !== undefined && typeplant !== undefined) {
        if (price === "lower10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "upper10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price > 10 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
        if (price === "5-10") {
          for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && list[i].size === size && list[i].price < 10 && list[i].price > 5 && typeplant === list[i].type) {
              filteredList.push(list[i]);
            }
          }
          return filteredList;
        }
      }
    }



    else {
      return list;
    }
  };
});

function getCurrentHour() {
  let hour = new Date().getHours();

  if (hour < 10) {
    return "0" + hour;
  }

  return hour;
}

function getCurrentMinute() {
  let minute = new Date().getMinutes();

  if (minute < 10) {
    return "0" + minute;
  }

  return minute;
}

function getCurrentSecond() {
  let second = new Date().getSeconds();

  if (second < 10) {
    return "0" + second;
  }

  return second;
}

app.controller("homeController", function ($scope, $rootScope, $window, $location, $timeout) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $scope.slickConfig = {
    enabled: true,
    draggable: true,
    infinite: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    event: {
      beforeChange: function (event, slick, currentSlide, nextSlide) {
        // You can add custom logic here before slide change
      },
      afterChange: function (event, slick, currentSlide, nextSlide) {
        // Remove 'slick-current' class from all slides
        angular.element(".slide").removeClass("slick-current");

        // Add 'slick-current' class to the current slide
        angular.element('.slide[data-slick-index="' + currentSlide + '"]').addClass("slick-current");
      },
    },
  };

  if (!localStorage.getItem("newsletter")) {
    setTimeout(() => {
      const newsletter = document.querySelector(".body--newsletter");
      const overlay = document.querySelector(".body--overlay");

      overlay.style.display = "block";
      newsletter.style.display = "block";
      overlay.style.opacity = 1;
      newsletter.style.opacity = 1;
    }, 2000);
  } else {
    const newsletter = document.querySelector(".body--newsletter");
    const overlay = document.querySelector(".body--overlay");

    overlay.style.display = "none";
    newsletter.style.display = "none";
    overlay.style.opacity = 0;
    newsletter.style.opacity = 0;
  }

  const EMAIL_REGEX = /^\w+@\w+\.\w+$/;

  const closeNewsletter = document.querySelector(".newsletter__close");
  const subscribeButton = document.querySelector(".newsletter-container > button");

  subscribeButton.onclick = function () {
    const email = document.querySelector(".newsletter-container > input");
    if (!EMAIL_REGEX.test(email.value)) {
      alert("wrong");
    } else {
      const newsletter = document.querySelector(".body--newsletter");
      const overlay = document.querySelector(".body--overlay");

      overlay.style.display = "none";
      newsletter.style.display = "none";
      overlay.style.opacity = 0;
      newsletter.style.opacity = 0;

      localStorage.setItem("newsletter", true);
    }
  };

  closeNewsletter.onclick = function () {
    const newsletter = document.querySelector(".body--newsletter");
    const overlay = document.querySelector(".body--overlay");
    const notShow = document.querySelector(".newsletter__dontshow input");

    overlay.style.display = "none";
    newsletter.style.display = "none";
    overlay.style.opacity = 0;
    newsletter.style.opacity = 0;

    if (notShow.checked == true) {
      localStorage.setItem("newsletter", true);
    }
  };

  let timer = $timeout(function tick() {
    $scope.hour = getCurrentHour();
    $scope.minute = getCurrentMinute();
    $scope.second = getCurrentSecond();

    timer = $timeout(tick, 1000);
  }, 1000);

});

app.controller("product", function ($scope, $rootScope, $filter, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  const a = document.querySelectorAll("#list__product__type");

  a.forEach((a) => {
    let isVisible = false;

    a.addEventListener("click", (event) => {
      const b = a.querySelectorAll(".product__type");

      b.forEach((b) => {
        if (isVisible) {
          b.style.display = "none";
        } else {
          b.style.display = "block";
        }
      });

      isVisible = !isVisible;

      // Ngăn sự kiện click trên phần tử b lan ra ngoài
      event.stopPropagation();
    });
  });

  // Thêm sự kiện click cho các phần tử b để ngăn lan truyền sự kiện lên phần tử a
  const bElements = document.querySelectorAll(".product__type");
  bElements.forEach((b) => {
    b.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
  $scope.$on('$routeChangeSuccess', function () {
    $scope.input = "";
  });

  $scope.button_page = true;
  $scope.showsearch = false;
  $scope.showpage = true;
  $scope.showsearch_size = false;
  $scope.page_number = true;
  // $scope.page_number_search_size = false;
  $scope.backgroundcolor = "cornflowerblue";
  $scope.pagenumber = 0;
  $scope.color = "black";
  $scope.confirm_search = false;
  $scope.nextpage = function () {
    if ($rootScope.total_pages_search == 0 || $rootScope.total_pages_search === undefined) {
      if ($rootScope.currentPage < $rootScope.totalPages - 1) {
        $rootScope.currentPage++;
        $scope.pagenumber = $rootScope.currentPage;
      }
    } else {
      if ($rootScope.currentPage < $rootScope.total_pages_search - 1) {
        $rootScope.currentPage++;
        $scope.pagenumber = $rootScope.currentPage;
      }
    }
  };
  $scope.previewpage = function () {
    if ($rootScope.currentPage > 0) {
      $rootScope.currentPage--;
      $scope.pagenumber = $rootScope.currentPage;
    }
  };
  $scope.handleClick = function (event, infor) {
    if (event.which === 3) {
      localStorage.setItem("product", infor.name);
    }
  };
  $scope.getname = function (infor) {
    localStorage.setItem("product", infor.name);
  };

  $scope.click_number = function ($index) {
    $window.scrollTo(0, 0);
    $rootScope.currentPage = $index;
    $scope.pagenumber = $index;
  };
  $scope.setshow_search_or_page = function () {
    $rootScope.input = $scope.input;
    $scope.showresult = false;

    if ($scope.input === "") {
      $scope.showsearch = false;
      $scope.showpage = true;
      $scope.size = undefined;
      $scope.price = undefined;
      $scope.typeplant = undefined;
      $scope.page_number = true;
      $scope.page_number_search = false;

      $scope.showresult = false;
    } else {
      $scope.showsearch = true;
      $scope.showpage = false;

      $scope.page_number = false;
      $scope.page_number_search = true;

      $scope.pagenumber = $rootScope.currentPage = 0;
      $scope.showresult = true;
    }
  };
  $scope.arrange = "ins";

  $scope.getValue = function () {
    $scope.showsearch = true;
    $scope.showpage = false;

    $scope.page_number = false;
    $scope.page_number_search = true;

    $scope.pagenumber = $rootScope.currentPage = 0;
    $scope.showresult = true;
  };

  $scope.$watchGroup(["input", "size", "price", "typeplant", "arrange"], function (newValues, oldValues) {
    var new_input = newValues[0];
    var new_size = newValues[1];
    var new_price = newValues[2];
    var new_typeplant = newValues[3];
    var new_arrange = newValues[4];
    var old_input = oldValues[0];
    var old_size = oldValues[1];
    var old_price = oldValues[2];
    var old_typeplant = oldValues[3];
    var old_arrange = oldValues[4];
    console.log($scope.arrange);
    if (new_input !== old_input || new_size !== old_size || new_price !== old_price || new_typeplant !== old_typeplant || new_arrange !== old_arrange) {
      $rootScope.search_list = $filter("search")($rootScope.list, new_input, new_size, new_price, new_typeplant);
      if (new_arrange === "desc") {
        $rootScope.search_list = $rootScope.search_list.sort((a, b) => a.price - b.price);
        $rootScope.total_pages_search = Math.ceil($rootScope.search_list.length / $rootScope.pagesize);
        $rootScope.pages_search = [];
        for (let i = 0; i < $rootScope.total_pages_search; i++) {
          $rootScope.pages_search[i] = $rootScope.search_list.slice(i * $rootScope.pagesize, (i + 1) * $rootScope.pagesize);
        }
      }
      if (new_arrange === "ins") {
        $rootScope.search_list = $rootScope.search_list.sort((a, b) => b.price - a.price);
        $rootScope.total_pages_search = Math.ceil($rootScope.search_list.length / $rootScope.pagesize);
        $rootScope.pages_search = [];
        for (let i = 0; i < $rootScope.total_pages_search; i++) {
          $rootScope.pages_search[i] = $rootScope.search_list.slice(i * $rootScope.pagesize, (i + 1) * $rootScope.pagesize);
        }
      }
    }
  });
});

app.controller("product_detail", function ($scope, $rootScope, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $rootScope.$watch("product_detail", function (newValue, oldValue) {
    if (newValue && newValue.length > 0) {
      for (let i = 0; i < newValue.length; i++) {
        if (localStorage.getItem("product") === newValue[i].name) {
          $scope.json = newValue[i];
        }
      }
    }
  });

  $scope.addToCart = function () {
    if (!$rootScope.currentUser) {
      alert("Please log in first");
      return;
    }

    let total = document.querySelector(".number__product").innerHTML;
    let index;

    $rootScope.totalCartItem = +$rootScope.totalCartItem + +total;
    localStorage.setItem("totalCartItem", $rootScope.totalCartItem);

    let currentUserObj = JSON.parse(localStorage.getItem(localStorage.getItem("currentUser")));
    if ((index = currentUserObj.cart.findIndex((item) => item[0] == localStorage.getItem("product"))) == -1) {
      currentUserObj.cart.push([localStorage.getItem("product"), total]);
    } else {
      currentUserObj.cart[index][1] = +currentUserObj.cart[index][1] + +total;
    }

    localStorage.setItem(currentUserObj.email, JSON.stringify(currentUserObj));

    alert("Successfully Added To The Shopping Cart.");

    // localStorage.setItem("totalItem", JSON.stringify($rootScope.totalCart));
  };

  const add = document.querySelector(".add__product"),
    sub = document.querySelector(".sub__product"),
    number = document.querySelector(".number__product");

  let a = 1;
  add.addEventListener("click", () => {
    a++;
    a = a < 10 ? "0" + a : a;
    number.innerText = a;
  });

  sub.addEventListener("click", () => {
    if (a > 1) {
      a--;
      a = a < 10 ? "0" + a : a;
      number.innerText = a;
    } else {
      a = 1;
      a = a < 10 ? "0" + a : a;
      number.innerText = a;
    }
  });
});

app.controller("cartController", function ($scope, $rootScope, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $rootScope.$watch("product_detail", function (newValue, oldValue) {
    if (newValue && newValue.length > 0) {
      let currentUserObj = JSON.parse(localStorage.getItem(localStorage.getItem("currentUser")));

      $scope.tempData = currentUserObj.cart;

      $scope.cartData = [];

      for (let item of $scope.tempData) {
        let product = $rootScope.product_detail.find((itemDetail) => itemDetail.name == item[0]);

        $scope.cartData.push([product.id, product.type, product.img, product.name, +item[1], +product.price * item[1]]);
      }
      $scope.submitcart = function () {
        currentUserObj.cart = [];
        $scope.cartData = [];
        localStorage.setItem(currentUserObj.email, JSON.stringify(currentUserObj));
        $scope.totalBill = 0;

        $rootScope.totalCartItem = 0;
        localStorage.setItem("totalCartItem", $rootScope.totalCartItem);

        alert("Thanks You");
      };
      $scope.addQuantity = function (name) {
        let position = currentUserObj.cart.findIndex((item) => item[0] == name);

        $rootScope.totalCartItem = +$rootScope.totalCartItem + 1;
        localStorage.setItem("totalCartItem", $rootScope.totalCartItem);

        currentUserObj.cart[position][1] = +currentUserObj.cart[position][1] + 1;
        localStorage.setItem(currentUserObj.email, JSON.stringify(currentUserObj));

        let product = $rootScope.product_detail.find((itemDetail) => itemDetail.name == name);

        let positionSecond = $scope.cartData.findIndex((item) => item[3] == name);

        $scope.cartData[positionSecond][4] = +$scope.cartData[positionSecond][4] + 1;
        $scope.cartData[positionSecond][5] = +$scope.cartData[positionSecond][4] * +product.price;

        $scope.totalBill = 0;
        for (let item of $scope.cartData) {
          $scope.totalBill += +item[5];
        }
      };

      $scope.minusQuantity = function (name) {
        $rootScope.totalCartItem = +$rootScope.totalCartItem - 1;
        localStorage.setItem("totalCartItem", $rootScope.totalCartItem);

        let position = currentUserObj.cart.findIndex((item) => item[0] == name);
        if (currentUserObj.cart[position][1] == 1) {
          if (confirm(`You want to remove ${currentUserObj.cart[position][0]} ?`)) {
            currentUserObj.cart.splice(position, 1);
            localStorage.setItem(currentUserObj.email, JSON.stringify(currentUserObj));

            let positionSecond = $scope.cartData.findIndex((item) => item[3] == name);
            $scope.cartData.splice(positionSecond, 1);

            $scope.totalBill = 0;

            for (let item of $scope.cartData) {
              $scope.totalBill += +item[5];
            }

            return;
          } else {
            $rootScope.totalCartItem = +$rootScope.totalCartItem + 1;
            localStorage.setItem("totalCartItem", $rootScope.totalCartItem);
            return;
          }
        }

        currentUserObj.cart[position][1] = +currentUserObj.cart[position][1] - 1;
        localStorage.setItem(currentUserObj.email, JSON.stringify(currentUserObj));

        let product = $rootScope.product_detail.find((itemDetail) => itemDetail.name == name);

        let positionSecond = $scope.cartData.findIndex((item) => item[3] == name);

        $scope.cartData[positionSecond][4] = $scope.cartData[positionSecond][4] - 1;
        $scope.cartData[positionSecond][5] = $scope.cartData[positionSecond][4] * product.price;

        $scope.totalBill = 0;

        for (let item of $scope.cartData) {
          $scope.totalBill += +item[5];
        }
      };

      $scope.totalBill = 0;

      for (let item of $scope.cartData) {
        $scope.totalBill += +item[5];
      }
    }
  });
});

app.controller("blog_list", function ($scope, $rootScope, $timeout, $filter, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $scope.$on('$routeChangeSuccess', function () {
    $scope.input_blog = "";
  });

  $scope.button_page = true;
  $scope.showsearch = false;
  $scope.showpage = true;
  $scope.showsearch = false;
  $scope.page_number = true;
  // $scope.page_number_search_size = false;
  $scope.backgroundcolor = "cornflowerblue";
  $scope.pagenumber = 0;
  $scope.color = "black";
  $scope.confirm_search = false;
  $scope.nextpage = function () {
    if ($rootScope.total_pages_search_blog == 0 || $rootScope.total_pages_search_blog === undefined) {
      if ($rootScope.currentPage_blog < $rootScope.totalPages_blog - 1) {
        $rootScope.currentPage_blog++;
        $scope.pagenumber = $rootScope.currentPage_blog;
      }
    } else {
      if ($rootScope.currentPage_blog < $rootScope.total_pages_search_blog - 1) {
        $rootScope.currentPage_blog++;
        $scope.pagenumber = $rootScope.currentPage_blog;
      }
    }
  };
  $scope.previewpage = function () {
    if ($rootScope.currentPage_blog > 0) {
      $rootScope.currentPage_blog--;
      $scope.pagenumber = $rootScope.currentPage_blog;
    }
  };
  $scope.handleClick = function (event, infor) {
    if (event.which === 3) {
      localStorage.setItem("product", infor.name);
    }
  };
  $scope.getname = function (infor) {
    localStorage.setItem("product", infor.name);
  };

  $scope.click_number = function ($index) {
    $rootScope.currentPage_blog = $index;
    $scope.pagenumber = $index;
  };
  $scope.setshow_search_or_page = function () {
    $rootScope.input_blog = $scope.input_blog;
    $scope.showresult = false;

    if ($scope.input_blog === "") {
      $scope.showsearch = false;
      $scope.showpage = true;

      $scope.page_number = true;
      $scope.page_number_search = false;

      $scope.showresult = false;
    } else {
      $scope.showsearch = true;
      $scope.showpage = false;

      $scope.page_number = false;
      $scope.page_number_search = true;

      $scope.pagenumber = $rootScope.currentPage_blog = 0;
      $scope.showresult = true;
    }
  };

  $scope.getValue = function () {
    $scope.showsearch = true;
    $scope.showpage = false;

    $scope.page_number = false;
    $scope.page_number_search = true;

    $scope.pagenumber = $rootScope.currentPage_blog = 0;
    $scope.showresult = true;
  };
  $scope.getname = function (infor) {
    localStorage.setItem("blog", infor.name);
  };
  $scope.$watch("input_blog", function (new_input, old_input) {
    if (new_input != old_input) {
      $rootScope.search_list_blog = $filter("searchBlog")($rootScope.list_blog, new_input);
      $rootScope.total_pages_search_blog = Math.ceil($rootScope.search_list_blog.length / $rootScope.pagesize_blog);
      $rootScope.pages_search_blog = [];
      for (let i = 0; i < $rootScope.total_pages_search_blog; i++) {
        $rootScope.pages_search_blog[i] = $rootScope.search_list_blog.slice(i * $rootScope.pagesize_blog, (i + 1) * $rootScope.pagesize_blog);
      }
    }
  });
});

app.controller("blog-infor", function ($scope, $rootScope, $sce, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $rootScope.$watch("ds", function (newValue, oldValue) {
    if (newValue && newValue.length > 0) {
      for (let i = 0; i < newValue.length; i++) {
        if (localStorage.getItem("blog") === newValue[i].name) {
          $scope.json = newValue[i];
          $scope.p1 = $sce.trustAsHtml($scope.json.p1);
          $scope.p2 = $sce.trustAsHtml($scope.json.p2);
          $scope.p3 = $sce.trustAsHtml($scope.json.p3);
          $scope.p4 = $sce.trustAsHtml($scope.json.p4);
          $scope.p5 = $sce.trustAsHtml($scope.json.p5);
          $scope.p6 = $sce.trustAsHtml($scope.json.p6);
        }
      }
    }
  });
});

app.controller("formPayController", function ($scope, $rootScope, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  function sNotification() {
    let checkedPayment = document.getElementById("payment");

    if (checkedPayment.checked) {
      alert("Successful transaction!");
      return true;
    } else {
      alert("Error: Select a payment method ?");
      event.preventDefault();
      return false;
    }
  }
});

app.controller("feedbackController", function ($scope, $rootScope, $window) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $scope.receiveFeedback = function () {
    alert("Thank you for your feedback");
    $window;
  };
});

app.controller("loginController", function ($scope, $rootScope, $window, $location) {
  $window.scrollTo(0, 0);
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $scope.checkaccount = function () {
    let email = document.querySelector(".auth-form__signin__email").value;
    let password = document.querySelector(".auth-form__signin__password").value;

    // Kiểm tra xem email có tồn tại trong localStorage hay không
    if (localStorage.getItem(email)) {
      let storedAccount = JSON.parse(localStorage.getItem(email));

      // So sánh mật khẩu nhập vào với mật khẩu trong localStorage
      if (password === storedAccount.pass) {
        alert("Logged in successfully !");
        $location.path("/");
        localStorage.setItem("currentUser", storedAccount.email);
        $rootScope.currentUser = storedAccount.email;

        for (let item of storedAccount.cart) {
          $rootScope.totalCartItem += +item[1];
        }

        localStorage.setItem("totalCartItem", $rootScope.totalCartItem);

        return true;
      } else {
        alert("Incorrect password");
        return false;
      }
    } else {
      alert("Email account does not exist");
      return false;
    }
  };
});

app.controller("registerController", function ($scope, $rootScope, $location) {
  function checkEmailFormat(emailInput) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailInput.value);
  }

  function checkPasswordLength(passwordInput) {
    return passwordInput.value.length >= 8;
  }

  function checkPasswordMatch(passwordInput, confirmPasswordInput) {
    return passwordInput.value === confirmPasswordInput.value;
  }

  function validateInput(inputElement, isValid) {
    if (isValid) {
      inputElement.classList.remove("invalid");
    } else {
      inputElement.classList.add("invalid");
    }
  }

  $scope.checkformsignup = function () {
    const lastnameInput = document.querySelector(".auth__form__lastname");
    const emailInput = document.querySelector(".auth__form__email");
    const passwordInput = document.querySelector(".auth__form__password");
    const confirmPasswordInput = document.querySelector(".auth__form__passwordconfirm");

    const isEmailValid = checkEmailFormat(emailInput);
    const isPasswordValid = checkPasswordLength(passwordInput);
    const doPasswordsMatch = checkPasswordMatch(passwordInput, confirmPasswordInput);

    validateInput(emailInput, isEmailValid);
    validateInput(passwordInput, isPasswordValid);
    validateInput(confirmPasswordInput, doPasswordsMatch);

    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      // Create a new object to store user data

      if (localStorage.getItem(emailInput.value)) {
        alert("Account already exist");
        return;
      }

      var userData = {
        username: lastnameInput.value,
        email: emailInput.value,
        pass: passwordInput.value,
        cart: [],
      };

      // Convert the object to JSON and store it in localStorage
      localStorage.setItem(emailInput.value, JSON.stringify(userData));

      // Show success message and return true
      alert("Registration successful!");
      $location.path("/login");
      return true;
    } else {
      if (!isEmailValid) {
        alert("Email wrong syntax");
      }
      if (!isPasswordValid) {
        alert("Password must have at least 8 symbol");
      }
      if (!doPasswordsMatch) {
        alert("Password confirm wrong");
      }
      // Show error message and return false
      alert("Please fill in the required fields correctly.");

      return false;
    }
  };

  // Add event listeners to input fields
  // document.querySelector(".auth__form__email").addEventListener("input", function () {
  //   const isEmailValid = checkEmailFormat(this);
  //   validateInput(this, isEmailValid);
  // });

  // document.querySelector(".auth__form__password").addEventListener("input", function () {
  //   const isPasswordValid = checkPasswordLength(this);
  //   validateInput(this, isPasswordValid);
  // });

  // document.querySelector(".auth__form__passwordconfirm").addEventListener("input", function () {
  //   const doPasswordsMatch = checkPasswordMatch(document.querySelector(".auth__form__password"), this);
  //   validateInput(this, doPasswordsMatch);
  // });
});

app.controller("contactUs", function ($scope, $window) {
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $window.scrollTo(0, 0);

  function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2, // Độ phóng to của bản đồ
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      // panel: document.getElementById("directionsPanel"), // Hiển thị hướng dẫn trong một div có id là 'directionsPanel'
    });
    var min = { value: 100000, index: null };
    var destination = [
      { lat: 10.78663, lng: 106.66634 },
      { lat: 10.79088, lng: 106.68231 },
      { lat: 10.84588, lng: 106.71071 },

    ];

    function getDirections(request, i) {
      return new Promise(function (resolve, reject) {
        directionsService.route(request, function (response, status) {
          if (status === "OK") {
            var route = response.routes[0].legs[0];
            var distance = route.distance.text;
            if (parseFloat(distance) < min.value) {
              min.value = parseFloat(distance);
              min.index = i;
            }

            resolve();
          } else {
            reject(status);
          }
        });
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        var origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Vị trí đích

        for (let i = 0; i < destination.length; i++) {
          var request = {
            origin: origin,
            destination: destination[i],
            travelMode: google.maps.TravelMode.DRIVING, // Chế độ đi bằng xe ô tô (bao gồm xe máy)
            drivingOptions: {
              departureTime: new Date(), // Thời gian khởi hành (thời điểm hiện tại)
              trafficModel: google.maps.TrafficModel.BEST_GUESS, // Mô hình giao thông dự đoán tốt nhất
            },
          };

          try {
            await getDirections(request, i);
          } catch (error) {
            console.log("Error:", error);
          }
          if (i === destination.length - 1) {
            var distanceElement = document.getElementById("distance");
            var address_Strore = document.getElementById("address_store");
            if (min.index == 0) {
              distanceElement.innerHTML = "Closest Distance: " + min.value + "KM";
              address_Strore.innerHTML = "590 Cách Mạng Tháng Tám, P.11, Quận 3, TP. HCM";
            }
            if (min.index == 1) {
              distanceElement.innerHTML = "Closest Distance: " + min.value + "KM";
              address_Strore.innerHTML = "391A Nam Kỳ Khởi Nghĩa, Võ Thị Sáu, Quận 3, HCM";
            }
            if (min.index == 2) {
              distanceElement.innerHTML = "Closest Distance: " + min.value + "KM";
              address_Strore.innerHTML = "62 Đường 36, Hiệp Bình Phước, Vạn Phúc, Thủ Đức";
            }



          }
        }
        var request = {
          origin: origin,
          destination: destination[min.index],
          travelMode: google.maps.TravelMode.DRIVING, // Chế độ đi bằng xe ô tô (bao gồm xe máy)
          drivingOptions: {
            departureTime: new Date(), // Thời gian khởi hành (thời điểm hiện tại)
            trafficModel: google.maps.TrafficModel.BEST_GUESS, // Mô hình giao thông dự đoán tốt nhất
          },
        };
        directionsService.route(request, function (response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          }
        });
      });
    }
  }

  initMap();
});

app.controller("sitemapController", function ($scope, $window) {
  $scope.totop = function () {
    $window.scrollTo(0, 0);
  };
  $window.scrollTo(0, 0);
});

//*********************************************** */

//************************************************ */
