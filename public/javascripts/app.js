$(function(){
    var failedAlert = $("#failed-alert");
    var successAlert = $("#success-alert");
    var limit = 6;
    alertClean();

    $('[data-toggle=confirmation]').confirmation({
      rootSelector: '[data-toggle=confirmation]',
        // other options
        onConfirm: function() {
          var order = $('[data-toggle=confirmation]').data('order')
          var confirmBtns = $('.before-order');
          var goBackBtns = $('.after-order');
          $.ajax({
            type: 'POST',
            url: '/api/orders',
            data: JSON.stringify(order),
            dataType: 'json',
            contentType: 'application/json; chartset=utf-8',
            success: function(data, status){
              if(data){
                successAlert.find('ul').append(" make order success! ");
                successAlert.fadeIn();
                confirmBtns.css('display', 'none');
                goBackBtns.css('display', 'block');
              } else {
                failedAlert.find('ul').append(" make order failed, try again! ");
                failedAlert.fadeIn();
              }
            },
            error: function (request, status) {
            
            	console.log('Request failed : ', status);
        	  }
          });
        },
    });

    $('.top-class input.form-check-input').on('change', function(evt) {
       if($('.top-class input.form-check-input:checked').length >= limit) {
              //this.checked = false;
              $('.top-group input.form-check-input:not(:checked)').prop('disabled', true);
       } else {
              $('.top-group input.form-check-input:not(:checked)').prop('disabled', false);
       }
    });

    $('#pizza-form').submit(function(){
         //var chkbxValues = $(".tehAwesomeCheckboxen").val();
         var checkValues = $('.top-class input.form-check-input:checked').map(function(){
             return $(this).val();
         }).get();
         $("#topping").val( checkValues.join(",") );
         return validate();
    });

    function validate(){
      var topping = $("#topping").val();
      var tele = $("#tel").val();
      var address = $("#address").val();
      var phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      var message = [];
      if(!$.trim(topping)){
        message.push('<li>please select toppings;</li>');
      }
      if(!$.trim(tele) || !phone_pattern.test(tele)){
        message.push('<li>please input valid telephone number;</li>');
      }
      if(!$.trim(address)){
        message.push('<li>please input address;</li>');
      }
      if(message.length > 0){
        failedAlert.find('ul').append(message.join(" "));
        failedAlert.fadeIn();
        failedAlert.addClass("in");
        return false;
      }
      return true;
    }

    function alertClean(){
      failedAlert.find('ul').html('');
      successAlert.find('ul').html('');
      failedAlert.hide();
      successAlert.hide();
    }


    
})