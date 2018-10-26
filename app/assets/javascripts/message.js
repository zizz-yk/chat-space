$(function(){
  function buildHTML(message){

    var chatMessage = (message.content)? `${message.content}` : "";
    var chatImage = (message.image)? `<img src="${message.image}">` : "";

    var html = `<div class="message">
                  <div class="message-top">
                    <p class="message-top__name">${message.user_name}</p>
                    <p class="message-top__date">${message.date}</p>
                  </div>
                  <div class ="message-bottom">
                    ${chatMessage}
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
      var html = buildHTML(data);
      $('.chat-body').append(html);
      $('.input-box__text').val('');
      $('.input-box__file').val('');
      $('.form__send-btn').prop('disabled', false);
      $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight},"first");
    })
    .fail(function() {
      alert("通信に失敗しました");
      $('.form__send-btn').prop('disabled', false);
    });
  });
});
