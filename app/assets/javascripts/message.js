$(function(){
  function buildHTML(message){

    var chatMessage = (message.content)? `${message.content}` : "";
    var chatImage = (message.image)? `<img src="${message.image}">` : "";

    var html = `<div class="message" message_id="${message.id}">
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



  setInterval(function(){
    var message_id = $('.message').last().data('message-id');
    var insertHTML = '';
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

      $.ajax({
        type: 'GET',
        url: location.href,
        data: { message_id: message_id },
        dataType: 'json'
      })

      .done(function(messages) {
        if (messages[0] !== undefined){
          messages.forEach(function(message) {
            if (message.id > message_id) {
              insertHTML += buildHTML(message);
            }
          });
        $('.chat-body').prepend(insertHTML);
        }
      })

      .fail(function(messages) {
        alert('自動更新に失敗しました');
      });
    }
  } ,5000 );

});
