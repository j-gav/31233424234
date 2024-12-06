import { mount } from '@vue/test-utils';
import { expect, test, describe } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import AppHeader from '@/components/AppHeader.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('AppHeader.vue', () => {

  const createWrapper = () => {
    return mount({
      template: '<v-app><AppHeader view-mode="Grid" /></v-app>'
    }, {
      global: {
        components: {
          AppHeader,
        },
        plugins: [vuetify],
      }
    })
  }

  test('renders the component', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the site title', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Hacker News V3');
  });

  test('changing the theme changes the rendered toggle icon', async () => {

    const wrapper = createWrapper();

    const themeButton = wrapper.find('[data-test-id="theme-button"]');

    expect(themeButton.attributes('title')).toBe('Change to dark color scheme');

    await themeButton.trigger('click');

    expect(themeButton.attributes('title')).toBe('Change to light color scheme');
  });

  test('changing the view mode emits an event', async () => {
    const wrapper = createWrapper();

    let emittedEvents = wrapper.emitted();
    expect(Object.keys(emittedEvents).length).toBe(0);

    const viewButton = wrapper.find('[data-test-id="view-button"]');
    await viewButton.trigger('click');
    await wrapper.vm.$nextTick();

    emittedEvents = wrapper.emitted();

    expect(Object.keys(emittedEvents).length).toEqual(1);
  });

  test('clicking refresh emits an event', async () => {
    const wrapper = createWrapper();

    let emittedEvents = wrapper.emitted();
    expect(Object.keys(emittedEvents).length).toBe(0);

    const viewButton = wrapper.find('[data-test-id="refresh-button"]');
    await viewButton.trigger('click');
    await wrapper.vm.$nextTick();

    emittedEvents = wrapper.emitted();

    expect(Object.keys(emittedEvents).length).toEqual(1);
  });

});
