window.$app = window.$app || {};

(function ($app) {
  const NOTIFICATION_SELECTOR = '.notification';
  const CLASS_NOTIFICATION_ERROR = 'notification--error';
  const CLASS_NOTIFICATION_WARN = 'notification--warn';
  const components = $app.components = ($app.components || {});

  function open (message = "") {
    const $element = $(
      `<div class="notification">
        ${message}
      </div>`
    );

    close();
    $('body').append($element);
    return $element;
  }

  function warn (message) {
    return open(message).addClass(CLASS_NOTIFICATION_WARN);
  }

  function error (message) {
    return open(message).addClass(CLASS_NOTIFICATION_ERROR);
  }

  function close () {
    $(NOTIFICATION_SELECTOR).remove();
  }

  components.notification = { warn, error, open, close };
}(window.$app));
