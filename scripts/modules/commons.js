window.$app = window.$app || {};

(function ($app) {
  const INPUT_CLASS_ERROR = 'input__email--error';

  function startLoading(e) {
    return $app.components.lockscreen.open(e, "Entrando...");
  }

  function emailIsValid(email) {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regExp.test(email);
  }

  function formToObject($form) {
    return $form.serializeArray().reduce((r, field) => {
      r[field.name] = field.value;
      return r;
    }, {});    return data;
  }

  function validateFieldEmail($current) {
    const $parent = $current.parent();

    if (!emailIsValid($current.val())) {
      $parent.addClass(INPUT_CLASS_ERROR);
      return false;
    }

    $parent.removeClass(INPUT_CLASS_ERROR);
    return true;
  }

  $app.commons = { startLoading, formToObject, emailIsValid, validateFieldEmail };
}(window.$app));
