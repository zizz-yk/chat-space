$(document).on('turbolinks:load', function() {
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




  var interval = setInterval(function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message:last').attr('message_id');
  $.ajax({
    type: 'GET',
    url: location.href,
    data: { id: last_message_id },
    dataType: 'json'
  })
  .done(function(messages) {
    console.log(messages)
    var insertHTML = '';
    if (messages.length !== 0){
      messages.forEach(function(message) {
        console.log('hey')
        insertHTML = buildHTML(message);
        $('.chat-body').append(insertHTML);
      });
       $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight},"first");
    }
  })
  .fail(function(messages) {
    alert('自動更新に失敗しました');
  });
  } else {
    clearInterval(interval);
    console.log('clearinterval');
   }
 } , 5000 );

});
