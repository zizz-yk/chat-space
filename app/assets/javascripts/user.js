$(function() {

  var user_list = $("#user-search-result");
  var add_member = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    user_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    user_list.append(html);
  }

  function addUser(name,id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    add_member.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      user_list.empty();
      if (users.length !== 0 ) {
        users.forEach(function(user){
          appendUser(user);
        })
      } else {
        appendNoUser("一致する名前がありません");
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })

  });

  $(document).on('click', '.user-search-add', function() {
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    $(this).parent().remove();
    addUser(name, id);
  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });

});
