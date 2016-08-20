window.$app = window.$app || {};

(function ($app) {
  const FORM_SELECTOR = '#login__form';
  const SUBMIT_SELECTOR = '#login__submit';
  const INPUT_EMAIL_SELECTOR = '#login__email';
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
