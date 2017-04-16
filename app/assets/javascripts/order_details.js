$(function()
{
  $('#pushOrder').click(function (e) {
      var user_id=$('#user_id').val()
      var user_name=$('#user_name').val()
      var order_id=$('#order_id').val()
      var item=$('#item').val()
      var price=$('#price').val()
      var amount=$('#amount').val()
      var comment=$('#comment').val()
          $.ajax({
            url: "/users/1/orders/1/order_details",
            method: "post",
            data: {u_id: user_id,
                    o_id: order_id,
                    item: item,
                    price: price,
                    amount: amount,
                    comment: comment
                  },
            success: function(result){
                console.log(result);
                 $("table tbody").append(`  <tr val=`+result.order.id+`>
                   <td>`+user_name+`</td>
                   <td>`+item+`</td>
                   <td>`+amount+`</td>
                   <td>`+price+`</td>
                   <td>`+comment+`</td>

                   </tr>`);
        },
        error: function(error) {
          alert(error);
        }
      });//end ajax method
  })

  function getOrders() {
      if ($('#order_id').val()!=undefined) {
      var idTerval=  window.setInterval(function(){
          $.ajax({
            url: "/get_all_orders",
            method: "post",
            data: {
                    order_id: $('#order_id').val()
                  },
            success: function(result){
                currentIDs=[]
                $("table tbody tr").each(function(indx,item){currentIDs.push(parseInt($(item).attr('val')))})
                newIDs=result.ids.filter(function(item){ return !currentIDs.includes(item)})
                newOrdes=result.all_orders.filter(function(ord){return newIDs.includes(ord.id)})

                newOrdes.forEach(function (order,index,arr) {
                  $("table tbody").append(`  <tr val=`+order.id+`>

                      <td>`+result.names[result.ids.indexOf(order.id)]+`</td>
                      <td>`+order.item+`</td>
                      <td>`+order.amount+`</td>
                      <td>`+order.price+`</td>
                      <td>`+order.comment+`</td>

                    </tr>`);
                })
            },
            error: function(error) {
              console.log(error);
           }
        });//end ajax method

        },3000)
      }
  }
  getOrders();
})
