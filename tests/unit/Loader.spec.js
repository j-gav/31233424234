import { mount } from '@vue/test-utils';
import { expect, test, describe } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Loader from '@/components/Loader.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('Loader.vue', () => {

  const createWrapper = () => {
    return mount(Loader, {
      global: {
        components: {
          Loader,
        },
        plugins: [vuetify],
      }
    });
  };

  test('renders the Loader component', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div[role="status"]').exists()).toBe(true);
  });

  test('has accessibility attributes', () => {
    const wrapper = createWrapper();
    const container = wrapper.find('div[role="status"]');

    expect(container.attributes('aria-live')).toBe('polite');
    expect(container.attributes('aria-label')).toBe('Loading');
  });
});
