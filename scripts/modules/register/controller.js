window.$app = window.$app || {};

(function ($app) {
  const FORM_SELECTOR = '#login__form';
  const SUBMIT_SELECTOR = '#login__submit';
  const INPUT_EMAIL_SELECTOR = '#login__email';
  const INPUT_PASSWORD_SELECTOR = '#login__password';
  const TEMPLATE_USUARIO_EXISTENTE = 'Encontramos uma conta cadastra-da! <a href="login.html" class="link">LOGAR-SE</a>';
  const { startLoading, validateFieldEmail, formToObject } = $app.commons;

  function checkUserExists($current) {
    const email = $current.val();

    $app.components.tooltip.remove();
    $app.services.users.exists(email).then(({ exists }) => {
      if (exists) {
        $app.components.tooltip.open($current, TEMPLATE_USUARIO_EXISTENTE);
      }
    });
  }

  $(INPUT_EMAIL_SELECTOR).change((e) => {
    const $current = $(e.target);

    if (validateFieldEmail($current)) {
      checkUserExists($current);
    }
  });

  /**
   * REGRAS
  */
  const PASSWORD_MUITO_FRACO = /[0-9]/ig;
  const PASSWORD_FRACO = /[a-z]/ig;
  const PASSWORD_MEDIO = /[a-z0-9]/ig;
  const PASSWORD_FORTE = /[a-z0-9\@\#\$\%\&]/ig;

  function verificarForcaDaSenha(password = "") {
    const wordLength = password.length;
    if ((password.match(PASSWORD_MUITO_FRACO) || []).length === wordLength) return 1;
    if ((password.match(PASSWORD_FRACO) || []).length === wordLength) return 2;
    if ((password.match(PASSWORD_MEDIO) || []).length === wordLength) return 3;
    if ((password.match(PASSWORD_FORTE) || []).length === wordLength) return 4;
  }

  let $tooltipPassword = null;

  $(INPUT_PASSWORD_SELECTOR).keyup((e) => {
    const $current = $(e.target);
    const password = $current.val();
    const forca = verificarForcaDaSenha(password);
    const position = $current.position();
    const template = (
      `<ul class="tooltip__password">
        <li class="tooltip__password__lvl-1${forca > 0 ? '--check' : ''}">Muito Fraca (Somente números [0..9])</li>
        <li class="tooltip__password__lvl-2${forca > 1 ? '--check' : ''}">Fraca (Somente Letras [A..Z])</li>
        <li class="tooltip__password__lvl-3${forca > 2 ? '--check' : ''}">Média (Letras e números [0..Z])</li>
        <li class="tooltip__password__lvl-4${forca > 3 ? '--check' : ''}">Forte (Letras, números e caracteres [0..@%$])</li>
      </ul>`
    );

    if ($tooltipPassword) $tooltipPassword.remove();
    $tooltipPassword = $app.components.tooltip.open($current, template);
  });

  $(INPUT_PASSWORD_SELECTOR).blur(() => {
    if ($tooltipPassword) $tooltipPassword.remove();
  });

  $(SUBMIT_SELECTOR).click((e) => {
    const $lockscreen = startLoading(e);
    e.preventDefault();

    const data = formToObject($(FORM_SELECTOR));

    console.log(data);

    $app.services.users
      .create(data)
      .then((data) => {
        $app.components.lockscreen.close();
      })
      .catch((error) => {
        $app.components.lockscreen.close(() => {
          $(INPUT_EMAIL_SELECTOR).focus();
          $app.components.notification.error("Não foi possível casdatrar, revise o formulário.");
        });
      });
  });
}(window.$app));
