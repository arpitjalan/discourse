import GlimmerComponent from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import I18n from "I18n";
import { inject as service } from "@ember/service";

export default class BootstrapModeNotice extends GlimmerComponent {
  @service router;
  @service currentUser;
  @service siteSettings;
  @service site;

  get hidden() {
    const user = this.currentUser;
    return !(
      user &&
      user.get("staff") &&
      this.siteSettings.bootstrap_mode_enabled &&
      !this.router.currentRouteName.startsWith("wizard")
    );
  }

  get message() {
    let msg = null;
    const bootstrapModeMinUsers = this.siteSettings.bootstrap_mode_min_users;

    if (bootstrapModeMinUsers > 0) {
      msg = "bootstrap_mode_banner.enabled";
    } else {
      msg = "bootstrap_mode_banner.disabled";
    }

    return htmlSafe(I18n.t(msg, { count: bootstrapModeMinUsers }));
  }
}
