$(function(){
  var staticData = {};
  var toppings = [];
  $.getJSON("../data/data.json", function(data){
    staticData = data;
    toppings = data.data.topping.reduce(function(res,group){ return res.concat(group.items);}, []);
  });

  $.getJSON("/api/orders", function (data) {
        data.forEach(function (item) {
            var htmlArr = [];
            htmlArr.push("<tr>");
            Object.keys(item).filter(function(k){
              //return k !== '_id' && k !== '_v';
              return !k.startsWith('_', 0);
            }).
            forEach(function(k){
              var content = k==="topping" ? 
                item[k].split(',').reduce(function(res, top){
                  return [res ,toppings.filter(function(obj){return obj.value === top;})[0].name].join(";");
                }, '') :
                item[k];

              //htmlArr.push("<td>"+ item[k]+"</td>");
              htmlArr.push("<td>"+ content +"</td>");
            });
            htmlArr.push("</tr>");
            //$('#orders').append('<tr><td>' + item.crust + '</td><td>' + item.size + '</td></tr>');
            $('#orders').append(htmlArr.join(""));
        });
   });

  $(".search").keyup(function () {
    var searchTerm = $(".search").val();
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
      
    $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
          return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });
      
    $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
      $(this).attr('visible','false');
    });

    $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
      $(this).attr('visible','true');
    });

    var jobCount = $('.results tbody tr[visible="true"]').length;
      $('.counter').text(jobCount + ' item');

    if(jobCount == '0') {$('.no-result').show();}
    else {$('.no-result').hide();}
	});
})