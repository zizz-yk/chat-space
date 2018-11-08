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
      var html = buildHTML(data);
      $('.chat-body').append(html);
      $('.input-box__text').val('');
      $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight},"first");
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

  $.ajax({
    type: 'GET',
    url: location.href,
    dataType: 'json'
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message) {
      insertHTML += buildHTML(message);
    });
    $('.chat-body').prepend(insertHTML);
  })
  .fail(function(messages) {
    alert('自動更新に失敗しました');
  });
  } else {
    clearInterval(interval);
   }} , 5000 );

});
