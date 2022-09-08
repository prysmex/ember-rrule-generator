import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';

import type IntlService from 'ember-intl/addon/services/intl';

declare global {
  interface Window {
    enUSTranslationsPromise: Promise<object>;
  }
}

export default class extends Route {
  @service declare intl: IntlService;
  @service declare router: RouterService;
}
