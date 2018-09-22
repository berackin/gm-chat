<template>
  <div>
    <div class="chat card">
      <div class="card-body">
        <h5 class="card-title">GM Chat</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Hi <span class="badge badge-success">{{ email }}</span>, now you are online!
          <router-link to="/">Logout</router-link>
        </h6>
        <hr>
        <div class="chat-box">
          <ul class="list-unstyled">
            <li v-for="(message, index) in messages" :key="index">
              <p class="chat-content lead">
                <span class="lastname badge-pill badge badge-warning">{{ message.email }}</span>
                <small class="text-muted">At: {{ humanDate(message.time) }}</small>
                <span style="display: block">{{ message.content }}</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="chat-message">
          <div class="form-group">
            <label for="message"><small>Type and enter to send message...</small></label>
            <input @keyup.enter="sendMessage" type="text" 
              v-model="message" class="form-control" placeholder="Write your message...">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
  import db from '../firebase'

  export default {
    name: "Chat",
    
    data() {
      return {
        message: null
      }
    },

    firestore() {
      return {
        ref: db.collection('chats'),
        messages: db.collection('chats').orderBy("order", "desc")
      }
    },

    props: ['email'],

    methods: {
      sendMessage() {
        if (this.message) {
          this.$firestore.ref.add(
            {
              email: this.email,
              content: this.message,
              time: Date.now(),
              order: this.messages.length + 1
            }
          )
        }

        this.message = null
      },

      humanDate(milliseconds) {
        const date = new Date(milliseconds)
        return date.getDate() 
          + "/" + date.getMonth()
          + "/" + date.getFullYear()
          + ", " + date.getHours() 
          + ":" + date.getMinutes()
      }
    }
  }
</script>

<style>
  .chat {
    width: 50em;
    margin: 30px auto;
  }

  div.chat-box {
    height: 180px;
    overflow-y: auto;
  }

  div.chat-box > ul > li {
    color: #148a53;
  }

  .chat-message {
    display: block;
    margin-top: 10px;
    margin-bottom: -12px;
  }

  .chat-message > div > label {
    color: gray;
  }

  p.chat-content {
    font-size: 1em;
  }

</style>