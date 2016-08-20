window.$app = window.$app || {};

(function ($app) {
  const FORM_SELECTOR = '#login__form';
  const SUBMIT_SELECTOR = '#login__submit';
  const INPUT_EMAIL_SELECTOR = '#login__email';
  const INPUT_CLASS_ERROR = 'input__email--error';
  const TEMPLATE_NOVO_USUARIO = 'Não encontramos sua conta. <a href="signin.html" class="link">CADASTRE-SE</a>';
  const { startLoading, validateFieldEmail, formToObject } = $app.commons;

  function checkUserExists($current) {
    setTimeout(() => {
      const email = $current.val();

      $app.components.tooltip.remove();
      $app.services.users.exists(email).then(({ exists }) => {
        if (!exists) {
          $app.components.tooltip.open($current, TEMPLATE_NOVO_USUARIO);
        }
      });
    }, 500);
  }

  $(INPUT_EMAIL_SELECTOR).change((e) => {
    const $current = $(e.target);

    if (validateFieldEmail($current)) {
      checkUserExists($current);
    }
  });

  $(SUBMIT_SELECTOR).click((e) => {
    const $lockscreen = startLoading(e);
    e.preventDefault();

    const data = formToObject($(FORM_SELECTOR));

    $app.services.login
      .login(data)
      .then((data) => {
        $app.components.lockscreen.close();
      })
      .catch(({ status }) => {
        $app.components.lockscreen.close(() => {
          $(INPUT_EMAIL_SELECTOR).focus();
          $app.components.notification.error("Usuário ou senha não encontrados!");
        });
      });
  });
}(window.$app));
