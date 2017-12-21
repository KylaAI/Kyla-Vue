<template>
  <div id="main">
    <div class="modal is-active" v-show="!login">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="notification is-danger" v-show="login_alert">
            <p>
              Mohon maaf password yang anda isikan salah. Username ini sudah dipakai oleh seseorang.
            </p>
          </div>
          <div class="notification is-warning">
            <p>
              Anda tidak diizinkan menggunakan AI ini sebelum mengisi form dibawah ini.
            </p>
          </div>

          <div class="login">
            <div class="field">
                Username :
              <div class="control">
                <input type="text" class="input" name="" value="" v-model='user' placeholder='Username'>
              </div>
            </div>
            <div class="field">
                Password :
              <div class="control">
                <input type="password" class="input" name="" value="" v-model='pass' placeholder='Password' v-on:keyup.enter="loginData()">
              </div>
            </div>
            <div class="field">
              <button type="button" name="button" class="button is-primary" v-on:click="loginData()">Login</button>
            </div>
            <div class="notification">
              <p>
                Silahkan masukkan username dan password. Jika anda belum mendaftar silahkan isikan username dan password sesuai yang anda inginkan dan akan automatis melakukan registrasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container is-widescreen">
          <div class="box primary-box">
            <h2 class="subtitle is-h2 has-text-centered">Kyla AI</h2>
            <hr>
            <div class="form-chat" id="form-chat" v-chat-scroll>
              <div class="columns is-tablet is-mobile ai">
                <div class="column is-2">
                  <div class="ai-image">
                    <img src='./assets/img/kyla.png' alt="" width="60" height="60">
                  </div>
                </div>
                <div class="column is-10">
                  <div class="notification is-warning">
                    <p>
                      Selamat datang dihalaman chat Kyla. Pada saat ini status masih dalam Alpa. Silahkan gunakan chat ini.
                    </p>
                  </div>
                </div>
              </div>

              <div class="columns is-tablet is-mobile ai" v-for="chats in chat" key="chats.id_chat">
                <div class="column is-2" v-if="chats.username == 'Kyla'">
                  <div class="ai-image">
                    <img src='./assets/img/kyla.png' alt="" width="60" height="60">
                  </div>
                </div>
                <div class="column is-10">
                  <div class="notification " :class="'is-' + color(chats.username)">
                    <p>
                      {{chats.content}}
                    </p>
                  </div>
                </div>
                <div class="column is-2" v-if="chats.username != 'Kyla'">
                  <div class="user-image">
                    <img src="./assets/img/placeholder-user.png" alt="" width="60" height="60">
                  </div>
                </div>
              </div>

              <!--<div class="columns is-tablet is-mobile ai">
                <div class="column is-2">
                  <div class="ai-image">
                    <img src='./assets/img/rsz_1kyla.png' alt="" width="60" height="60">
                  </div>
                </div>
                <div class="column is-10">
                  <div class="notification is-warning">
                    <p>
                      Kyla is writing...
                    </p>
                  </div>
                </div>
              </div>-->
            </div>

            <hr>
            <div class="form-input">
              <div class="columns">
                <div class="column is-10">
                  <div class="field">
                    <div class="control">
                      <input type="text" name="" class="input is-12" :class="input_warna" value="" placeholder="Masukkan Pesan..." v-model="messages" v-on:keyup.enter="sendMessages()">
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div class="field">
                    <div class="control">
                      <button type="button" class="button is-primary" name="button" v-on:click="sendMessages()"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                      <button type="button" class="button is-danger" name="button"><i class="fa fa-microphone" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            Copyright &copy; Kyla. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import VueCookie from 'vue-cookie'

var base = window.location.origin
//  var strReplace = require('locutus/php/strings/str_replace')
// var baseS = 'http://localhost/UI_Kyla/'
var baseS = 'http://kyla-ai.cf/'
export default {
  name: 'main',
  data () {
    return {
      login: false,
      user: '',
      pass: '',
      id_user: 0,
      username: '',
      token: this.$cookie.get('token'),
      chat: [],
      messages: '',
      login_alert: false,
      kalimat: '',
      pengajaran: false,
      input_warna: ''
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    color (data) {
      if (data === 'Kyla') {
        return 'info'
      } else {
        return 'primary'
      }
    },
    baseUrl () {
      return base
    },
    baseServer () {
      return baseS
    },
    checkLogin () {
      axios({
        method: 'post',
        url: this.baseServer() + 'login/',
        data: qs.stringify({
          token: this.token
        })
      })
      .then((response) => {
        if (response.data.id_user) {
          this.id_user = response.data.id_user
          this.username = response.data.username
          this.login = true
          this.chatData()
        }
      })
    },
    chatData () {
      this.chat = []
      axios({
        method: 'get',
        url: this.baseServer() + 'chat/?token=' + this.token
      })
      .then((response) => {
        // console.log(response)
        // console.log(this.baseServer() + 'chat/?token=' + this.token)
        this.chat = response.data
        this.scroll()
      })
    },
    loginData () {
      axios({
        method: 'post',
        url: this.baseServer() + 'login/',
        data: qs.stringify({
          username: this.user,
          password: this.pass,
          data_login: 1
        })
      })
      .then((response) => {
        if (response.data.token !== null) {
          this.token = response.data.token
          VueCookie.set('token', response.data.token, 1)
          this.checkLogin()
          this.login_alert = false
        } else {
          this.login_alert = true
        }
      })
    },
    scroll () {
      console.log('scrolll')
      document.getElementById('form-chat').style.top = '100px'
    },
    sendMessages () {
      console.log(this.messages)
      if ((this.messages === null) || (this.messages === '')) {
        alert('Anda harus meninputkan text kedalam box')
      } else if (this.messages === 'logout') {
        VueCookie.delete('token')
        this.login = false
        this.token = null
        this.messages = ''
        this.chat = []
      } else if (this.messages === 'batal') {
        this.pengajaran = false
        this.input_warna = ''
        this.messages = ''
      } else if (this.pengajaran === true) {
        axios({
          method: 'get',
          url: this.baseServer() + 'AI/?token=' + encodeURI(this.token) + '&response=' + encodeURI(this.messages) + '&kalimat=' + encodeURI(this.kalimat)
        })
        .then((response) => {
          console.log(response)
          console.log(this.baseServer() + 'AI/?token=' + encodeURI(this.token) + '&response=' + encodeURI(this.messages) + '&kalimat=' + encodeURI(this.kalimat))
          this.kalimat = parseInt(response.data.kalimat)
          if (response.data.status === 'error') {
            this.pengajaran = true
            this.input_warna = 'is-danger'
          } else if (response.data.status === 'success') {
            this.pengajaran = false
            this.input_warna = ''
          }
          this.chatData(response)
          this.messages = ''
        })
        .catch(function (error) {
          this.chatData()
          console.log(error)
        })
      } else {
        console.log(this.messages)
        axios({
          method: 'get',
          url: this.baseServer() + 'AI/?token=' + encodeURI(this.token) + '&messages=' + encodeURI(this.messages)
        })
        .then((response) => {
          console.log(response)
          console.log(this.baseServer() + 'AI/?token=' + encodeURI(this.token) + '&messages=' + encodeURI(this.messages))
          this.kalimat = parseInt(response.data.kalimat)
          if (response.data.status === 'error') {
            this.pengajaran = true
            this.input_warna = 'is-danger'
          } else {
            this.pengajaran = false
            this.input_warna = ''
          }
          this.chatData(response)
          this.messages = ''
        })
        .catch(function (error) {
          this.chatData()
          console.log(error)
        })
      }
      this.chatData()
    }
  }
}
</script>
