/**
 * @file
 * Custom script for fontawesome icon picker.
 */

(function ($, Drupal) {

  Drupal.behaviors.fontawesomeIconpicker = {

    attach: function (context, settings) {
      let iconpickerSettings = {
        hideOnSelect: true,
        inputSearch: false,
        placement: 'bottomLeft',
        paginateIcons: true,
        iconsPerPage: 200,
      }
      if (typeof drupalSettings.fontawesome_iconpicker_enhanced.customIcons !== "undefined" && drupalSettings.fontawesome_iconpicker_enhanced.customIcons) {
        if (typeof drupalSettings.fontawesome_iconpicker_enhanced.iconsJson !== 'undefined') {
          iconpickerSettings.icons = JSON.parse(drupalSettings.fontawesome_iconpicker_enhanced.iconsJson).icons
        }
      }

      $(context).find('.fontawesome-iconpicker-element').once('jsFontawesomeIconpicker').each(function () {
        let $this = $(this);
        $this.parent().append($('<span class="input-group-addon__wrapper"><span class="input-group-addon"></span><i class="edit-icon-button fas fa-angle-down"></i></span>'));
        $this.iconpicker(iconpickerSettings);
        $this.on('iconpickerShown', function (e) {
          let parent = e.iconpickerInstance.popover;
          parent.find('.iconpicker-search').focus();
        })
      });
    }
  }

})(jQuery, Drupal);
