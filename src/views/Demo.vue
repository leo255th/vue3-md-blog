<template>
  <div class="demo">
    <h1>SSO单点登录</h1>
    <span>2022年1月12日 16:50:30</span>
    <p>
      基于OAuth2.0的思想实现。 将登录界面独立出来，归属于SSO服务器的认证前端。
      系统A如果要登录，需要跳转到SSO登录页面，登录成功后设置SSO前端页面的cookie，同时，返回一个token，SSO前端收到这个token,将再跳转回系统A页面时，作为url参数传递给系统A，系统A收到这个token，去SSO后端验证，验证通过后，设置系统A的cookie。
    </p>
    <p>
      此时，用户在SSO已登录。
      进入系统B，检测到系统B未登录，跳转到SSO登录页面，发现已经登录，向后端请求新的token，系统B收到token后，向SSO后端验证，验证通过后，设置系统B的cookie，至此，系统B也已经登录。
    </p>
    <p>
      **SSO前端到业务系统前端时，将token作为url参数传递给业务系统前端，这个过程url泄露会有很大的安全问题，因此，有两种方案可以解决这个问题：
      （1）将这个用于认证的ticketToken设置很短的过期时间，比如30秒，因为这个token从生成到使用，经过的时间会很短，没必要设置很长的有效时间，此时，即使带有url的token泄露，问题应该也不大。
      （2）用于认证的ticketToken使用jwt方式实现，payload里带有请求者的ip，在业务系统使用这个token向SSO系统验证时，可以检测请求者的ip，由于tiketToken的生命周期会很短（比如上面说的30秒），即使用户可能有动态ip，应该也不会有问题。
      上述两个方案可以一起使用。
    </p>
    <p>
      考虑到上述ticketToken的安全问题，业务系统向SSO认证时，使用SSO前端传递过来的ticketToken，这种token时效性很高，可能30秒就没用了。因此，ticketToken验证后，可以有两种方案保持前端和后端的长时间有效的会话状态：
      （1）cookies和session，前端存储cookies，后端存储session，这是最基本的方式。
      （2）业务系统向SSO服务器请求新的长效性accessToken，后端每次收到请求，都要验证accessToken的有效性，这种方法独立使用的话，用于维持业务系统和后端的会话状态是没问题的，但是不能实现用户在SSO认证页面登出后，所有业务系统都登出。
      综上所述，为了实现SSO系统的登出功能，对于上述方案（1）来说，清除session便可以实现登出，对于上述方案（2）来说，需要实现类似session的功能。
    </p>
    <p>可以考虑用Redis来实现session的功能。

三个哈希表。
user_access_token_hash{  "access_token":session_token，
   …….
}

user_session_token_hash{
  "user_id"：JSON.stringfy({
      session_token_1:[access_token,……]，
      session_token_2:[access_token,……]，  })
}
user_ticket_token_hash{
  ticket_token_1:session_token,
  ticket_token_2:session_token,
}


Payload情况:

accessToken{
  exp
  data:{
    userId
  }
}

refreshToken{
  exp,
  data:accessToken
}


ticketToken{
  exp,
  data:{
    userId,
    url
  }
}

sessionToken{
  exp,
  data:{
    userId
  }
}

refreshToken{
  exp,
  data:sessionToken
}
</p>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Demo extends Vue {}
</script>
<style lang="less" scoped>
.demo {
  display: flex;
  flex-direction: column;
  // text-align: center;
  justify-content: flex-start;
  align-items: center;
  span {
    margin-top: 10px;
  }
  p {
    margin-top: 10px;
    max-width: 100ch;
    text-indent: 2em;
  }
}
</style>
