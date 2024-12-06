import { mount } from '@vue/test-utils';
import { expect, test, describe } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import StoryList from '@/components/StoryList.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('StoryList.vue', () => {

  const createWrapper = (props = {}) => {
    return mount(StoryList, {
      props: {
        viewMode: props.viewMode || 'Grid',
        storyType: props.storyType || 'new',
        stories: props.stories || []
      },
      global: {
        components: {
          StoryList,
        },
        plugins: [vuetify],
      }
    });
  };

  const generateXAmountOfStories = (x) => {
    return Array.from({ length: x }, (_, i) => i + 1);
  }

  test('renders the component', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  test('loads the initial set of stories', async () => {
    const stories = generateXAmountOfStories(3)
    const wrapper = createWrapper({ stories });

    await wrapper.vm.$nextTick();

    const storyItems = wrapper.findAll('[data-test-id="story-component"]');

    expect(storyItems.length).toBe(3);
  });

  test('shows correct view mode (grid or list)', () => {
    const stories = generateXAmountOfStories(2)

    const gridWrapper = createWrapper({ stories, viewMode: 'Grid' });
    const gridCols = gridWrapper.findAll('[data-test-id="story-column"]');

    gridCols.forEach((col) => {
      expect(col.classes()).toContain('v-col-md-6');
      expect(col.classes()).toContain('v-col-lg-4');
    });

    const listWrapper = createWrapper({ stories, viewMode: 'List' });
    const listCols = listWrapper.findAll('[data-test-id="story-column"]');

    listCols.forEach((col) => {
      expect(col.classes()).not.toContain('v-col-md-6');
      expect(col.classes()).not.toContain('v-col-lg-4');
    });
  });

  test('loads more stories when showMore is triggered', async () => {
    const stories = generateXAmountOfStories(100)
    const wrapper = createWrapper({ stories });

    let visibleStories = wrapper.vm.visibleStories;
    expect(visibleStories.length).toBe(12);

    wrapper.vm.loadInitialStories();

    const done = () => {};
    wrapper.vm.showMore({ done });

    visibleStories = wrapper.vm.visibleStories;
    expect(visibleStories.length).toBe(15);

    wrapper.vm.hasMore = false;
    wrapper.vm.showMore({ done });
    visibleStories = wrapper.vm.visibleStories;
    expect(visibleStories.length).toBe(15);
  });
});
