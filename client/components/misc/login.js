export function Login() {
    const div = document.createElement('div');
    div.className = 'login-container';
    div.innerHTML = `  <div class="login-container">
    <form class="form-login">
      <h1 class="title-login">Login</h1>
      <input type="email" class="input-email" placeholder="Email" required>
      <input type="password" class="input-pass" placeholder="Password" required>
      <div class="buttons-login">
        <button type="submit" class="btn-login">Login</button>
        <button class="annuler">Annuler</button>
      </div>
      <div class="redirect">Vous n'avez pas de compte <span>inscrivez-vous</span></div>
    </form>
  <style>
    .login-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;      
      background-color: #f0f0f0;
    }
    .form-login {
      display: flex;
      flex-direction: column;
      gap: 15px;      
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    }
    .form-login .title-login {
      text-align: center;
      margin-bottom: 10px;
    }
    .input-pass, .input-email, .btn-login {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 16px;
    }
    .buttons-login {
      display: flex;
      justify-content: space-between;
    }
    .btn-login{
      cursor: pointer;
    }
    .redirect {
      text-align: center;
      font-size: 14px;
    }
    .redirect span {
      color: blue;
      cursor: pointer;
      text-decoration: underline;
    }
  </style>
  </div>`
    
  document.body.appendChild(div);



}