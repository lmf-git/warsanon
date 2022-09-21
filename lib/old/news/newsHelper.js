import 'isomorphic-fetch';
import DataHelper from '../../utils/dataHelper';

export default class NewsHelper {

    static async getFeaturedItem() {
        return this.getPostByKey('featured_item');
    }

    static async getLatestFivePosts() {
        const newsResponse = await fetch('https://test-852ee.firebaseio.com/news/posts.json');
        const newsData = await newsResponse.json();
        let newsDataArray = DataHelper.jsonToArrayWithKey(newsData);
        return newsDataArray;
    }

    static async getPostByKey(key) {
        let baseUrl = 'https://test-852ee.firebaseio.com/news/';
        if (key !== 'featured_item') baseUrl += 'posts/';
        const newsResponse = await fetch(baseUrl + key + '.json');
        const newsData = await newsResponse.json();
        return newsData;
    }

}