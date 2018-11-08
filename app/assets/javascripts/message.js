$(function(){
  function buildHTML(message){

    var chatMessage = (message.content)? `${message.content}` : "";
    var chatImage = (message.image)? `<img src="${message.image}">` : "";

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message-top">
                    <p class="message-top__name">${message.user_name}</p>
                    <p class="message-top__date">${message.date}</p>
                  </div>
                  <div class ="message-bottom">
                    ${chatMessage}<br/>
                    ${chatImage}
                  </div>
                </div>`;

  return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.length !== 0){
        var html = buildHTML(data);
        $('.chat-body').append(html);
        $('#new_message')[0].reset();
        $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight},"first");
      }
    })
    .fail(function(){
      alert("通信に失敗しました");
    })
    .always(function(){
      $('.form__send-btn').prop('disabled', false);
    });

  });


  $(function(){
    var interval = setInterval(update, 5000);

    function update() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
        $(".chat-body").animate({scrollTop: $(".chat-body")[0].scrollHeight}, 1000, "swing");

        $.ajax({
          url: location.href,
          type: "get",
          dataType: "json"
        })

        .done(function(data) {
          var id = $(".message:last").data("message-id");

          data.forEach(function(message){
            if (message.id > id){
              var html = buildHTML(message);
              $(".chat-body").append(html);
              $(".chat-body").animate({scrollTop: $(".chat-body")[0].scrollHeight}, 1000, "swing");
            }
          });
        })
        .fail(function() {
          alert("更新に失敗しました。");
        });
      } else {
        clearInterval(interval);
      }
    }
  });

});
