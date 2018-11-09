json.content       @message.content
json.image      @message.image.url
json.user_name  @message.user.name
json.date @message.created_at.to_s(:default)
json.id @message.id
