// Classic script also runs for file://, where ES modules cannot be loaded.
(() => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');
  const button = form.querySelector('button[type=submit]');
  button.disabled = true;
  form.addEventListener('submit', event => event.preventDefault());
  if (location.protocol === 'file:') {
    message.textContent = 'ファイルを直接開くとログインできません。start-preview.cmdを起動し、http://localhost:8766/ をブラウザーで開いてください。';
    return;
  }
  message.textContent = 'ログイン機能を読み込み中…';
  import('./app.js').then(() => {
    button.disabled = false;
    message.textContent = '';
  }).catch(() => {
    message.textContent = 'ログイン機能の読み込みに失敗しました。インターネット接続を確認して再読み込みしてください。';
  });
})();
