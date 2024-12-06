import { mount } from '@vue/test-utils';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Story from '@/components/Story.vue';
import flushPromises from 'flush-promises';
import * as articlesService from '@/services/articles';

const vuetify = createVuetify({
  components,
  directives,
});

const defaultArticle = {
  title: 'Test Story',
  url: 'https://example.com',
  time: 1672531200,
  score: 123,
  by: 'john',
  type: 'story',
  kids: [1, 2, 3],
};

vi.mock('@/services/articles', () => ({
  getStory: vi.fn(),
}));

describe('Story.vue', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (customArticle = defaultArticle) => {

    articlesService.getStory.mockResolvedValue(customArticle);

    return mount(Story, {
      props: {
        storyId: 123,
        viewMode: 'List'
      },
      global: {
        components: {
          Story,
        },
        plugins: [vuetify],
      },
    });
  };

  test('renders with default story', async () => {
    const wrapper = createWrapper();
    await flushPromises();

    expect(wrapper.text()).toContain('Test Story');
  });

  test('renders with custom story details', async () => {
    const customArticle = {
      title: 'Custom Story Title',
      url: 'https://custom-url.com',
      time: 1672531200,
      score: 200,
      by: 'custom_author',
      type: 'story',
      kids: [4, 5],
    };

    const wrapper = createWrapper(customArticle);
    await flushPromises();

    expect(wrapper.text()).toContain('Custom Story Title');
    expect(wrapper.text()).toContain('custom_author');
  });

  test('displays score, in List view', async () => {
    const wrapper = createWrapper();
    await flushPromises();

    expect(wrapper.text()).toContain('123');
  });

  test('displays score, in Grid view', async () => {

    const wrapper = createWrapper();

    await wrapper.setProps({ viewMode: 'Grid' });

    await flushPromises();

    expect(wrapper.props().viewMode).toBe('Grid');
    expect(wrapper.text()).toContain('123');
  });

  test('should properly format dates', async () => {

    const wrapperWithDate = createWrapper();

    const wrapperWithoutDate = createWrapper({
      title: 'Custom Story Title',
      url: 'https://custom-url.com',
      time: null,
      score: 200,
      by: 'custom_author',
      type: 'story',
      kids: [4, 5],
    });

    await flushPromises();

    const dateFieldValid = wrapperWithDate.find('[data-test-id="formatted-date"]');
    expect(dateFieldValid.text()).toContain('ago');

    const timeAgoStringValid = wrapperWithDate.vm.timeAgoString;
    expect(timeAgoStringValid).toBeDefined();
    expect(timeAgoStringValid).not.toBe('N/A');

    const dateFieldInvalid = wrapperWithoutDate.find('[data-test-id="formatted-date"]');
    expect(dateFieldInvalid.exists()).toBe(false);
    const timeAgoStringInvalid = wrapperWithoutDate.vm.timeAgoString;
    expect(timeAgoStringInvalid).toBe('N/A');
  });

  test('should properly display storyTypeColor based on story type', async () => {

    const wrapperWithStoryType = createWrapper();

    const wrapperWithJobType = createWrapper({
      title: 'Test Job Title',
      url: 'https://job-url.com',
      time: 1672531200,
      score: 150,
      by: 'jane',
      type: 'job',
      kids: [],
    });

    await flushPromises();

    const storyTypeColorValid = wrapperWithStoryType.vm.storyTypeColor;
    expect(storyTypeColorValid).toBe('red');

    const storyTypeColorInvalid = wrapperWithJobType.vm.storyTypeColor;
    expect(storyTypeColorInvalid).toBe('purple');
  });
});
