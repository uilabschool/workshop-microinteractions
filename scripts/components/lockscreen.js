window.$app = window.$app || {};

(function ($app) {
  const LOCKSCREEN_SELECTOR = '.login__btn--lockscreen';
  const CLASS_LOCKSCREEN_BACKGROUND_SELECTOR = '.login__btn--lockscreen__background';
  const CLASS_LOCKSCREEN_CLOSE = 'login__btn--lockscreen__background--close';
  const components = $app.components = ($app.components || {});

  function open (e, message = "Carregando...") {
    const $element = $(
      `<div class="login__btn--lockscreen">
        <div class="login__btn--lockscreen__loader">
            ${message}
        </div>
        <div class="login__btn--lockscreen__background"></div>
      </div>`
    );
    const $background = $element.find(CLASS_LOCKSCREEN_BACKGROUND_SELECTOR);

    $background.css('left', e.layerX || e.x);
    $background.css('top', e.layerY || e.y);

    remove();
    $('body').append($element);
    return $element;
  }

  function remove() {
    $(LOCKSCREEN_SELECTOR).remove();
  }

  function close (fn) {
    $(LOCKSCREEN_SELECTOR).on('animationend', () => {
      $(LOCKSCREEN_SELECTOR).addClass(CLASS_LOCKSCREEN_CLOSE);
      if ($.isFunction(fn)) fn();
    });
  }

  components.lockscreen = { open, close };
}(window.$app));
