const url = "https://eucs23v2.ksearchnet.com/cs/v2/search";
var myData = {
  context: { apiKeys: ["klevu-160320037354512854"] },
  recordQueries: [
    {
      id: "configLayoutProducts564",
      typeOfRequest: "SEARCH",
      settings: {
        query: { term: "bags" },
        typeOfRecords: ["KLEVU_PRODUCT"],
        limit: 12,
        typeOfSearch: "WILDCARD_AND",
      },
    },
  ],
};

var ac = $.post(
  "https://eucs23v2.ksearchnet.com/cs/v2/search", // url
  JSON.stringify(myData), // data to be submit
  function (data, status, jqXHR) {
    // success callback
    var bagsData = data.queryResults[0].records;
    console.log(bagsData);
    $("#totalResultFound").text("Total results found: --" + bagsData.length);
    var aBD = $("#allBagsData");
    console.log(aBD);

    for (var i = 0; i < bagsData.length; i++) {
      var li_tag = $("<li>");
      li_tag.attr("class", "kuvmProduct");
      aBD.append(li_tag);

      var div1_tag = $("<div>");
      div1_tag.attr("class", "kuvmProdWrap");
      li_tag.append(div1_tag);

      var div2_tag = $("<div>");
      div2_tag.attr("class", "kuvmProdTop");
      div1_tag.append(div2_tag);

      var div3_tag = $("<div>");
      div3_tag.attr("class", "kuvmImgWrap");
      div2_tag.append(div3_tag);

      var anchor_tag = $("<a>");
      anchor_tag.attr("href", "javascript:void(0)");
      anchor_tag.attr("class", "kuvmProductLink");
      div3_tag.append(anchor_tag);

      var span_tag = $("<span>");
      span_tag.attr("class", "kuvmImgSpan");
      anchor_tag.append(span_tag);

      var img_tag = $("<img>");
      img_tag.attr("src", bagsData[i].imageUrl);
      img_tag.attr("class", "kuProdImg");
      img_tag.attr("alt", bagsData[i].name);
      span_tag.append(img_tag);

      var div_2_tag = $("<div>");
      div_2_tag.attr("class", "kuvmProdBottom");
      div1_tag.append(div_2_tag);

      var div_3_tag = $("<div>");
      div_3_tag.attr("class", "kuvmNameDesc");
      div_2_tag.append(div_3_tag);

      var div_4_tag = $("<div>");
      div_4_tag.attr("name", bagsData[i].name);
      div_3_tag.append(div_4_tag);

      var anchor_1_tag = $("<a>");
      anchor_1_tag.attr("href", "javascript:void(0)");
      anchor_1_tag.attr("class", "kuvmProductLink");
      anchor_1_tag.text(bagsData[i].name);
      div_4_tag.append(anchor_1_tag);

      var div_4_2_tag = $("<div>");
      div_4_2_tag.attr({ class: "kuvmsku", name: bagsData[i].sku });
      div_3_tag.append(div_4_2_tag);

      var div_4_2_1_tag = $("<small>");
      div_4_2_1_tag.attr("class", "text-muted");
      div_4_2_1_tag.text(bagsData[i].sku);
      div_4_2_tag.append(div_4_2_1_tag);

      var div_5_tag = $("<div>");
      div_5_tag.attr("class", "kuPrice");
      div_2_tag.append(div_5_tag);

      var div_5_1_tag = $("<div>");
      div_5_1_tag.attr("class", "kuSalePrice kuStartPrice");
      div_5_1_tag.text(bagsData[i].salePrice + " USD");
      div_5_tag.append(div_5_1_tag);

      var btn_tag = $("<button>");
      btn_tag.attr({ id: bagsData[i].sku, class: "btn" });
      btn_tag.text("Show Information");
      div_5_tag.append(btn_tag);

      var div_5_2_tag = $("<div>");
      div_5_tag.attr("class", "kuClearBoth");
      div_5_tag.append(div_5_2_tag);

      var div_6_tag = $("<div>");
      div_6_tag.attr("kuvmClearLeft");
      div1_tag.append(div_6_tag);
    }

    var btnElement = $(".btn");
    for (var i = 0; i < btnElement.length; i++) {
      btnElement.on("click", (e) => {
        var button_id = e.target.id;
        console.log(button_id);
        const index = bagsData.findIndex((item) => item.sku === button_id);
        $("#modal_container").css("display", "block");
        $("#allBagsData").css("display", "none");
        var content = $("#content");
        var addImg = $("#addImg").attr("src", bagsData[index].imageUrl);
        $("#head").text(bagsData[index].name);
        content.text(
          "color: " +
            bagsData[index].color +
            ", type: " +
            bagsData[index].type +
            "\n" +
            ", price: " +
            bagsData[index].price +
            ", USD" +
            "\n" +
            ", inStock: " +
            bagsData[index].inStock +
            "\n" +
            ", brand: " +
            bagsData[index].brand +
            "\n" +
            ", size: " +
            bagsData[index].size +
            "\n" +
            ", Short Description: " +
            bagsData[index].shortDesc +
            ""
        );
        var btn_close = $("#close");
        btn_close.on("click", () => {
          $("#allBagsData").css("display", "block");
          $("#modal_container").css("display", "none");
        });
      });
    }
    $("#modal_container").css("display", "none");
    // change in order
    var Price = $("#Price");
    Price.on("change", () => {
      var x = $("#Price")[0].selectedIndex;
      var y = $("#Price")[0].options;
      if (y[x].index == 0) {
        $("#allBagsData").empty();
        var newArr = bagsData.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );

        for (var l = 0; l < newArr.length; l++) {
          var li_tag = $("<li>");
          li_tag.attr("class", "kuvmProduct");
          aBD.append(li_tag);

          var div1_tag = $("<div>");
          div1_tag.attr("class", "kuvmProdWrap");
          li_tag.append(div1_tag);

          var div2_tag = $("<div>");
          div2_tag.attr("class", "kuvmProdTop");
          div1_tag.append(div2_tag);

          var div3_tag = $("<div>");
          div3_tag.attr("class", "kuvmImgWrap");
          div2_tag.append(div3_tag);

          var anchor_tag = $("<a>");
          anchor_tag.attr("href", "javascript:void(0)");
          anchor_tag.attr("class", "kuvmProductLink");
          div3_tag.append(anchor_tag);

          var span_tag = $("<span>");
          span_tag.attr("class", "kuvmImgSpan");
          anchor_tag.append(span_tag);

          var img_tag = $("<img>");
          img_tag.attr("src", newArr[l].imageUrl);
          img_tag.attr("class", "kuProdImg");
          img_tag.attr("alt", newArr[l].name);
          span_tag.append(img_tag);

          var div_2_tag = $("<div>");
          div_2_tag.attr("class", "kuvmProdBottom");
          div1_tag.append(div_2_tag);

          var div_3_tag = $("<div>");
          div_3_tag.attr("class", "kuvmNameDesc");
          div_2_tag.append(div_3_tag);

          var div_4_tag = $("<div>");
          div_4_tag.attr("name", newArr[l].name);
          div_3_tag.append(div_4_tag);

          var anchor_1_tag = $("<a>");
          anchor_1_tag.attr("href", "javascript:void(0)");
          anchor_1_tag.attr("class", "kuvmProductLink");
          anchor_1_tag.text(newArr[l].name);
          div_4_tag.append(anchor_1_tag);

          var div_4_2_tag = $("<div>");
          div_4_2_tag.attr({ class: "kuvmsku", name: newArr[l].sku });
          div_3_tag.append(div_4_2_tag);

          var div_4_2_1_tag = $("<small>");
          div_4_2_1_tag.attr("class", "text-muted");
          div_4_2_1_tag.text(newArr[l].sku);
          div_4_2_tag.append(div_4_2_1_tag);

          var div_5_tag = $("<div>");
          div_5_tag.attr("class", "kuPrice");
          div_2_tag.append(div_5_tag);

          var div_5_1_tag = $("<div>");
          div_5_1_tag.attr("class", "kuSalePrice kuStartPrice");
          div_5_1_tag.text(newArr[l].salePrice + " USD");
          div_5_tag.append(div_5_1_tag);

          var btn_tag = $("<button>");
          btn_tag.attr({ id: newArr[l].sku, class: "btn" });
          btn_tag.text("Show Information");
          div_5_tag.append(btn_tag);

          var div_5_2_tag = $("<div>");
          div_5_tag.attr("class", "kuClearBoth");
          div_5_tag.append(div_5_2_tag);

          var div_6_tag = $("<div>");
          div_6_tag.attr("kuvmClearLeft");
          div1_tag.append(div_6_tag);
        }

        var btnElement = $(".btn");
        for (var i = 0; i < btnElement.length; i++) {
          btnElement.on("click", (e) => {
            var button_id = e.target.id;
            console.log(button_id);
            const index = bagsData.findIndex((item) => item.sku === button_id);
            $("#modal_container").css("display", "block");
            $("#allBagsData").css("display", "none");
            var content = $("#content");
            var addImg = $("#addImg").attr("src", bagsData[index].imageUrl);
            $("#head").text(bagsData[index].name);
            content.text(
              "color: " +
                bagsData[index].color +
                ", type: " +
                bagsData[index].type +
                "\n" +
                ", price: " +
                bagsData[index].price +
                ", USD" +
                "\n" +
                ", inStock: " +
                bagsData[index].inStock +
                "\n" +
                ", brand: " +
                bagsData[index].brand +
                "\n" +
                ", size: " +
                bagsData[index].size +
                "\n" +
                ", Short Description: " +
                bagsData[index].shortDesc +
                ""
            );
            var btn_close = $("#close");
            btn_close.on("click", () => {
              $("#allBagsData").css("display", "block");
              $("#modal_container").css("display", "none");
            });
          });
        }
      } else if (y[x].index == 1) {
        $("#allBagsData").empty();
        var RevnewArr = bagsData.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        var newArr = RevnewArr.reverse();
        for (var l = 0; l < newArr.length; l++) {
          var li_tag = $("<li>");
          li_tag.attr("class", "kuvmProduct");
          aBD.append(li_tag);

          var div1_tag = $("<div>");
          div1_tag.attr("class", "kuvmProdWrap");
          li_tag.append(div1_tag);

          var div2_tag = $("<div>");
          div2_tag.attr("class", "kuvmProdTop");
          div1_tag.append(div2_tag);

          var div3_tag = $("<div>");
          div3_tag.attr("class", "kuvmImgWrap");
          div2_tag.append(div3_tag);

          var anchor_tag = $("<a>");
          anchor_tag.attr("href", "javascript:void(0)");
          anchor_tag.attr("class", "kuvmProductLink");
          div3_tag.append(anchor_tag);

          var span_tag = $("<span>");
          span_tag.attr("class", "kuvmImgSpan");
          anchor_tag.append(span_tag);

          var img_tag = $("<img>");
          img_tag.attr("src", newArr[l].imageUrl);
          img_tag.attr("class", "kuProdImg");
          img_tag.attr("alt", newArr[l].name);
          span_tag.append(img_tag);

          var div_2_tag = $("<div>");
          div_2_tag.attr("class", "kuvmProdBottom");
          div1_tag.append(div_2_tag);

          var div_3_tag = $("<div>");
          div_3_tag.attr("class", "kuvmNameDesc");
          div_2_tag.append(div_3_tag);

          var div_4_tag = $("<div>");
          div_4_tag.attr("name", newArr[l].name);
          div_3_tag.append(div_4_tag);

          var anchor_1_tag = $("<a>");
          anchor_1_tag.attr("href", "javascript:void(0)");
          anchor_1_tag.attr("class", "kuvmProductLink");
          anchor_1_tag.text(newArr[l].name);
          div_4_tag.append(anchor_1_tag);

          var div_4_2_tag = $("<div>");
          div_4_2_tag.attr({ class: "kuvmsku", name: newArr[l].sku });
          div_3_tag.append(div_4_2_tag);

          var div_4_2_1_tag = $("<small>");
          div_4_2_1_tag.attr("class", "text-muted");
          div_4_2_1_tag.text(newArr[l].sku);
          div_4_2_tag.append(div_4_2_1_tag);

          var div_5_tag = $("<div>");
          div_5_tag.attr("class", "kuPrice");
          div_2_tag.append(div_5_tag);

          var div_5_1_tag = $("<div>");
          div_5_1_tag.attr("class", "kuSalePrice kuStartPrice");
          div_5_1_tag.text(newArr[l].salePrice + " USD");
          div_5_tag.append(div_5_1_tag);

          var btn_tag = $("<button>");
          btn_tag.attr({ id: newArr[l].sku, class: "btn" });
          btn_tag.text("Show Information");
          div_5_tag.append(btn_tag);

          var div_5_2_tag = $("<div>");
          div_5_tag.attr("class", "kuClearBoth");
          div_5_tag.append(div_5_2_tag);

          var div_6_tag = $("<div>");
          div_6_tag.attr("kuvmClearLeft");
          div1_tag.append(div_6_tag);
        }

        var btnElement = $(".btn");
        for (var i = 0; i < btnElement.length; i++) {
          btnElement.on("click", (e) => {
            var button_id = e.target.id;
            console.log(button_id);
            const index = bagsData.findIndex((item) => item.sku === button_id);
            $("#modal_container").css("display", "block");
            $("#allBagsData").css("display", "none");
            var content = $("#content");
            var addImg = $("#addImg").attr("src", bagsData[index].imageUrl);
            $("#head").text(bagsData[index].name);
            content.text(
              "color: " +
                bagsData[index].color +
                ", type: " +
                bagsData[index].type +
                "\n" +
                ", price: " +
                bagsData[index].price +
                ", USD" +
                "\n" +
                ", inStock: " +
                bagsData[index].inStock +
                "\n" +
                ", brand: " +
                bagsData[index].brand +
                "\n" +
                ", size: " +
                bagsData[index].size +
                "\n" +
                ", Short Description: " +
                bagsData[index].shortDesc +
                ""
            );
            var btn_close = $("#close");
            btn_close.on("click", () => {
              $("#allBagsData").css("display", "block");
              $("#modal_container").css("display", "none");
            });
          });
        }
      }
    });
  }
);
